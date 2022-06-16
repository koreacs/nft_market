import { NavLink, useParams } from 'react-router-dom';
import data from '../../../../data/data-components/data-SecNewListed.js';
import { useRecoilValue } from 'recoil';
import BigNumber from 'bignumber.js';
import contracts from '../../../../constants/contracts';
import { useWeb3React } from '@web3-react/core';
import { IAuction } from '../../../../types/index';
import addresses from '../../../../constants/addresses';

function SectionInfo(auction: IAuction) {
  const { account } = useWeb3React();

  const onBuyNow = async () => {
    const buyNowPrice = new BigNumber(parseInt(auction.buyNowPrice))
      .div(new BigNumber(10).pow(18))
      .toNumber();

    try {
      await contracts.nftMarketContract.methods
        .placeBid(
          auction.auctionId,
          new BigNumber(buyNowPrice).times(new BigNumber(10).pow(18)).toString()
        )
        .send({
          from: account,
          gas: 300000,
          value: new BigNumber(buyNowPrice * 0.025 + buyNowPrice)
            .times(new BigNumber(10).pow(18))
            .toString(),
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="col-lg-12">
      <div className="d-flex flex-column h-100">
        <p className="mb-1">#{auction.tokenId}</p>
        <h4 className="font-weight-bolder">{auction.tokenInfo?.title}</h4>
        <p>{auction.tokenInfo?.description}</p>
        <p className="text-bold mb-0">
          Currenct Price :{' '}
          <span className="gradient-text text-lg">
            {new BigNumber(auction.currentPrice)
              .div(new BigNumber(10).pow(18))
              .toString()}{' '}
            TVP
          </span>
        </p>
        <p className="text-bold mb-30">
          Buy now Price :{' '}
          <span className="gradient-text text-lg">
            {new BigNumber(auction.buyNowPrice)
              .div(new BigNumber(10).pow(18))
              .toString()}{' '}
            TVP
          </span>
        </p>
        <p>
          <strong className="text-dark mr-10">Item Artist: </strong>
          {auction?.tokenInfo?.owner}
        </p>

        <div className="row">
          {/*<div className="col-md-6">
            <ul className="list-group">
              <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                <strong className="text-dark mr-10">Item Artist: </strong>
                {auction?.tokenInfo?.owner}
              </li>
              <li className="list-group-item border-0 ps-0 text-sm">
                <strong className="text-dark mr-10">
                  <a
                    href={`https://opensea.io/assets/${addresses.nft}/${auction.tokenInfo?.id}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <svg
                      viewBox="0 0 26 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.396 9.535a.814.814 0 000 .93c.749 1.06 2.03 2.657 3.71 3.98C8.791 15.77 10.788 16.75 13 16.75c2.211 0 4.208-.98 5.893-2.306 1.681-1.322 2.962-2.92 3.71-3.98a.814.814 0 000-.929c-.748-1.06-2.029-2.657-3.71-3.98C17.208 4.23 15.211 3.25 13 3.25c-2.212 0-4.209.98-5.894 2.306-1.68 1.322-2.961 2.92-3.71 3.98zM5.56 3.591C7.5 2.065 10.03.75 13 .75c2.97 0 5.499 1.315 7.439 2.84 1.943 1.53 3.384 3.339 4.209 4.506l.003.005a3.315 3.315 0 010 3.798l-.003.005c-.825 1.167-2.266 2.977-4.209 4.505-1.94 1.526-4.47 2.841-7.44 2.841-2.969 0-5.499-1.315-7.439-2.84-1.942-1.53-3.384-3.339-4.208-4.506l-.004-.005a3.314 3.314 0 010-3.798l.004-.005C2.176 6.929 3.618 5.119 5.56 3.59z"
                        fill="currentColor"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13 7.25a2.75 2.75 0 100 5.5 2.75 2.75 0 000-5.5zM7.75 10a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span style={{ marginLeft: 10 }}>View on OpenSea</span>
                  </a>
                </strong>
              </li>
              <li className="list-group-item border-0 ps-0 text-sm">
                <strong className="text-dark">Item Size:</strong>{' '}
                {item.itemSize || ''}
              </li>
            </ul>
          </div>*/}

          <div className="col-md-6">
            <ul className="list-group">
              <li className="list-group-item border-0 d-flex align-items-center px-0">
                {/* <NavLink to="/profile" className="avatar v2 me-3">
	                <span className="author-num">1</span>
	                <img src={img} alt="kal" className="border-radius-lg shadow" />
	              </NavLink> */}
                {/* <div className="d-flex align-items-start flex-column justify-content-center">
                  <NavLink to="/">
                    <h6 className="author-name">{item.artist}</h6>
                  </NavLink>
                  <NavLink className="btn btn-link autho-link" to="/">
                    {item.artistId}
                  </NavLink>
                </div> */}
              </li>
              {account && auction?.tokenInfo?.owner !== account && (
                <li className="list-group-item border-0 d-flex align-items-center px-0">
                  <button
                    type="button"
                    className="btn bg-gradient-primary fs-6 fw-bold w-100 mb-0"
                    onClick={onBuyNow}
                  >
                    Buy now
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionInfo;
