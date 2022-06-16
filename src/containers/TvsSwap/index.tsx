import React from 'react';
import { useHistory } from 'react-router-dom';
import MyItem from '../../components/MyItem';
import { useWeb3React } from '@web3-react/core';
import myItemsAtom from '../../atoms/myItems';
import myAuctionsAtom from '../../atoms/myAuctions';
import MyAuctionItem from '../../components/MyAuctionItem';
import { useMoralisWeb3Api } from 'react-moralis';
import { useRecoilValue, useRecoilState} from 'recoil';
import walletAccountAtom from '../../atoms/walletAccount';
import myPointAtom from '../../atoms/myPoint';
import { useParams } from 'react-router';
import $ from 'jquery';
import axios from 'axios';
import btn_close from '../../assets/img/btn_close.png';
import web3 from '../../connection/web3';
import BigNumber from 'bignumber.js';
import { swapHistory } from '../../types';
import addresses from '../../constants/addresses';

const TokenSwapContainer = () => {


	const { account: mAccount } = useMoralisWeb3Api();
	const history = useHistory();
	const { account ,deactivate } = useWeb3React();
	const { regFlag }: { regFlag?: string } = useParams();
	
	const mobileWidth = document.documentElement.clientWidth;

	//const { chainId, account, activate, deactivate, active } = useWeb3React();
	const walletAccount = useRecoilValue(walletAccountAtom);
	const [mySwapHistory, setMySwapHistory] = React.useState<swapHistory>();
	const [myItems, setMyItems] = useRecoilState(myItemsAtom);
	
	const [tvsPoint, setTvsPoint] = React.useState<String>();
	const [tvpPoint, setTvpPoint] = React.useState<String>();

	const setTokenSwap = async () => { 
		try {
			
			var data = JSON.stringify({
				"address": walletAccount,
				"marketYn" : "Y"
			});
	
			var config = {
				method: 'post',
				url: addresses.targetIp+'/nft/tokenSwap',
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
					console.log(jsonData.toeknSwapList[0]);
				}else{
					alert('조회실패!');
				}
	
			})
			.catch(function (error) {
				console.log(error);
			});
	
		  } catch (e) {
			console.log(e);
		}
	}


	const transferToken = async () => { 
		try {
			
			var data = JSON.stringify({
				"address": walletAccount
			});
	
			var config = {
				method: 'post',
				url: addresses.targetIp+'/nft/transfer',
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
					console.log(jsonData.toeknSwapList[0]);
				}else{
					alert('조회실패!');
				}
	
			})
			.catch(function (error) {
				console.log(error);
			});
	
		  } catch (e) {
			console.log(e);
		}
	}

	

	const getSwapHistory = async () => {
	  console.log(account);
	  try {

		//json  형태
      
      	var data = JSON.stringify({
        	"address": walletAccount
        });
      

        var config = {
			method: 'post', 
			url: addresses.targetIp+'/nft/mySwapHistory',
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
				console.log(jsonData.swapHistory);

				setMySwapHistory(jsonData.swapHistory);
			}else{
				alert('조회실패!');
			}


		})
		.catch(function (error) {
			console.log(error);
		});
  
		


	  } catch (e) {
		console.log(e);
	  }
	};

	const getMyInfo = async () => {
		console.log(account);
		try {
		
			var data = JSON.stringify({
			  "address": walletAccount
		  });
		
  
		  var config = {
			  method: 'post', 
			  url: addresses.targetIp+'/users/myUserInfo',
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
				  const userInfo = jsonData.userInfo;
					
				  console.log(userInfo);

				  setTvpPoint(userInfo.tvp_amount);
				  setTvsPoint(userInfo.tvs_amount);
			  }else{
				  alert('조회실패!');
			  }
  
  
		  })
		  .catch(function (error) {
			  console.log(error);
		  });
	
		  
  
  
		} catch (e) {
		  console.log(e);
		}
	  };
  
	const tokenSwap = async () => {

		var params = [
			{
			  from: walletAccount,
			  to: '0x5250aF06253653812537CB5C25964434224781E9', //마더지갑 고정
			  gas: '0x5208', // 3
			  gasPrice: '0x9184e72a000', // 10000000000000
			  value: '0x'+ new BigNumber(web3.utils.toWei($("#tvsPoint").val(), 'ether')).toString(16), // 2441406250
			},
		  ];
		  var method = 'eth_sendTransaction';
	
		  web3.currentProvider.sendAsync(
		  {
			method,
			params
		  },
		  function (err, result) {
			
			if(JSON.stringify(result.result) === undefined){
				alert('스왑 오류')
			}else{
				console.log(JSON.stringify(result.result));
				alert("토큰 스왑 신청이 완료되었습니다.")
			}
	
		  });

	  
	};
  
	


	const exchange = () => { 

		$('.placebidPop').show();
		
	}

	function clsePop(){
		$(".clsePop").hide();
	  }

	React.useEffect(() => {
	  if (account) {
		getMyInfo();
		getSwapHistory();
	  }
	}, [account]);

  return (
    
	<>
	<div id="MynftsPage" >
		<div className="mynftBG"></div>
		<div className="content">
			<h2 style={ mobileWidth < 768  ? { fontSize:'10pt' }:{}} ></h2>
			<div className="sortArea">
				<ul>
					<li id='auctionList' className="on" onClick={()=>{$('.sort1').show(); $('.sort2').hide(); $('#auctionList').addClass('on');$('#Unlisted').removeClass('on');}}><a href="#">보유자산</a></li>
					<li id='Unlisted' onClick={()=>{$('.sort1').hide();$('.sort2').show();$('#Unlisted').addClass('on');$('#auctionList').removeClass('on');}}><a href="#">Swap History</a></li>
				</ul>
			</div>
			<div className="listArea sort1">
				<ul>
					<div style={{height:'200px' ,width:'100%'}}>
						<div style={{height:'100px' ,width:'100%'}}>TVS 계좌 {account}</div>
						<div style={{height:'100px' ,width:'100%'}}>TVS 보유 수량 {tvsPoint}</div>
					</div>
					<div style={{height:'100px' ,width:'100%'}}>
						<div style={{height:'100px' ,width:'100%'}}>TVP 수량 {tvpPoint}</div>
					</div>
					<div style={{backgroundColor:'red'}} >
						<a href="#" onClick={exchange} className="on">Token Swap Request(FROM TVS TO TVP)</a>
					</div>
					<div style={{backgroundColor:'blue'}} >
						<a href="#" onClick={transferToken} className="on">Token Swap Request(FROM TVP TO TVS)</a>
					</div>
				</ul>
			</div>
			<div className="listArea sort2">
				<ul>
					<div style={{height:'386px' , display: 'flex', justifyContent: 'center', alignItems: 'center' , fontSize:'30pt',width:'100%'}}>
					<table>
						<tr>
							<td width={200} height={40}>DATE</td>
							<td width={200} height={40}>FROM</td>
							<td width={200} height={40}>TO</td>
							<td width={200} height={40}>BALANCE</td>
							<td width={200} height={40}>TXID</td>
						</tr>
					{mySwapHistory && mySwapHistory.map((swapHist) => (
						<tr>
							<td width={200}>{swapHist.swapDate}</td>
							<td width={200}>{swapHist.from}</td>
							<td width={200}>{swapHist.to}</td>
							<td width={200}>{swapHist.balance}</td>
							<td width={200}>{swapHist.txid}</td>
						</tr>
					))}  
					</table>
					</div>
				</ul>
			</div>
			<div className="btnArea" style={{display:'none'}}>
				<a href="#none">LOAD MORE</a>
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
			<div className="bidArea">
				<p>FROM : TVS</p>
				<div className="inputArea">
					<input type="text" id="tvsPoint" />
					<span>TVS</span>
				</div>
			</div>
			<div className="bidArea">
				<p>TO : TVP</p>
				<div className="inputArea">
					<input type="text" id="tvpPoint" />
					<span>TVP</span>
				</div>
				<span className="err" style={{display:'none'}}>Must be higher than the highest bid</span>
			</div>
			<div className="btnArea">
				{/* className="on" 이면 버튼 활성화 */}
				<a href="#" className="placeBid" onClick={()=>{tokenSwap()}} >PLACE A BID</a>
			</div>
		</div>
	</div>


	</>

  );
};

export default  TokenSwapContainer;
