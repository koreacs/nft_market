import HotAuctionsItem from './HotAuctionsItem';
import React from 'react';
import { IAuction } from '../../types/index';
import hotimg from '../../assets/img/hotimg.png'
import $ from 'jquery';
import axios from 'axios';
import addresses from '../../constants/addresses';

function SecLiveAuctions() {
  const [auctions, setAuctions] = React.useState<IAuction[]>([]);
  const [offset, setOffset] = React.useState<number>(0);
  const [limit, setLimit] = React.useState<number>(10);

    const getAuctions = async (leadMore) => {

      var jsonLimit = limit;
    
      if(leadMore === ''){
        setOffset(0);
        setLimit(10);
        jsonLimit = 10;
      }else{
        jsonLimit = jsonLimit+10;
        setLimit(limit+10);
        
      }
      
        //json  형태  
      var data = JSON.stringify({
        "orderby" : 1,//HotBid
        "offset" : offset,
        "limit" : jsonLimit

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
        
        if(jsonData.result.code === 200){

          if(jsonData.result.nextPage !== 'Y'){
            $(".btnAreaHot").hide();
          }else{
            $(".btnAreaHot").show();
          }

          const openAuctions = jsonData.result.auctionList;

          setAuctions(openAuctions);


        }else{
          alert('조회실패!');
        }

      })
      .catch(function (error) {
        console.log(error);
      });
    };

  React.useEffect(() => {
    getAuctions('').catch((e) => {
      console.log(e.message);
    });
  }, []);

  return (
    

    <div className="sectionCont one">
      <span>Hot Bids<span className="hotframe"><img src={hotimg} alt=""/></span></span>
      <ul className="webnftList clearfix">
          {auctions.map((item, i) => (
            <HotAuctionsItem key={i} {...item} />
          ))}
      </ul>
      {auctions.length === 0  && (
        <>
          <li>
            <div className="nftCont" >
              <div className="ContFrame">
                <span className="frame">
                </span>
                <div className="textArea">
                </div>
              </div>
            </div>
          </li>
        </>
      )}
      {auctions &&  (
        <a href="#none" onClick={() => getAuctions('Y')} className="btnAreaHot" ><p>LOAD MORE</p></a>
      )}
      
    </div>


  );
}

export default SecLiveAuctions;
