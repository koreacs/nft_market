import React from 'react';
import $ from 'jquery';
import mainlogo from '../../../assets/img/mainlogo.png';
import srch from '../../../assets/img/srch.png';

import mnu1 from '../../../assets/img/mnu1.png';
import mnu2 from '../../../assets/img/mnu2.png';
import mnu3 from '../../../assets/img/mnu3.png';
import mnu4 from '../../../assets/img/mnu4.png';
import mnu5 from '../../../assets/img/mnu5.png';
import mnu6 from '../../../assets/img/mnu6.png';
import mnu7 from '../../../assets/img/mnu7.png';
import mnu8 from '../../../assets/img/mnu8.png';

import userOn from '../../../assets/img/userOn.png';
import TVsOn from '../../../assets/img/TVsOn.png';
import logoutOn from '../../../assets/img/logoutOn.png';



import en from '../../../assets/img/EN.png';
import ko from '../../../assets/img/KO.png';

import nodataImg from '../../../assets/img/nodataImg.png';
import btn1 from '../../../assets/img/btn1.png';
import mainlogo2 from '../../../assets/img/mainlogo2.png';
import srch2 from '../../../assets/img/srch2.png';
import mobMnu from '../../../assets/img/mobMnu.png';

import comingsoon from '../../../assets/img/comingsoon.png';
import btn4 from '../../../assets/img/btn4.png';
import { useRecoilState } from 'recoil';
import auctionKeywordAtom from '../../../atoms/auctionKeyword';
import auctionCategoryAtom from '../../../atoms/auctionCategory';
import isSearchFinishAtom from '../../../atoms/isSearchFinish';
import isCategoryFinishAtom from '../../../atoms/isCategoryFinish';

import { useHistory } from 'react-router-dom';

import { useWeb3React } from '@web3-react/core';
import { useSetRecoilState } from 'recoil';
import walletAccountAtom from '../../../atoms/walletAccount';
import myPointAtom from '../../../atoms/myPoint';
import addresses from '../../../constants/addresses';
import axios from 'axios'; // 액시오스
import { injectedConnector } from '../../../connector';

function explore(){

  if ($("#exploreId").hasClass('off')) {
    $("#exploreId").removeClass('off').addClass('on').siblings().stop().slideDown();
    $("#exploreId").children('i').removeClass('fa-caret-down').addClass('fa-caret-up');
    $("#exploreId").parent().siblings().children('a').removeClass('on').addClass('off');
    $("#exploreId").parent().siblings().children('.subMnu').stop().slideUp();
    $("#exploreId").parent().siblings().children('a').children('i').removeClass('fa-caret-up').addClass('fa-caret-down');
    
    $("header>.headerInner>.connectBtns>ul>li>a.myInfo").removeClass('on').addClass('off').siblings().stop().slideUp();
  } else if ($("#exploreId").hasClass('on')) {
    $("#exploreId").removeClass('on').addClass('off').siblings().stop().slideUp();
    $("#exploreId").children('i').removeClass('fa-caret-up').addClass('fa-caret-down');
  }
}

function clickMyInfo(){

  if ($("#myInfoId").hasClass('off')) {
    $("#myInfoId").removeClass('off').addClass('on').siblings().stop().slideDown();
    $("header>.headerInner>nav>ul>li>a").removeClass('on').addClass('off').siblings().stop().slideUp();
    $("header>.headerInner>nav>ul>li>a").children('i').removeClass('fa-caret-up').addClass('fa-caret-down');
  } else if ($("#myInfoId").hasClass('on')) {
    $("#myInfoId").removeClass('on').addClass('off').siblings().stop().slideUp();
  }

}

function guides(){

	if ($("#guidesDiv").hasClass('off')) {
		$("#guidesDiv").removeClass('off').addClass('on').siblings().stop().slideDown();
		$("#guidesDiv").children('i').removeClass('fa-caret-down').addClass('fa-caret-up');
		$("#guidesDiv").parent().siblings().children('a').removeClass('on').addClass('off');
		$("#guidesDiv").parent().siblings().children('.subMnu').stop().slideUp();
		$("#guidesDiv").parent().siblings().children('a').children('i').removeClass('fa-caret-up').addClass('fa-caret-down');
		
	  } else if ($("#guidesDiv").hasClass('on')) {
		$("#guidesDiv").removeClass('on').addClass('off').siblings().stop().slideUp();
		$("#guidesDiv").children('i').removeClass('fa-caret-up').addClass('fa-caret-down');
	  }
}

function tokoenSwap(){

	if ($("#tokenSwapDiv").hasClass('off')) {
		$("#tokenSwapDiv").removeClass('off').addClass('on').siblings().stop().slideDown();
		$("#tokenSwapDiv").children('i').removeClass('fa-caret-down').addClass('fa-caret-up');
		$("#tokenSwapDiv").parent().siblings().children('a').removeClass('on').addClass('off');
		$("#tokenSwapDiv").parent().siblings().children('.subMnu').stop().slideUp();
		$("#tokenSwapDiv").parent().siblings().children('a').children('i').removeClass('fa-caret-up').addClass('fa-caret-down');
		
	  } else if ($("#tokenSwapDiv").hasClass('on')) {
		$("#tokenSwapDiv").removeClass('on').addClass('off').siblings().stop().slideUp();
		$("#tokenSwapDiv").children('i').removeClass('fa-caret-up').addClass('fa-caret-down');
	  }
}

const mobileGuides = () => {
  if ($("#mobileGuides").hasClass('off')) {
		$("#mobileGuides").removeClass('off').addClass('on').siblings().stop().slideDown();
		$("#mobileGuides").children('i').removeClass('fa-caret-down').addClass('fa-caret-up');
		$("#mobileGuides").parent().siblings().children('a').removeClass('on').addClass('off');
		$("#mobileGuides").parent().siblings().children('.subMnu').stop().slideUp();
		$("#mobileGuides").parent().siblings().children('a').children('i').removeClass('fa-caret-up').addClass('fa-caret-down');
		
	  } else if ($("#mobileGuides").hasClass('on')) {
		$("#mobileGuides").removeClass('on').addClass('off').siblings().stop().slideUp();
		$("#mobileGuides").children('i').removeClass('fa-caret-up').addClass('fa-caret-down');
	  }
}

function clsePop(){
	$(".clsePop").hide();
}


function SidenavHeader({ AsidelogoCt, hideShowSidebar }) {


   const [auctionKeyword, setAuctionKeyword] = useRecoilState(auctionKeywordAtom);
   const [auctionCategory, setAuctionCategory] = useRecoilState(auctionCategoryAtom);
   const [searchFinish, setSearchFinish] = useRecoilState(isSearchFinishAtom);
   const [categoryFinish, setCategoryFinish] = useRecoilState(isCategoryFinishAtom);
   
   const history = useHistory();

   const { chainId, account, activate, deactivate, active } = useWeb3React();

  const setWalletAccount = useSetRecoilState(walletAccountAtom);
  const setMyPoint = useSetRecoilState(myPointAtom);

  const createAddress = ['0xFcBe931F2D2Ab2B96220dB0ccae2F21e41541031','0xFcBe931F2D2Ab2B96220dB0ccae2F21e41541123','0x48c0Ed2DBdbDE7698C32f139794964BFF12C0206','0x20Ff31FD9DD17315aD5B6EB286291Baa9A0F46a0','0xe0B6b5268AD6b1bE8B4c6028189C1B98D7694D2d','0x2b5FB89feFb00c2e8801E6DaFe5236f4b35e1614'];

  const createItem = ()=>{

    if(window.localStorage.getItem('wallet') === 'metamask' && account){
      history.push('/createitem');  
    }else{
      activate(injectedConnector,(error)=>{
        if(error.toString().indexOf('No Ethereum provider was found on window.ethereum') > 0 ){
          window.open('https://metamask.io/download.html');
        }
      });

      window.localStorage.setItem('wallet', 'metamask');
    }

  }

  const walletConnect = ()=>{
    activate(injectedConnector,(error)=>{
      if(error.toString().indexOf('No Ethereum provider was found on window.ethereum') > 0 ){
        window.open('https://metamask.io/download.html');
      }
    });
    window.localStorage.setItem('wallet', 'metamask');
  }
  
  const mobmnuPop = ()=>{
    $(".mobmnuPop").toggle();
  }

  const mobileExplore = ()=>{
    $(".mobmnuPop>ul>li>.subMnu").toggle();
  }

  //모바일 메뉴 출력 스크립트
  $("header>.headerInner.mob>.mobmnuArea>ul>li>a.mobmnuBtn").on("click",function(evt){
    $(".mobmnuPop").stop().fadeToggle("fast");
    evt.preventDefault();
  });

  //모바일 메뉴 슬라이드 출력 스크립트
  $("section>.mobmnuPop>ul>li>a").on("click",function(evt){
    if ($(this).hasClass('off')) {
      $(this).removeClass('off').addClass('on').siblings().stop().slideDown('fast');
      $(this).children('i').removeClass('fa-caret-right').addClass('fa-caret-down');
    } else if ($(this).hasClass('on')) {
      $(this).removeClass('on').addClass('off').siblings().stop().slideUp('fast');
      $(this).children('i').removeClass('fa-caret-down').addClass('fa-caret-right');
    }
    evt.preventDefault();
  });
  

  const getMyInfo = async () => {

		try {
		
			var data = JSON.stringify({
			  "address": account
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
  
			  console.log(response.data)
  
			  jsonData = JSON.parse(JSON.stringify(response.data));
  
			  
			  if(jsonData.result.code === 200){	
				const myUserInfo = jsonData.userInfo;
				
				if(myUserInfo){
          setMyPoint(myUserInfo[0].tvp_amount === null ? '0' :myUserInfo[0].tvp_amount);
				}

			  }else{
				console.log('프로필정보 조회 오류');
			  }
  
  
		  })
		  .catch(function (error) {
			  console.log(error);
		  });
	
		  
  
  
		} catch (e) {
		  console.log(e);
		}
	  };
    
  React.useEffect(() => {
    setWalletAccount(account || '');
    getMyInfo();
    
  }, [account]);
  
	const goAuction = async (category) => {
		await setAuctionCategory(Number(category));
    setCategoryFinish(categoryFinish+1);
		history.push("/auction");
		explore();
	};

  return (
    <div className="sidenav-header">
      <header className='fixedBox'>
      <div className="headerInner web">
        <a href="/" className="mainLogo"><img src={mainlogo} alt="로고"/></a>
        <div className="srchArea">
          <input type="text" onChange={(e) => setAuctionKeyword(e.target.value)}  placeholder="Search" value={auctionKeyword}/>
          <a href="#none" onClick={() =>{setSearchFinish(searchFinish+1);history.push('/auction');}} className="srch"><img src={srch} alt="검색"/></a>
        </div>
        <nav>
          <ul className="clearfix">
            <li className="off">
              <a href="#" id='exploreId' className="off" onClick={explore} >Explore<i className="fas fa-caret-down"></i></a>
              <div className="subMnu">
                <ol>
                  <li><a href="#" onClick={() => goAuction(0)}><span className="frame"><img src={mnu1} alt=""/></span> All</a></li>
                  <li><a href="#" onClick={() => goAuction(1)}><span className="frame"><img src={mnu4} alt=""/></span> Diamond</a></li>
                  <li><a href="#" onClick={() => goAuction(2)}><span className="frame"><img src={mnu2} alt=""/></span> Artwork</a></li>
                  <li><a href="#" onClick={() => goAuction(3)}><span className="frame"><img src={mnu5} alt=""/></span> Digital Art</a></li>
                </ol>
              </div>
            </li>
            <li><a href="#" style={ createAddress.indexOf(account) >= 0  ? { display:'' }:{display:'none'}}  onClick={createItem}>Create</a></li>
            <li>
              <a href="#" id='guidesDiv' className="off" onClick={guides} >Guides<i className="fas fa-caret-down"></i></a>
              <div className="subMnu">
                <ol>
                  <li><a href="https://drive.google.com/file/d/1vbF4SuPxgk6CiTwMWiezyU4BMw6CRhK4/view?usp=sharing" target="_blank"><span className="frame"><img src={en} alt=""/></span> English</a></li>
                  <li><a href="https://drive.google.com/file/d/14JretVHxoWX7TXLUZcTjaEoZz9W0PNIe/view?usp=sharing" target="_blank"><span className="frame"><img src={ko} alt=""/></span> Korean</a></li>
                </ol>
              </div>
            </li>
            <li><a href="#" onClick={()=>{history.push('/contact')}} >Contact Us</a></li>
          </ul>
        </nav>
        <div className="connectBtns">
          <ul className="clearfix">
            {window.localStorage.getItem('wallet') === 'metamask' && account ?
            (
            <li>
              <a href="#" className="myInfo off" id='myInfoId' onClick={clickMyInfo}><img src={nodataImg} alt=""/></a>
              <div className="infoCont">
                  <div className="promnubtns">
                    <ul>
                      <li>
                        <a href="#" onClick={event => {event.preventDefault(); $('.infoCont').hide(); history.push('/mycollection')}}><span className="frame type1"><img src={userOn} alt=""/></span>Profile</a>
                      </li>
                      <li>
                        <a href="#" onClick={event => {event.preventDefault(); $('.infoCont').hide(); history.push('/tvpSwap/Y')}}><span className="frame type1"><img src={TVsOn} alt=""/></span>TVP Swap</a>
                      </li>
                      <li>
                        <a href="#" onClick={event => {event.preventDefault(); $('.infoCont').hide(); deactivate(); window.localStorage.removeItem('wallet');history.replace('/');}} ><span className="frame type1"><img src={logoutOn} alt=""/></span>Disconnect</a>
                      </li>
                    </ul>
                  </div>
              </div>
            </li>
            )
            :
            (
            <li>
              <a href="#" className="connect" onClick={walletConnect}><img style={{width:101,height:32}} src={btn1} alt=""/></a>
            </li>
            )
			      }
          </ul>
        </div>
      </div>

      <div className="headerInner mob">
        <a href="/" className="mainLogo"><img src={mainlogo2} alt="로고"/><li>TREASUREVERSE</li></a>
        <div className="mobmnuArea">
          <ul className="clearfix">
            {/*<li><a href="#" className="srchBtn" onClick={() =>{setSearchFinish(searchFinish+1);history.push('/auction');}}><img src={srch2} alt=""/></a></li>*/}
            <li><a href="#" className="mobmnuBtn" onClick={mobmnuPop}><img src={mobMnu} alt=""/></a></li>
          </ul>
        </div>
      </div>
      </header>
      

		{/* 모바일 메뉴 팝업 */}
		<div className="mobmnuPop clsePop">
			<ul className="clearfix">
        <li>
          <div className='srchArea'>
            <input type="text" onChange={(e) => setAuctionKeyword(e.target.value)}  placeholder="Search" value={auctionKeyword}/>
            <a href="#none" onClick={() =>{setSearchFinish(searchFinish+1);history.push('/auction');mobmnuPop();}} className="srch"><img src={srch} alt="검색"/></a>
          </div>
        </li>
				<li><a href="#" className="off" onClick={mobileExplore}>Explore<i
						className="fas fa-caret-right"></i></a>
					<div className="subMnu">
						<ol>
							<li><a href="#" onClick={() => {goAuction(0);mobmnuPop();}}>All</a></li>
							<li><a href="#" onClick={() => {goAuction(1);mobmnuPop();}}>Diamond</a></li>
							<li><a href="#" onClick={() => {goAuction(2);mobmnuPop();}}>Artwork</a></li>
							<li><a href="#" onClick={() => {goAuction(3);mobmnuPop();}}>Digital Art</a></li>
						</ol>
					</div></li>
				<li><a href="#" onClick={() => {createItem();mobmnuPop();}}>Create</a></li>
				<li><a href="#" onClick={mobileGuides} id="mobileGuides" className="off">Guides<i
						className="fas fa-caret-right"></i></a>
					<div className="subMnu">
						<ol>
              <li><a href="https://drive.google.com/file/d/1vbF4SuPxgk6CiTwMWiezyU4BMw6CRhK4/view?usp=sharing" target="_blank">English</a></li>
							<li><a href="https://drive.google.com/file/d/14JretVHxoWX7TXLUZcTjaEoZz9W0PNIe/view?usp=sharing" target="_blank">Korean</a></li>
						</ol>
					</div></li>
				<li><a href="#" onClick={()=>{history.push('/contact');mobmnuPop();}}>Contact Us</a></li>
			</ul>
			<div className="mobBtnArea">
      {window.localStorage.getItem('wallet') === 'metamask' && account ?
			  (
					<a href="#" onClick={event => {event.preventDefault(); mobmnuPop(); history.push("/mycollection");}} className="myInfo off" id='myInfo'><img src={nodataImg} alt=""/></a>
			  )
			  
			  :
			  (
					<a href="#" className="connectBtn" onClick={() => {walletConnect();mobmnuPop();}}><img src={btn1} alt=""/></a>
			  )
        }
			</div>
		</div>
		{/* 모바일 메뉴 팝업 END */}



		{/* 문의하기 완료 팝업 */}
		<div className="inquirycompPop clsePop">
			<div className="shadow" onClick={clsePop}></div>
			<div className="contArea">
				<p className="tit">Your inquiry has been sent!</p>
				<div className="txtArea">
					<p>Thank you for your inquiry.</p>
					<p>We will send our reply to the</p>
					<p>email you entered.</p>
				</div>
				<div className="btnArea">
					<a href="#">CONFIRM</a>
				</div>
			</div>
		</div>
		{/* 문의하기 완료 팝업 END */}
    </div>
  );
}

export default SidenavHeader;
