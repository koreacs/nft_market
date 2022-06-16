import { getTokenInfo } from '../../utils';
import CardNewListed from './CardNewListed';
import './Explore2.css';
import React from 'react';
import auctionCategoryAtom from '../../atoms/auctionCategory';
import auctionKeywordAtom from '../../atoms/auctionKeyword';
import auctionSortAtom from '../../atoms/auctionSort';
import isSearchFinishAtom from '../../atoms/isSearchFinish';
import isCategoryFinishAtom from '../../atoms/isCategoryFinish';
import contracts from '../../constants/contracts';
import { IAuction } from '../../types/index';
import $ from 'jquery';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import addresses from '../../constants/addresses';
import walletAccountAtom from '../../atoms/walletAccount';
import { useRecoilValue } from 'recoil';

const AuctionContainer = () => {
  const [auctionSort, setAuctionSort] = useRecoilState(auctionSortAtom);
  const [auctionKeyword] = useRecoilState(auctionKeywordAtom);
  const [auctionCategory, setAuctionCategory] = useRecoilState(auctionCategoryAtom);
  const [auctions, setAuctions] = React.useState<IAuction[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [offset, setOffset] = React.useState<number>(0);
  const [limit, setLimit] = React.useState<number>(8);
  const [sortLimit, setSortLimit] = React.useState<number>(8);
  const [searchFinish] = useRecoilState(isSearchFinishAtom);
  const [categoryFinish] = useRecoilState(isCategoryFinishAtom);
  const [loadFinish, setLoadFinish] = React.useState<boolean>(true);
  const [sortGubun, setSortGubun] = React.useState<boolean>(false);
  const [reCallback, setReCallback] = React.useState<number>(0);
  const walletAccount = useRecoilValue(walletAccountAtom);
  let timer;

  const selectCategory = event => {

    const targetId = event.currentTarget.id;

    if ($("#"+targetId).prop("checked")) {
      let chkVal = $("#"+targetId).val();
      $(".sortchkList").append("<span gubun='"+chkVal+"'><em className='sortchkTxt'>"+chkVal+"</em><a href='#'><i className='fas fa-times'></i></a></span>");
      
      if(chkVal === 'Diamond'){
        setAuctionCategory(1);
      }else if(chkVal === 'Artwork'){
        setAuctionCategory(2);
      }else if(chkVal === 'Digital Art'){
        setAuctionCategory(3);
      }
      

      $("#explorePage>.content>.itemlistArea>.sortchkList>span>a").on("click",function(){
        let chkgubun = $(this).parent().attr("gubun");
        $(this).parent().remove();
        console.log("체크해제 호출")
        $("#explorePage>.content>.sortArea>ul>li>.subsortMnu>ol>li>input").each(function(index, item){
          let chkval = $(item).val();
          console.log(chkval)
          if (chkgubun === chkval) {
            $(item).prop('checked',false);
            setReCallback(reCallback+2);
            console.log(chkgubun);
            console.log("체크 해제1");
          }
        });
      });
      
      setReCallback(reCallback+1);


    } else {
      let chkVal = $("#"+targetId).val();
      $(".sortchkList>span").each(function(index, item){
        let chkgubun = $(item).attr("gubun");
        if (chkVal === chkgubun) {
          console.log("체크해제 카테고리 : " + chkVal)
          console.log("체크해제 인덱스 : " + index)
          $(item).remove();

        }
      });
      
      setReCallback(reCallback+1);

      console.log("체크 해제2");
    }


  }

  const clickSortBy = event => {

    if ($('.sortbyBtn').hasClass('off')) {
      $('.sortbyBtn').removeClass('off').addClass('on').siblings().stop().slideDown('fast');
      $('.sortbyBtn').children('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
    } else if ($('.sortbyBtn').hasClass('on')) {
      $('.sortbyBtn').removeClass('on').addClass('off').siblings().stop().slideUp('fast');
      $('.sortbyBtn').children('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
    }
    event.preventDefault();
  }

 
  
  const clickCategory = () => {

    if ($('.sortmnuBtn').hasClass('off')) {
      $('.sortmnuBtn').removeClass('off').addClass('on').siblings().stop().slideDown('fast');
      $('.sortmnuBtn').children('i').removeClass('fa-chevron-right').addClass('fa-chevron-down');
    } else if ($('.sortmnuBtn').hasClass('on')) {
      $('.sortmnuBtn').removeClass('on').addClass('off').siblings().stop().slideUp('fast');
      $('.sortmnuBtn').children('i').removeClass('fa-chevron-down').addClass('fa-chevron-right');
    }

  }

  $("#explorePage>.content>.itemlistArea>.titleArea>.sortbyArea>ul>li>a").on("click",function(evt) {
    var sortbyVal = $(this).text();

    $("#explorePage>.content>.itemlistArea>.titleArea>.sortbyArea>a").removeClass("on").addClass("off").children("span").text(sortbyVal);
    $(this).parents(".sortbyPop").stop().slideUp('fast');

    if(sortbyVal === 'Newest'){
      setSortGubun(true);
      setAuctionSort(0);
    }else if(sortbyVal === 'Oldest'){
      setSortGubun(true);
      setAuctionSort(1);
    }else if(sortbyVal === 'A to Z'){
      setSortGubun(true);
      setAuctionSort(2);
    }else if(sortbyVal === 'Z to A'){
      setSortGubun(true);
      setAuctionSort(3);
    }else if(sortbyVal === 'Ending Soon'){
      setSortGubun(true);
      setAuctionSort(4);
    }else if(sortbyVal === 'HotBid'){ //임시사용
      setSortGubun(true);
      setAuctionSort(1);
    }else if(sortbyVal === 'LiveAuction'){ //임시사용
      setSortGubun(true);
      setAuctionSort(0);
    }
    evt.preventDefault();
  });

  const resetFn = () =>{
    
    $("#explorePage>.content>.sortArea>ul>li>.subsortMnu>ol>li>input").each(function(index, item){
      $(item).prop('checked',false);
    });

    $(".sortchkList").children().remove();
    setReCallback(reCallback+1);
    
  }

  const setCategoryLeft = () =>{
    
      let chkVal = '';

      if(auctionCategory === 1){
        chkVal = 'Diamond';
      }else if(auctionCategory === 2){
        chkVal = 'Artwork';
      }else if(auctionCategory === 3){
        chkVal = 'Digital Art';
      }

      if ($(".sortmnuBtn").hasClass('off')) {
        $(".sortmnuBtn").removeClass('off').addClass('on').siblings().stop().slideDown('fast');
        $(".sortmnuBtn").children('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
      } 
      

      
      $("#explorePage>.content>.sortArea>ul>li>.subsortMnu>ol>li>input").each(function(index, item){
        if ($(item).val() === chkVal) {
          $(item).prop('checked',true);
          if(!item.getAttribute("checked")){
            $(".sortchkList").append("<span gubun='"+chkVal+"'><em className='sortchkTxt'>"+chkVal+"</em><a href='#'><i className='fas fa-times'></i></a></span>");
          }
        }
      });

      $("#explorePage>.content>.itemlistArea>.sortchkList>span>a").on("click",function(){
        $(this).parent().remove();
        let chkgubun = $(this).parent().attr("gubun");
        $("#explorePage>.content>.sortArea>ul>li>.subsortMnu>ol>li>input").each(function(index, item){
          let chkval = $(item).val();
          if (chkgubun === chkval) {
            $(item).prop('checked',false);
            //setAuctionCategory(0);
            setReCallback(reCallback+1);
            console.log("체크 해제");
          }
        });
      });


    //}
  }

  const getAuctions = async (leadMore) => {

    var jsonLimit = limit;
    var categoryArray = new Array();
    $("#explorePage>.content>.sortArea>ul>li>.subsortMnu>ol>li>input").each(function(index, item){
      if($(item).prop('checked')){
        categoryArray.push(index+1);
      }
    });

    //재검색의 경우 페이징 기본으로 설정
    if(leadMore === ''){
      setOffset(0);
      setLimit(8);
      jsonLimit = 8;
    }else if(leadMore === 'Y'){
      setLimit(limit+8);
      jsonLimit = jsonLimit+8;
    }

    //json  형태  
    var data = JSON.stringify({
      "category" : categoryArray,
      "keyword" : auctionKeyword,
      "orderby" : auctionSort,
      "offset" : offset,
      "limit" : jsonLimit,
      "address" : walletAccount
    });
      
    let config = {
      method: 'post',
      url: addresses.targetIp+'/nft/auctionList',
      headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config).then(function (response) {

      const jsonData = JSON.parse(JSON.stringify(response.data));
      
      if(jsonData.result.code === 200){
        
        setLoadFinish(false);        

        const openAuctions = jsonData.result.auctionList;
        const nextPage = jsonData.result.nextPage;
        setTotalCount(jsonData.result.totalCount);
        
        let targetCategory = '';
        $("#explorePage>.content>.sortArea>ul>li>.subsortMnu>ol>li>input").each(function(index, item){
          if($(item).prop("checked")){
            targetCategory = targetCategory+ (index+1);
          }
        });
        
        if(nextPage !== 'Y'){
          $(".btnArea").hide();
        }else{
          $(".btnArea").show();
        }

        setAuctions(openAuctions);

      }else{
        alert('조회실패!');
      }
      setLoadFinish(true);
    })
    .catch(function (error) {
      console.log(error);
    });

  };


 


  React.useEffect(() => {

    if(loadFinish){

      console.log("getauction 호출");
        getAuctions('').catch((e) => {console.log(e.message);});  
        
       }else{
         console.log("로딩실패 재시도");
       }
    
  }, [searchFinish, reCallback]);

  React.useEffect(() => {

    if(loadFinish){

      console.log("getauction 호출");
        getAuctions('N').catch((e) => {console.log(e.message);});  
        
       }else{
         console.log("로딩실패 재시도");
       }
    
  }, [auctionSort]);
  
  
  React.useEffect(() => {
    if(loadFinish){
      resetFn();
      setCategoryLeft();
    }
  },[categoryFinish])

  React.useEffect(() => {
    
    const first = document.documentElement.clientWidth;

    if(first <= 768){
      clickCategory();
    }
    
  },[])

  



  return (
    <>
      <div id="explorePage">
      <div className="content">
        <div className="sortArea">
          <ul>
            <li><p>Filter<a href="#" className="resetBtn" onClick={resetFn}>Reset</a></p></li>
            <li>
              <a href="#none" className="sortmnuBtn off" onClick={clickCategory}>Category<i className="fas fa-chevron-right"></i></a>
              <div className="subsortMnu">
                <ol>
                  <li><p>Diamond</p><input className="sortChkFn" id="sortChk2" type="checkbox" value="Diamond" onClick={selectCategory}/><label htmlFor="sortChk2"><i className="fas fa-check"></i></label></li>
                  <li><p>Artwork</p><input className="sortChkFn" id="sortChk3" type="checkbox" value="Artwork"onClick={selectCategory}/><label htmlFor="sortChk3"><i className="fas fa-check"></i></label></li>
                  <li><p>Digital Art</p><input className="sortChkFn"  id="sortChk4" type="checkbox" value="Digital Art" onClick={selectCategory}/><label htmlFor="sortChk4"><i className="fas fa-check"></i></label></li>
                </ol>
              </div>
            </li>
          </ul>
        </div>
        <div className="itemlistArea">
          <div className="titleArea">
            <p><span>{(loadFinish || totalCount >0) ? totalCount+' items':''}</span> </p>
            <div className="sortbyArea">
              <a href="#none" className="sortbyBtn off" onClick={clickSortBy}><span>Sort by</span> <i className="fas fa-chevron-down"></i></a>
              <ul className="sortbyPop">
                {/*<li><a href="#none" >A to Z</a></li>*/}
                {/*<li><a href="#none" >Z to A</a></li>*/}
                {/*<li><a href="#none" >Newest</a></li>*/}
                {/*<li><a href="#none" >Oldest</a></li>*/}
                <li><a href="#none" >HotBid</a></li>
                <li><a href="#none" >LiveAuction</a></li>
                {/*<li><a href="#none" >Ending Soon</a></li>*/}
              </ul>
            </div>
          </div>
          <div className="sortchkList">
          </div>
          {}
          

          {auctions && auctions.length > 0 ? 
            <CardNewListed auctions={auctions} /> 
            : 
            <div style={{height:'386px' , display: 'flex', justifyContent: 'center', alignItems: 'center' , fontSize:'30pt',width:'100%'}}>
              <p>{(loadFinish) ? 'Nothing here yet':''}</p>
            </div>
					}

          

          <div className="btnArea">
            {auctions && auctions.length > 0 && (
              <a href="#none" onClick={() => getAuctions('Y').then(()=>{setLoadFinish(true);}).catch((e) => {setLoadFinish(true);})} >LOAD MORE</a>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AuctionContainer;
