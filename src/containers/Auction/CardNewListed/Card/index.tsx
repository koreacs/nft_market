import { NavLink, useHistory} from 'react-router-dom';
import { IAuction } from '../../../../types/index';
import BigNumber from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import { injectedConnector } from '../../../../connector';
import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import addresses from '../../../../constants/addresses';
import likeOn from '../../../../assets/img/likeOn.png';
import likeOff from '../../../../assets/img/likeOff.png';


function Card(auction: IAuction) {
  const history = useHistory();
  const { chainId, account, activate, deactivate, active } = useWeb3React();

  const createItem = ()=>{

    if(window.localStorage.getItem('wallet') === 'metamask' && account){
      history.push(`/itemdetails/${auction.auctionId}/Y`)
    }else{
      activate(injectedConnector,(error)=>{
        if(error.toString().indexOf('No Ethereum provider was found on window.ethereum') > 0 ){
          window.open('https://metamask.io/download.html');
        }
      });

      window.localStorage.setItem('wallet', 'metamask');
    }
  }
  
  const mobmnuPop = ()=>{
    // $(".mobmnuPop").toggle();
  }

  const clickFavorite = async (auctionId) => {

    try {
      
          var data = JSON.stringify({
            "auctionId": auctionId,
            "address" : account
          });
        
  
          var config = {
            method: 'post', 
            url: addresses.targetIp+'/nft/chgFavorite',
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
              console.log(jsonData.result.favoriteYn)
              if(jsonData.result.favoriteYn === 'Y'){
                $('#'+auctionId).attr('src',likeOn);
                //$('.likeArea>em>img').attr('src',likeOn);
              }else if(jsonData.result.favoriteYn === 'N'){
                $('#'+auctionId).attr('src',likeOff);
                //$('.likeArea>em>img').attr('src',likeOff);
              }
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

  return (

    <li >
      {/* <div className="listCont" > */}
      <div className="listCont" >
        <span style={{ cursor: 'pointer' }} className="frame" onClick={async () => {createItem();mobmnuPop();}}><img src={auction.img} alt=""/></span>
        <div className="txtBox">
          <p>{auction.title}
            <span className="likeArea on" onClick={() => clickFavorite(auction.auctionId)}>
              <em className="frame" ><img id={auction.auctionId} style={{ cursor: 'pointer' }} src={auction.favoriteYn === 'Y'? likeOn:likeOff} alt=""/></em>
              {/* <em className="num">+52</em> */}
            </span>
          </p>
          <p>PRICE<span>
                      <em>
                        {new BigNumber(auction.buyNowPrice)
                      .div(new BigNumber(10).pow(18))
                      .toString()}{' '}
                      </em>TVP
                  </span>
          </p>
          <p>HIGHEST<span><em>{new BigNumber(auction.currentPrice)
                      .div(new BigNumber(10).pow(18))
                      .toString()}{' '}
                      </em>TVP
                  </span>
          </p>
        </div>
      </div>
    </li>

  );
}

export default Card;
