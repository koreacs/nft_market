import { useEffect } from 'react';
import { getMainWidth, getTokenInfo, handleTitle } from '../../utils';
import { useWeb3React } from '@web3-react/core';
import SectionCardDown from './SectionCardDown';
import { useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import React , {useRef} from 'react';
import { IAuction, IItem } from '../../types';
import contracts from '../../constants/contracts';
import { useInterval } from 'usehooks-ts';
import isAuctionFinishAtom from '../../atoms/isAuctionFinish';
import BigNumber from 'bignumber.js';
import btn_close from '../../assets/img/btn_close.png';
import auction_icon from '../../assets/img/auction_icon.png';
import addresses from '../../constants/addresses';
import isApprovedAtom from '../../atoms/isApproved';
import { useHistory } from 'react-router-dom';
import $ from 'jquery';
import 'jquery-datetimepicker';
import './ItemDetails.css';
import { injectedConnector } from '../../connector';
import axios from 'axios';
import myPointAtom from '../../atoms/myPoint';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { create } from 'ipfs-http-client';
import walletAccountAtom from '../../atoms/walletAccount';

const ItemDetailsContainer = () => {
  const { id }: { id?: string } = useParams();
  const { regFlag }: { regFlag?: string } = useParams();
  const history = useHistory();

  //const {id, category} = useParams();

  
  const [auction, setAuction] = React.useState<IAuction>();
  const [bidPrice, setBidPrice] = React.useState<number>(0);
  const [myTokenInfo, SetMyTokenInfo] = React.useState<IItem>();
  
  // const { account } = useWeb3React();
  const [isAuctionFinish, setIsAuctionFinish] = useRecoilState(isAuctionFinishAtom);
  const [expiryDate, setExpiryDate] = React.useState<string>('');
  const inputRef = useRef(null);
  const [countDownDate, setCountDownDate] = React.useState<string>('');
  const [countDownStart, setCountDownStart] = React.useState<boolean>(false);

  const { chainId, account, activate, deactivate, active } = useWeb3React();

  const myTvsPoint = useRecoilValue(myPointAtom);
  const walletAccount = useRecoilValue(walletAccountAtom);
	
  const getAuction = async () => {
	

		var data = JSON.stringify({
        	"auctionId": id
        });
      

        var config = {
			method: 'post',
			url: addresses.targetIp+'/nft/auctionDetail',
			headers: { 
			'Accept': 'application/json', 
			'Content-Type': 'application/json'
			},
			data : data
		};

		var jsonData
		axios(config).then(function (response) { 

			jsonData = JSON.parse(JSON.stringify(response.data));

			
			if(jsonData.result.code === 200){

				jsonData.auctionDetail.biddingList = jsonData.result.biddingList;

				setAuction(jsonData.auctionDetail);

				//const tokenInfo = await getTokenInfo(result.tokenId);
	  
				const curDate = new Date().getTime();
				let realExpireDate = jsonData.auctionDetail.expiryDate - curDate/1000;
				let realDays = "";
				let realHours = "";
				let realMin = "";
				let realSec = "";

				setCountDownDate(jsonData.auctionDetail.expiryDate);

				if(realExpireDate > 0){
					if(Math.floor(realExpireDate/86400) > 0){
						realDays = String(Math.floor(realExpireDate/86400)).padStart(2, '0');
						realExpireDate = realExpireDate - (Number(realDays)*86400);
					}else{
						realDays = "00";
					}

					if(Math.floor(realExpireDate/3600) > 0){
						realHours = String(Math.floor(realExpireDate/3600)).padStart(2, '0');
						realExpireDate = realExpireDate - (Number(realHours)*3600);
					}else{
						realHours = "00";
					}

					if(Math.floor(realExpireDate/60) > 0){
						realMin = String(Math.floor(realExpireDate/60)).padStart(2, '0');
						realExpireDate = realExpireDate - (Number(realMin)*60);
					}else{
						realMin = "00";
					}

					if(Math.floor(realExpireDate) > 0){
						realSec = String(Math.floor(realExpireDate)).padStart(2, '0');
					}else{
						realSec = "00";
					}

					
					setExpiryDate(realDays+realHours+realMin+realSec);
				}else{
					setExpiryDate("00000000");
				}

				setCountDownStart(true);
			
			}else{
				alert('조회실패!');
			}

		})
		.catch(function (error) {
			console.log(error);
		});

      
  };


  const auctionEndCountDwon = () => {

	const curDate = new Date().getTime();
	let realExpireDate = Number(countDownDate) - curDate/1000;
	let realDays = "";
	let realHours = "";
	let realMin = "";
	let realSec = "";


	if(realExpireDate > 0){
		if(Math.floor(realExpireDate/86400) > 0){
			realDays = String(Math.floor(realExpireDate/86400)).padStart(2, '0');
			realExpireDate = realExpireDate - (Number(realDays)*86400);
		}else{
			realDays = "00";
		}

		if(Math.floor(realExpireDate/3600) > 0){
			realHours = String(Math.floor(realExpireDate/3600)).padStart(2, '0');
			realExpireDate = realExpireDate - (Number(realHours)*3600);
		}else{
			realHours = "00";
		}

		if(Math.floor(realExpireDate/60) > 0){
			realMin = String(Math.floor(realExpireDate/60)).padStart(2, '0');
			realExpireDate = realExpireDate - (Number(realMin)*60);
		}else{
			realMin = "00";
		}

		if(Math.floor(realExpireDate) > 0){
			realSec = String(Math.floor(realExpireDate)).padStart(2, '0');
		}else{
			realSec = "00";
		}

		
				setExpiryDate(realDays+realHours+realMin+realSec);
	}
  }


  useInterval(
    () => {
      getAuction();
      setIsAuctionFinish(false);
    },
    isAuctionFinish ? 1000 : null
  );

    
  useInterval(
	() => {
		if(countDownStart){
			auctionEndCountDwon();		
		}
	},
	isAuctionFinish ? null : 1000
  );


  //입찰버튼
  const onPlaceBid = async () => {
    
	const currentPrice = new BigNumber(parseInt(auction.currentPrice))
	.div(new BigNumber(10).pow(18))
	.toNumber();

	if (currentPrice >= bidPrice) {
		alert('It should be higher than the current bid amount');
		return;
	}

	if(bidPrice > Number(myTvsPoint)){
		alert('Not enough points.');
		return;
	}

	
	var data = JSON.stringify({
		"auctionId": auction.auctionId,
		"address":account,
		"biddingPrice": bidPrice
	});

	var config = {
		method: 'post',
		url: addresses.targetIp+'/nft/bid',
		headers: { 
		'Accept': 'application/json', 
		'Content-Type': 'application/json'
		},
		data : data
	};

	axios(config).then(function (response) {

		let jsonData = JSON.parse(JSON.stringify(response.data));
			
		if(jsonData.result.code === 200){
			
			//jsonData.auctionDetail.biddingList = jsonData.result.biddingList;
			//setAuction(jsonData.auctionDetail);
			//setBidPrice(0);
			clsePop();
			window.location.reload();
			
		}

	})
	.catch(function (error) {
		console.log(error);
	});
		

}



  function buynowPop(){
		if(account)
    	$(".buynowPop").show();
		else {
      activate(injectedConnector,(error)=>{
        if(error.toString().indexOf('No Ethereum provider was found on window.ethereum') > 0 ){
          window.open('https://metamask.io/download.html');
        }
      });

      window.localStorage.setItem('wallet', 'metamask');
    }
  }

  function placebidPop(){		
		if(account)
    	$(".placebidPop").show();
		else {
      activate(injectedConnector,(error)=>{
        if(error.toString().indexOf('No Ethereum provider was found on window.ethereum') > 0 ){
          window.open('https://metamask.io/download.html');
        }
      });

      window.localStorage.setItem('wallet', 'metamask');
    }
  }

  function settlePop(){
	//if(auction?.highestBidder !=='' && expiryDate !== '00000000'){
	if(auction?.highestBidder !=='' && auction?.highestBidder !== '0x0000000000000000000000000000000000000000'){
		$("#settlePop").show();
		$("#settleNotPop").hide();
	}else if(auction?.highestBidder ==='' || auction?.highestBidder === '0x0000000000000000000000000000000000000000'){
		$("#settleNotPop").show();
		$("#settlePop").hide();
	}
  }
  
  function clsePop(){
	$(".clsePop").hide();
  }

  

  
  const biddingChk = () => {

	inputRef.current.value = inputRef.current.value.replace(/[^0-9^.]/g, "");
	//inputRef.current.value = inputRef.current.value.replace(/(^0+)/, "");

	let bidnumlen = inputRef.current.value;
	let maxbid = new BigNumber(parseInt(auction?.currentPrice))
	.div(new BigNumber(10).pow(18))
	.toNumber();

	setBidPrice(Number(bidnumlen));

	if (bidnumlen > maxbid) {
		$(".placebidPop>.contArea>.bidArea>span.err").hide();
		$(".placebidPop>.contArea>.btnArea>a").addClass("on");
	} else if (bidnumlen !== '' && bidnumlen <= maxbid) {
		$(".placebidPop>.contArea>.bidArea>span.err").show();
		$(".placebidPop>.contArea>.btnArea>a").removeClass("on");
	} else {
		$(".placebidPop>.contArea>.bidArea>span.err").hide();
		$(".placebidPop>.contArea>.btnArea>a").removeClass("on");
	}
  };

  


  /** 등록전 데이터 조회 시작 */

  const getTotalSupply = async () => {

	 var data = JSON.stringify({
		"nftId": id
	});
  
	var config = {
		method: 'post',
		url: addresses.targetIp+'/nft/nftDetail',
		headers: { 
		'Accept': 'application/json', 
		'Content-Type': 'application/json'
		},
		data : data
	};

	var jsonData
	axios(config).then(function (response) {

		console.log(response.data)

		jsonData = JSON.parse(JSON.stringify(response.data));
		
		if(jsonData.result.code === 200){

			SetMyTokenInfo(jsonData.nftDetail);
		}else{
			alert('조회실패!');
		}

	})
	.catch(function (error) {
		console.log(error);
	});

  };
 
  /** 등록전 데이터 조회 종료 */

  

 /** 경매등록 시작 */

  const [isApproved, setIsApproved] = useRecoilState(isApprovedAtom);
  const [isCreateOpen, setIsCreateOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>('');
  const [startingPrice, setStartingPrice] = React.useState<number>();
  const [buyNowPrice, setBuyNowPrice] = React.useState<number>();

 const onClickCreateAuction = async () => {

    if (!isCreateOpen) {
      setIsCreateOpen(true);
    }

	if (!buyNowPrice) {
		$('.createauctionPop>.contArea>.step2>span').text('Buy now price is required!');
		$('.createauctionPop>.contArea>.step2>span').show();
	}else if (startingPrice >= buyNowPrice) {
		$('.createauctionPop>.contArea>.step2>span').text('Please enter an amount higher than the starting price');
		$('.createauctionPop>.contArea>.step2>span').show();
	}else{
		$('.createauctionPop>.contArea>.step2>span').hide();
	} 
	
	if(!startingPrice){
		$('.createauctionPop>.contArea>.step1>span').text('Starting price is required!');
		$('.createauctionPop>.contArea>.step1>span').show();
	}else if (startingPrice < 0.001) {
		$('.createauctionPop>.contArea>.step1>span').text('Please enter an amount higher than 0.001');
		$('.createauctionPop>.contArea>.step1>span').show();
	}else{
		$('.createauctionPop>.contArea>.step1>span').hide();
	}


	!expiryDate || $(".step3").hasClass('err') ? $('.createauctionPop>.contArea>.step3>span').show() : $('.createauctionPop>.contArea>.step3>span').hide();


    if (!startingPrice || !buyNowPrice || (startingPrice >= buyNowPrice) || (startingPrice < 0.001) || !expiryDate) {
      return;
    }

	if(!$("#createAuctionId").hasClass("on")){
		return;
	}

	var data = JSON.stringify({
		"nftId": id,
		"seller":account,
		"buyNowPrice": new BigNumber(buyNowPrice)
						.times(new BigNumber(10).pow(18))
						.toNumber()
						.toFixed(0),
		"startPrice": new BigNumber(startingPrice)
						.times(new BigNumber(10).pow(18))
						.toNumber()
						.toFixed(0),
		"expireDate": new Date(expiryDate).getTime()/1000

	});

	var config = {
		method: 'post',
		url: addresses.targetIp+'/nft/sell',
		headers: { 
		'Accept': 'application/json', 
		'Content-Type': 'application/json'
		},
		data : data
	};

	var jsonData
      axios(config).then(function (response) {

		$("#createAuctionId").text("Registering for auction...");
		$("#createAuctionId").removeClass("on");


		jsonData = JSON.parse(JSON.stringify(response.data));
		
		console.log(jsonData.result.code)
		
		if(jsonData.result.code === 200){

			
			$(".auctionsuccessPop").show();
		}else{
			$("#createAuctionId").text("CREATE AUCTION");
			$("#createAuctionId").addClass("on");
			clsePop();
		}

      })
      .catch(function (error) {
        $("#createAuctionId").text("CREATE AUCTION");
		$("#createAuctionId").addClass("on");
		clsePop();
      });

  };


  const chkCreateAuc1 = () =>{

	if(Number($("#startPrice").val().trim()) < 0){
		setStartingPrice(0);
		$("#startPrice").val(0);
	}else{
		setStartingPrice(Number($("#startPrice").val().trim()));
	}

	if($("#startPrice").val().trim() === '' && !$(".step1").hasClass('err')){
		$(".step1").addClass('err');
		$('.step1>span').show();
	}else{
		$(".step1").removeClass('err');
		$('.step1>span').hide();
	}
	
	 let startPriceVal = $("#startPrice").val().trim();
	 let buyNowPriceVal = $("#buyNowPrice").val().trim();
	 

	if (startPriceVal === '' || buyNowPriceVal ==='' || (startPriceVal >= buyNowPriceVal) || (startPriceVal < 0.001) || !expiryDate || $(".step3").hasClass('err')) {
		$(".btnArea>a").removeClass('on');
	}else{
		$(".btnArea>a").addClass('on');
	}

  }


  const chkCreateAuc2 = () =>{

	if(Number($("#buyNowPrice").val().trim()) < 0){
		setBuyNowPrice(0);
		$("#buyNowPrice").val(0);
	}else{
		setBuyNowPrice(Number($("#buyNowPrice").val().trim()));
	}

	if($("#buyNowPrice").val().trim() === '' && !$(".step2").hasClass('err')){
		$(".step2").addClass('err');
		$('.step2>span').show();
	}else{
		$(".step2").removeClass('err');
		$('.step2>span').hide();
	}
	
	 let startPriceVal = $("#startPrice").val().trim();
	 let buyNowPriceVal = $("#buyNowPrice").val().trim();
	 

	if (startPriceVal === '' || buyNowPriceVal ==='' || (startPriceVal >= buyNowPriceVal) || (startPriceVal < 0.001) || !expiryDate || $(".step3").hasClass('err')) {
		$(".btnArea>a").removeClass('on');
	}else{
		$(".btnArea>a").addClass('on');
	}
  }

 /** 경매등록 종료 */



 
 /** 경매취소 시작 */
 const onClickCancelAuction = async () => {
	try{

		if (window.confirm("Do you want to cancel?")) {

			var data = JSON.stringify({
				"auctionId": id
			});
		
			var config = {
				method: 'post',
				url: addresses.targetIp+'/nft/cancel',
				headers: { 
				'Accept': 'application/json', 
				'Content-Type': 'application/json'
				},
				data : data
			};
		
			var jsonData;
			axios(config).then(function (response) {
		
				jsonData = JSON.parse(JSON.stringify(response.data));
				
				console.log(jsonData);

				if(jsonData.code === 200){
					setIsAuctionFinish(true);
					$(".txtArea4>ul").remove();
					$(".buyBtn").hide();
					$(".placeBtn").hide();
				}else{
					alert(jsonData.message);
				}
		
			})
			.catch(function (error) {
				console.log(error)
			});
		
		}
	}catch(e){
		console.log(e);
	}
  };
/** 경매취소 종료 */

/** 경매낙찰 시작 */
const onClickSettleAuction = async () => {
	try{


		/*
		const cancelAuction = await contracts.nftMarketContract.methods
		.settleAuction(id)
		.send({ from: account });
		*/

		var data = JSON.stringify({
			"auctionId": id,
			'owner' :auction?.seller,
			'currentPrice' : auction?.currentPrice
		});
	
		var config = {
			method: 'post',
			url: addresses.targetIp+'/nft/settle',
			headers: { 
			'Accept': 'application/json', 
			'Content-Type': 'application/json'
			},
			data : data
		};
	
		var jsonData
		  axios(config).then(function (response) {
	
			jsonData = JSON.parse(JSON.stringify(response.data));
			
			console.log(jsonData);

			if(jsonData.code === 200){
				setIsAuctionFinish(true);
				clsePop();

				$(".buyBtn").hide();
				$(".placeBtn").hide();

				mint();
			}else{
				alert(jsonData.message);
			}
	
		  })
		  .catch(function (error) {
			  console.log(error)
		  });

	}catch(e){
		console.log(e);
	}
};
/** 경매낙찰 종료 */


const mint = async () =>{
	
	
	try{
		const ipfs = create({
			host: 'ipfs.infura.io',
			port: 5001,
			protocol: 'https',
		  });

		const fileAdded = await ipfs.add(auction?.mnb_nft_master?.img);

		
		const metadata = {
			title: 'Asset Metadata',
			type: 'object',
			properties: {
			  name: {
				type: 'string',
				description: auction?.mnb_nft_master?.title,
			  },
			  description: {
				type: 'string',
				description: auction?.mnb_nft_master?.description,
			  },
			  image: {
				type: 'string',
				description: fileAdded.path,
			  },
			  category: {
				type: 'number',
				description: auction?.mnb_nft_master?.category,
			  },
			},
		  };
	  
		  const metadataAdded = await ipfs.add(JSON.stringify(metadata));
		  if (!metadataAdded) {
			console.error('Something went wrong when updloading the file');
			return;
		  }


		await contracts.nft_testnet.methods
		.mintNFTFor(metadataAdded.path,auction?.highestBidder) //내주소 강제 세팅
		.send({ from: '0xF3e95aD14a5DB9F5F30270BA5cd3069c300832d3' });

	  }catch(e){
		console.log(e);
	  }


}



/** 바로구매 시작 */
const onBuyNow = async () => {
    const buyNowPrice = new BigNumber(parseInt(auction.buyNowPrice))
      .div(new BigNumber(10).pow(18))
      .toNumber();


	if(!$("#buyNowId").hasClass("on")){
		return;
	}

	var data = JSON.stringify({
		"auctionId": auction.auctionId,
		"address":account,
		"biddingPrice": buyNowPrice,
		'owner' :auction?.seller
	});

	var config = {
		method: 'post',
		url: addresses.targetIp+'/nft/buynow',
		headers: { 
		'Accept': 'application/json', 
		'Content-Type': 'application/json'
		},
		data : data
	};

	var jsonData
	axios(config).then(function (response) {

	jsonData = JSON.parse(JSON.stringify(response.data));
		
	if(jsonData.result.code === 200){
		clsePop();
		setIsAuctionFinish(true);
		$(".buyBtn").hide();
		$(".placeBtn").hide();

	}else{
		$("#buyNowId").text("CONFIRM");
		$("#buyNowId").addClass("on");
		clsePop();
	}

	})
	.catch(function (error) {
		$("#buyNowId").text("CONFIRM");
		$("#buyNowId").addClass("on");
		clsePop();
	});
  };
  /** 바로구매 종료 */

  
  const readMore = (readMoreId) =>{

	if($("#"+readMoreId).text() === 'Read More'){
		$("#"+readMoreId).prev().attr('style',"display:block");
		$("#"+readMoreId).text('Show Less');
	}else{
		$("#"+readMoreId).prev().attr("style","display:-webkit-box");
		$("#"+readMoreId).text('Read More');
	}

  }

	useEffect(() => {

		handleTitle('MNB-NFT');
		getMainWidth();
		const now = new Date();
	   
		$('#datetimepicker').datetimepicker({
			format : 'm/d/Y H:i',
			minDate: new Date()
		}).on('change',function(){
			var selectDate = $('#datetimepicker').val();
			var selectDateTime = new Date(selectDate).getTime();

			if(selectDateTime < now.getTime()){
				$('.step3').addClass('err');
				$('.step3>span').text('You must select a value greater than the current time');
				$('.step3>span').show();
				if($(".step1").hasClass('err') || $(".step2").hasClass('err') || $(".step3").hasClass('err')){
					$(".btnArea>a").removeClass('on');
				}else{
					$(".btnArea>a").addClass('on');
				}
			}else{
				$('.step3').removeClass('err');
				$('.step3>span').hide();
				if($(".step1").hasClass('err') || $(".step2").hasClass('err') || $(".step3").hasClass('err')){
					$(".btnArea>a").removeClass('on');
				}else{
					$(".btnArea>a").addClass('on');
				}
				}
			

			setExpiryDate(selectDate);
		})
		
		if(regFlag === "Y"){
			getAuction();
			

			
		}else if(regFlag === "N"){
			getTotalSupply();
			$(".nftuserPage").hide();
			$(".nftaddprevPage").show();
		}
    
  	}, []);

	useEffect(() => {
		if(isAuctionFinish){
			setExpiryDate('00000000');
		}
  	}, [isAuctionFinish]);

	

  return (

	<>
		<div className="nftuserPage" >
			<div className="nftDetails clearfix">
				<div className="leftCont">
					<div className="nftBox">
						<span className="frame"><img
							src={auction?.mnb_nft_master?.img}alt=""/></span>
					</div>
				</div>
				<div className="rightCont">
					<div className="txtArea1">
						<p className="title">
							#{auction?.auctionId}<span>{auction?.auctionTitle}</span>
						</p>
						<p className="price">
							Current Price 
							<span>
								<em>	
								{new BigNumber(auction?.currentPrice)
								.div(new BigNumber(10).pow(18))
								.toString()}{' '}
								</em> TVP
							</span>
						</p>
						<p className="buyNow">
							Buy Now <span><em>
							{new BigNumber(auction?.buyNowPrice)
							.div(new BigNumber(10).pow(18))
							.toString()}{' '}
								</em> TVP</span>
						</p>
						<div className="infoCont">
							<p className="info">{auction?.mnb_nft_master?.description}</p>
							<a href="#" id='nftuserPageMore' onClick={()=>readMore('nftuserPageMore')}>Read More</a>
						</div>
					</div>
					<div className="txtArea2">
						<p>Owner</p>
						<div className="prof">
							<div className="txtBox">
								<p style={{ cursor: 'pointer' }} onClick={()=>{window.open('https://etherscan.io/address/'+auction?.seller)}}>
									{auction && auction?.seller.substr(0, 7)}...
									{auction && auction?.seller.substr(auction?.seller.length - 7)}
								</p>
							</div>
						</div>
					</div>
					<div className="txtArea3">
						{auction && <SectionCardDown {...auction} />}
					</div>
					<div className="txtArea4">
						<p>Auction Ends In</p>
						<ul className="clearfix">
							<li>
								<div className="aucEnd">
									<p>{expiryDate.length>8? expiryDate.substring(0,3) : expiryDate.substring(0,2)}</p>
									<span>Days</span>
								</div>
							</li>
							<li className="clearfix">
								<div className="aucEnd">
									<p>{expiryDate.length>8? expiryDate.substring(3,5):expiryDate.substring(2,4)}</p>
									<span>Hours</span>
								</div>
							</li>
							<li className="clearfix">
								<div className="aucEnd">
									<p>{expiryDate.length>8?expiryDate.substring(5,7):expiryDate.substring(4,6)}</p>
									<span>Minutes</span>
								</div>
							</li>
							<li className="clearfix">
								<div className="aucEnd">
									<p>{expiryDate.length>8?expiryDate.substring(7,9):expiryDate.substring(6,8)}</p>
									<span>Seconds</span>
								</div>
							</li>
						</ul>
					</div>
					<div className="sellCont clearfix">
						{/* {account && auction && auction?.seller !== account && ( */}
						{auction && auction?.seller !== account && (
							<><a href="#none" className="buyBtn" onClick={buynowPop}>BUY NOW</a> <a href="#none" className="placeBtn" onClick={placebidPop}>PLACE A BID</a></>
						)}
						{account && auction && auction?.seller === account && (auction.status === '1' || auction.status === '2' || auction.status === '3') &&(
							<><a href="#none" className="buyBtn" onClick={settlePop}>SETTLE</a><a href="#none"	className="placeBtn" onClick={onClickCancelAuction}>CANCEL</a></>
						)}
					</div>
				</div>
			</div>
		</div>

		<div className="nftaddprevPage" style={{ display: "none" }}  >
				<div className="nftDetails clearfix">
					<div className="leftCont">
						<div className="nftBox">
							<span className="frame"><img
								src={myTokenInfo?.img} alt=""/></span>
						</div>
					</div>
					<div className="rightCont">
						<div className="txtArea1">
							<p className="title">
								#{myTokenInfo?.id}&nbsp;<span>{myTokenInfo?.title}</span>
							</p>
							<div className="infoCont">
								<p className="info">{myTokenInfo?.description}</p>
								<a href="#" id='nftaddprevPageMore' onClick={()=>readMore('nftaddprevPageMore')}>Read More</a>
							</div>
						</div>
						<div className="txtArea2">
							<p>Owner</p>
							<div className="prof">
								<div className="txtBox">
									<p style={{ cursor: 'pointer' }} onClick={()=>{window.open('https://etherscan.io/address/'+myTokenInfo?.owner)}}>
									{myTokenInfo && myTokenInfo?.owner.substr(0, 7)}...
									{myTokenInfo && myTokenInfo?.owner.substr(myTokenInfo?.owner.length - 7)}
									</p>
								</div>
							</div>
						</div>
						<div className="txtArea3" style={{height:'400px'}}>
							{auction ? (
								<SectionCardDown {...auction} />
								) : 
								<>
								<div className="titCont">
									<div className="bidsCont">
									<p>Latest Bids</p>
									</div>
								</div>
								<ul>
									<li>
										<div className="txtBox">
											<p><span>NO BIDDING</span></p>
										</div>
									</li>
								</ul>
								</>
							}

						</div>
						<div className="sellCont">
								{myTokenInfo && account ===  myTokenInfo?.owner && 
								<a href="#" className="sellBtn" onClick={() => $(".createauctionPop").show()}>SELL</a>
								}

						</div>
					</div>
				</div>
			</div>

		<div className="buynowPop clsePop">
			<div className="shadow" onClick={clsePop}></div>
			<div className="contArea">
				<p className="tit">
					Buy Now <a href="#" className="clse"><img
						src={btn_close} onClick={clsePop} alt="닫기"/></a>
				</p>
				<div className="imgArea">
					<span className="frame"><img
						src={auction?.mnb_nft_master?.img} alt=""/></span>
					<div className="txtbox">
						<p>You are about to purchase</p>
						<p>
							<span>#{auction?.auctionId}</span>&nbsp;<em>{auction?.auctionTitle}</em>
						</p>
						<p>
							from <span>
								{auction && auction?.seller.substr(0, 7)}...
								{auction && auction?.seller.substr(auction?.seller.length - 7)}
								</span>
						</p>
					</div>
				</div>
				<div className="infoArea">
					<p>
						Buy now price<span><em>{new BigNumber(auction?.buyNowPrice)
								.div(new BigNumber(10).pow(18))
								.toString()}{' '}</em>TVP</span>
					</p>
				</div>
				<div className="btnArea">
					<a href="#" className='on' id="buyNowId" onClick={onBuyNow}>CONFIRM</a>
				</div>
			</div>
		</div>

		<div className="placebidPop clsePop">
			<div className="shadow" onClick={clsePop}></div>
			<div className="contArea">
				<p className="tit">
					Place a Bid <a href="#" className="clse"><img
						src={btn_close} onClick={clsePop} alt="닫기"/></a>
				</p>
				<div className="imgArea">
					<span className="frame"><img src={auction?.mnb_nft_master?.img} alt=""/></span>
					<div className="txtbox">
						<p>You are about to purchase</p>
						<p>
							<span>#{auction?.auctionId}</span>&nbsp;<em>{auction?.auctionTitle}</em>
						</p>
						<p className="omit">
							from <span>
								{auction && auction?.seller.substr(0, 7)}...
								{auction && auction?.seller.substr(auction?.seller.length - 7)}
								</span>
						</p>
					</div>
				</div>
				<div className="bidArea">
					<p>Your bid</p>
					<div className="inputArea">
						<input type="text" id="bidinput" ref={inputRef} onKeyUp={biddingChk} placeholder="Enter amount"/>
						<span>TVP</span>
					</div>
					<span className="err" style={{display:'none'}}>Must be higher than the highest bid</span>
				</div>
				<div className="btnArea">
					{/* className="on" 이면 버튼 활성화 */}
					<a href="#" className="placeBid" onClick={onPlaceBid} >PLACE A BID</a>
				</div>
			</div>
		</div>

		{/* 경매 생성하기 팝업 */}
		<div className="createauctionPop clsePop">
			<div className="shadow" onClick={clsePop}></div>
			<div className="contArea">
				<p className="tit">
					Create Auction <a href="#" className="clse"><img src={btn_close} alt="닫기" onClick={clsePop}/></a>
				</p>

				<div className="inputbox step1 err">
					<p>Starting price*</p>
					<div className="inputArea">
						<input type="text" id="startPrice" placeholder="Enter a starting price" onKeyUp={chkCreateAuc1}/>
						<span>TVP</span>
					</div>
					<span className="err" style={{display:'none'}}>Please enter a starting price</span>
				</div>

				<div className="inputbox step2 err">
					<p>Buy now price*</p>
					<div className="inputArea">
						<input type="text" id="buyNowPrice" placeholder="Enter a buy now price" onKeyUp={chkCreateAuc2}/>
						<span>TVP</span>
					</div>
					<span className="err" style={{display:'none'}}>Please enter a buy now price</span>
				</div>

				<div className="inputbox step3 err">
					<p>End date*</p>
					<div className="inputArea">
						<input type="text" id="datetimepicker"
							placeholder="MM/DD/YYYY HH:MM AM" readOnly/> <span
							className="frame"><img src={auction_icon} alt=""/></span>
					</div>
					<span className="err" style={{display:'none'}}>Please enter a date</span>
				</div>

				<div className="btnArea">
					<a href="#" className="" id="createAuctionId" onClick={onClickCreateAuction}>CREATE AUCTION</a>
				</div>
			</div>
		</div>
		{/*경매 생성하기 팝업 END */}

		{/* 경매 생성 완료 팝업 */}
		<div className="auctionsuccessPop clsePop">
			<div className="shadow"></div>
			<div className="contArea">
				<div className="titbox">
					<p>Your auction has been</p>
					<p>successfully processed!</p>
				</div>
				<div className="imgArea">
					<span className="frame"><img src={myTokenInfo?.img} alt=""/></span>
					<p>
						🎉 You created an auction for <span>{myTokenInfo?.title}</span>
					</p>
				</div>
				<div className="btnArea">
					<a href="#" onClick={()=>{clsePop();history.push(`/mycollection`);}}>CONFIRM</a>
				</div>
			</div>
		</div>
		{/* 경매 생성 완료 팝업 END */}


		{/** 경매정산 팝업 START*/}
		<div className="settlePop clsePop" id='settlePop'>
			<div className="shadow" onClick={clsePop}></div>
			<div className="contArea">
				<p className="tit">
					Settle <a href="#" className="clse"><img
						src={btn_close} alt="닫기" onClick={clsePop}/></a>
				</p>
				<div className="imgArea">
					<span className="frame"><img
						src={auction?.mnb_nft_master?.img} alt=""/></span>
					<div className="txtbox">
						<p>You are about to settle for</p>
						<p>
							<span>#{auction?.auctionId}</span>&nbsp;<em>{auction?.mnb_nft_master.auctionTitle}</em>
						</p>
						<p className="omit">
							from <span>{auction && auction?.highestBidder && auction?.highestBidder.substr(0, 7)}...
									   {auction && auction?.highestBidder && auction?.highestBidder.substr(auction?.highestBidder.length - 7)} </span>
						</p>
					</div>
				</div>
				<div className="infoArea">
					<p>
						You will receive<span><em>{new BigNumber(auction?.currentPrice)
								.div(new BigNumber(10).pow(18))
								.toString()}{' '}</em>TVP</span>
					</p>
				</div>
				<div className="btnArea">
					<a href="#none" onClick={onClickSettleAuction}>SETTLE</a>
				</div>
			</div>
		</div>
		{/** 경매정산 팝업 END*/}

		{/** 경매정산 예외 팝업 START*/}
		<div className="settlePop clsePop" id='settleNotPop'>
			<div className="shadow" onClick={clsePop}></div>
			<div className="contArea">
				<p className="tit">
					Settle <a href="#" className="clse"><img
						src={btn_close} alt="닫기" onClick={clsePop}/></a>
				</p>
				<div className="imgArea">
					<span className="frame"><img
						src={auction?.mnb_nft_master?.img} alt=""/></span>
					<div className="txtbox">
						<p>You are about to settle for</p>
						<p>
							<span>#{auction?.auctionId}</span>&nbsp;<em>{auction?.mnb_nft_master?.title}</em>
						</p>
					</div>
				</div>
				<div className="infoArea">
					<span>
						<p style={{ color: '#EF4B4B', fontSize:'10' , fontWeight : 'normal', textAlign:'center'}} >There is no bidding history, so settlement is not possible.</p>
					</span>
				</div>
				<div className="btnArea">
					<a href="#" onClick={clsePop}>CONFIRM</a>
				</div>
			</div>
		</div>
		{/** 경매정산 예외 팝업 END*/}


	</>	
  );
};

export default ItemDetailsContainer;
