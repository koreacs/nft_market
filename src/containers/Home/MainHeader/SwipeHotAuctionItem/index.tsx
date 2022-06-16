import { NavLink, useHistory } from 'react-router-dom';
import { IAuction } from '../../../../types/index';
import { SecLiveAuctionsIconfire } from '../../../../utils/allImgs';
import TimeAgo from 'react-timeago';
import { useSetRecoilState } from 'recoil';
import selectedAuctionAtom from '../../../../atoms/selectedAuction';
import BigNumber from 'bignumber.js';

function SwipeHotAuctionItem(props: IAuction) {
  const setSelectedAuction = useSetRecoilState(selectedAuctionAtom);
  const history = useHistory();

  return (

    <li id={props.auctionId}>
      <div className="nftCont">
        <div className="ContFrame">
          <span className="frame">
            <img src={props.img} alt=""/>
          </span>
          <div className="Area clearfix">
            <p className="omit">{props.title}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default SwipeHotAuctionItem;
