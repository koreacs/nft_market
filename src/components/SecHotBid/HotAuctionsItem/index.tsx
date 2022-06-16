import { useHistory } from 'react-router-dom';
import { IAuction } from '../../../types/index';
import BigNumber from 'bignumber.js';
import likeOn from '../../../assets/img/likeOn.png';
import likeOff from '../../../assets/img/likeOff.png';
import { useRecoilValue } from 'recoil';
import walletAccountAtom from '../../../atoms/walletAccount';
import myPointAtom from '../../../atoms/myPoint';
import addresses from '../../../constants/addresses';
import axios from 'axios'; // 액시오스
import $ from 'jquery';

function LiveAuctionsItem(props: IAuction) {
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

      <li style={{ cursor: 'pointer' }} >
        <div className="nftCont" onClick={async () => {history.push(`/itemdetails/${props.auctionId}/Y`);window.scrollTo(0, 0);}} >
          <div className="ContFrame">
            <span className="frame">
              <img src={props.img} alt=""/>
            </span>
            <div className="textArea">
              <p className="ntfName">{props.title}</p>
              <p>PRICE :{' '}
                <span>
                  <em>
                    {new BigNumber(parseInt(props.buyNowPrice))
                      .div(new BigNumber(10).pow(18))
                      .toString()}{' '}
                    TVP
                  </em>
                </span>
              </p>
              <p>HIGHEST :{' '}
                <span>
                  <em>
                    {new BigNumber(parseInt(props.currentPrice))
                      .div(new BigNumber(10).pow(18))
                      .toString()}{' '}
                    TVP
                  </em>
                </span>
              </p>
            </div>
          </div>
        </div>
      </li>

  );
}

export default LiveAuctionsItem;
