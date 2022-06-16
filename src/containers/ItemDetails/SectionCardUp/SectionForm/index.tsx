import { NavLink } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import contracts from '../../../../constants/contracts';
import React from 'react';
import BigNumber from 'bignumber.js';
import web3 from '../../../../connection/web3';
import isAuctionFinishAtom from '../../../../atoms/isAuctionFinish';
import { IAuction } from '../../../../types';

function SectionForm(auction: IAuction) {
  const { account } = useWeb3React();

  const [bidPrice, setBidPrice] = React.useState<number>(0);
  const setIsAuctionFinish = useSetRecoilState(isAuctionFinishAtom);

  const onPlaceBid = async () => {
    const currentPrice = new BigNumber(parseInt(auction.currentPrice))
      .div(new BigNumber(10).pow(18))
      .toNumber();
    if (currentPrice > bidPrice) {
      alert('It should be higher than the current bid amount');
      return;
    }

    try {
      await contracts.nftMarketContract.methods
        .placeBid(
          auction.auctionId,
          web3.utils.toWei(bidPrice.toString(), 'ether')
        )
        .send({
          from: account,
          gas: 300000,
          value: web3.utils.toWei(
            (bidPrice * 0.025 + bidPrice).toString(),
            'ether'
          ),
        });

      setBidPrice(0);
      setIsAuctionFinish(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="col-lg-6 mt-s">
      <div className="d-flex flex-column h-100">
        <h5 className="font-weight-bolder">Place a Bid</h5>
        <p>
          Make an offer they cannot refuse. Place a bid to get a hold of your
          favorite NFTs!
        </p>
        <form action="post">
          <label>Bid Amount</label>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              value={bidPrice}
              onChange={(e) => setBidPrice(parseFloat(e.target.value))}
              placeholder="Your Bid"
            />
          </div>

          <div className="text-center">
            {account ? (
              auction?.tokenInfo?.owner !== account ? (
                <button
                  type="button"
                  className="btn bg-gradient-primary fs-6 fw-bold w-100 mb-0"
                  onClick={onPlaceBid}
                >
                  Place Bid
                </button>
              ) : (
                <div></div>
              )
            ) : (
              <NavLink
                to="/connectwallet"
                className="btn bg-gradient-primary fs-6 fw-bold w-100 mb-0"
              >
                Connect wallet
              </NavLink>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default SectionForm;
