import { IBid } from '../../../../../types';
import TimeAgo from 'react-timeago';
import BigNumber from 'bignumber.js';

function ListTag(props: IBid) {
  return (
    <li>
      <div className="txtBox">
        <p>
          <span>{props.price}
          </span> TVP <em>by</em> 
          <span>{' '}
              {props.bidder.substr(0, 7)}...
              {props.bidder.substr(props.bidder.length - 7)}
          </span>
        </p>
        <span className="time"><TimeAgo date={props.timestamp} /></span>
      </div>
    </li>
  );
}

export default ListTag;
