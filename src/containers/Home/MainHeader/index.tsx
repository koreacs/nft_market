import leftArrow from '../../../assets/img/direction_left_arrow_icon.png';
import rightArrow from '../../../assets/img/direction_right_arrow_icon.png';
import $ from 'jquery';
import 'jquery.touchslider';
import 'swiper';
import React from 'react';
import { IAuction } from '../../../types/index';
import SwipeHotAuctionItem from './SwipeHotAuctionItem';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import addresses from '../../../constants/addresses';


const MainHeader = () => {
  const [auctions, setAuctions] = React.useState<IAuction[]>([]);
  const history = useHistory();

  
  const getAuctions = async () => {

      //json  형태  
      var data = JSON.stringify({
        "orderby" : '1',//HotBid
        "offset" : 0,
        "limit" : 3
  
      });
  
      var config = {
        method: 'post',
        url: addresses.targetIp+'/nft/auctionList',
        headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
        },
        data : data
      };
  
      var jsonData
      axios(config).then(function (response) {
    
        jsonData = JSON.parse(JSON.stringify(response.data));
  
        const openAuctions = jsonData.result.auctionList;

        if(jsonData.result.code === 200){
  
          setAuctions(openAuctions);

          $('#touchSlider0').touchSlider({
            speed: 300,
            gap: 50,
            useMouse: false
          });
      
          const mainimgSrc = $(".sectionCont.top>.swiper>ul>li:first-child>.nftCont>.ContFrame>.frame>img").attr("src");
          $(".sectionCont.top>.slidermainBG>.frame>img").attr("src",mainimgSrc);
          
          const $prevBtn = $(".sectionCont.top>.ts-controls>.ts-prev");
          const $nextBtn = $(".sectionCont.top>.ts-controls>.ts-next");
    
          
          $prevBtn.text('');
          $nextBtn.text('');
          
    
          $prevBtn.append("<img src='"+leftArrow+"' alt=''/>");
          $nextBtn.append("<img src='"+rightArrow+"' alt=''/>");
    
          $nextBtn.on("click",function(){
            $(".sectionCont.top>.swiper>ul>li").each(function(index, item){
              var $chkSlide = $(item).attr("aria-hidden");
              if ($chkSlide == 'false') {
                var nowImg = $(item).children().find("img").attr("src");
                $(".sectionCont.top>.slidermainBG>.frame>img").attr("src",nowImg);
              }
            });
          });
    
          $prevBtn.on("click",function(){
            $(".sectionCont.top>.swiper>ul>li").each(function(index, item){
              var $chkSlide = $(item).attr("aria-hidden");
              if ($chkSlide == 'false') {
                var nowImg = $(item).children().find("img").attr("src");
                $(".sectionCont.top>.slidermainBG>.frame>img").attr("src",nowImg);
              }
            });
          });

  
        }else{
          alert('조회실패!');
        }
  
      })
      .catch(function (error) {
        console.log(error);
      });
    
  };

  


  const goDetailItem  = () =>{
    $(".sectionCont.top>.swiper>ul>li").each(function(index, item){
      var $chkSlide = $(item).attr("aria-hidden");
      if ($chkSlide == 'false') {
        history.push('/itemdetails/'+$(item).attr("id")+'/Y');
      }
    });
    
  }

  React.useEffect(() => {

    getAuctions().catch((e) => {
      console.log(e.message);
    });
    
  }, []);

  return (

    <div className="sectionCont top">
        <div className="slidermainBG">
          <span className="frame"><img src='' alt=""/></span>
          <span className="frameBG"></span>
        </div>
        <div className="toptxtArea">
          <span>CREATE, EXPLORE AND COLLECT DIAMOND & ART NFTS</span>
          <p>Find Your Treasure in the NFT Universe</p>
          <a href="#" onClick={()=>goDetailItem()}><p>GET STARTED</p></a>
        </div>
        <div id="touchSlider0" className="swiper">
          <ul>
          {auctions.map((item, i) => (
            <SwipeHotAuctionItem key={i} {...item} />
          ))}
          </ul>
        </div>
    </div>

  );
};

export default MainHeader;
