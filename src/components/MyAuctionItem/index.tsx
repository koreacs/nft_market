import * as React from 'react';
import { NavLink , useHistory} from 'react-router-dom';
import contracts from '../../constants/contracts';
import { useWeb3React } from '@web3-react/core';
import { IAuction } from '../../types';
import isAuctionFinishAtom from '../../atoms/isAuctionFinish';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import BigNumber from 'bignumber.js';
import likeOn from '../../assets/img/likeOn.png';
import likeOff from '../../assets/img/likeOff.png';
import walletAccountAtom from '../../atoms/walletAccount';
import myPointAtom from '../../atoms/myPoint';
import addresses from '../../constants/addresses';
import axios from 'axios'; // 액시오스
import $ from 'jquery';

interface IMyAuctionItemProps extends IAuction {}

const MyAuctionItem: React.FunctionComponent<IMyAuctionItemProps> = (props) => {

  const history = useHistory();
  const walletAccount = useRecoilValue(walletAccountAtom);

  const clickFavorite = async (auctionId) => {

    try {
        
      
          var data = JSON.stringify({
            "auctionId": auctionId,
            "address" : walletAccount
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
                //$(".heart").addClass('on');
                $('.likeArea>em>img').attr('src',likeOn);
              }else if(jsonData.result.favoriteYn === 'N'){
                //$(".heart").addClass('off');
                $('.likeArea>em>img').attr('src',likeOff);
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

    <li>
      <div className="nftCont">
        <div className="ContFrame">
        <span className="frame" style={{ cursor: 'pointer' }} onClick={() => {history.push(`/itemdetails/${props.auctionId}/Y`);window.scrollTo(0, 0);}}>
          <img src={props.mnb_nft_master?.img} alt=""/>
        </span>
        <div className="textArea">
          <p className="nftName">{props.mnb_nft_master?.auctionTitle}
          <span className="likeArea on" onClick={() => clickFavorite(props.auctionId)}>
            <em className="frame" ><img style={{ cursor: 'pointer' }} src={likeOn} alt=""/></em>
            {/* <em className="num">+52</em> */}
          </span>
          </p>
          <p><span>Buy now</span><span>Current Price</span></p>
          <p><span><em>{new BigNumber(props.buyNowPrice)
								.div(new BigNumber(10).pow(18))
								.toString()}{' '}</em>TVP</span><span><em>{new BigNumber(props.currentPrice)
                  .div(new BigNumber(10).pow(18))
                  .toString()}{' '}</em>TVP</span></p>
        </div>
        </div>
      </div>
    </li>
  );
};

export default MyAuctionItem;
