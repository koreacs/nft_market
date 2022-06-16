import * as React from 'react';
import contracts from '../../constants/contracts';
import addresses from '../../constants/addresses';
import { useWeb3React } from '@web3-react/core';
import Input from '../../containers/CreateItem/CardForm/Input';
import BigNumber from 'bignumber.js';
import { useRecoilState, useSetRecoilState } from 'recoil';
import isApprovedAtom from '../../atoms/isApproved';
import isAuctionFinishAtom from '../../atoms/isAuctionFinish';
import moment from 'moment';
import { IItem } from '../../types/index';
import { useHistory } from 'react-router-dom';
import web3 from "../../connection/web3";
import likeOn from '../../assets/img/likeOn.png';
import likeOff from '../../assets/img/likeOff.png';

interface IMyItemProps extends IItem {}

const MyItem: React.FunctionComponent<IMyItemProps> = (props) => {
  const history = useHistory();
  
  const { account } = useWeb3React();
  const [isApproved, setIsApproved] = useRecoilState(isApprovedAtom);
  const [isCreateOpen, setIsCreateOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>('');
  const [startingPrice, setStartingPrice] = React.useState<number>();
  const [buyNowPrice, setBuyNowPrice] = React.useState<number>();
  const [expiryDate, setExpiryDate] = React.useState<string>('');

  const setIsAuctionFinish = useSetRecoilState(isAuctionFinishAtom);

  

  const onClickCreateAuction = async () => {
    if (!isCreateOpen) {
      setIsCreateOpen(true);
      return;
    }

    if (!title) {
      alert('Title is required!');
      return;
    }
    if (!startingPrice) {
      alert('Starting price is required!');
      return;
    }
    if (!buyNowPrice) {
      alert('Buy now price is required!');
      return;
    }
    if (startingPrice >= buyNowPrice) {
      alert('Please enter an amount higher than the starting price');
      return;
    }
    if (startingPrice < 0.001) {
      alert('Please enter an amount higher than 0.001');
      return;
    }
    if (!expiryDate) {
      alert('Expiry date is required!');
      return;
    }

    const createAuction = await contracts.nftMarketContract.methods
      .createAuction(
        addresses.nft,
        props.id,
        new BigNumber(startingPrice)
          .times(new BigNumber(10).pow(18))
          .toNumber()
          .toFixed(0),
        title,
        new BigNumber(buyNowPrice)
          .times(new BigNumber(10).pow(18))
          .toNumber()
          .toFixed(0),
        timestamp,
        props.category,
        1,
        1
      )
      .send({
        from: account,
        gas: 800000,
        value: web3.utils.toWei('0.001',	'ether')
      });

    setIsCreateOpen(false);
    setTitle('');
    setStartingPrice(undefined);
    setBuyNowPrice(undefined);
    setExpiryDate('');
    setIsAuctionFinish(true);

    console.log(createAuction);
  };

  const getIsApproved = async () => {
    const isApproved = await contracts.nftContract.methods
      .isApprovedForAll(account, addresses.nftMarket)
      .call();
    setIsApproved(isApproved);
  };

  React.useEffect(() => {
    getIsApproved();
  }, [account]);

  return (

    <li style={{ cursor: 'pointer' }}>
      <div className="nftCont" onClick={() => {history.push(`/itemdetails/${props.id}/N`);window.scrollTo(0, 0);}}>
        <div className="ContFrame">
          <span className="frame">
            <img src={props.img} alt=""/>
          </span>
          <div className="textArea">
            <p className="nftName">{props.title}
            <span className="likeArea on">
              <em className="frame"></em>
            </span>
            </p>
          </div>
        </div>
      </div>
    </li>
    
  );
};

export default MyItem;
