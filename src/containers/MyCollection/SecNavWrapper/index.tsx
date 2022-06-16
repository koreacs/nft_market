import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { useInterval } from 'usehooks-ts';
import ITag from '../../../components/ITag';
import contracts from '../../../constants/contracts';
import BigNumber from 'bignumber.js';

function SecNavWrapper() {
  const { account } = useWeb3React();
  const [userPrice, setUserPrice] = React.useState<number>(0);

  const getUserPriceList = React.useCallback(async () => {
    if (account) {
      try {
        const result = await contracts.nftMarketContract.methods
          .userPriceList(account)
          .call();
        console.log("result ::::", result)
        setUserPrice(result);
      } catch (e) {
        console.log(e);
      }
    }
  }, [account]);

  const withdraw = React.useCallback(async () => {
    if (account) {
      try {
        await contracts.nftMarketContract.methods
          .withdrawCredit()
          .send({ from: account });

        alert('Withdraw credit success!');
      } catch (e) {
        console.log(e);
      }
    }
  }, [account]);

  useInterval(
    () => {
      getUserPriceList();
    },
    account ? 2000 : null
  );
  return (
    <>
          {/* <strong className="text-dark text-sm">Social:</strong> &nbsp;
          <a
            className="btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0"
            href="/"
          >
            <ITag ClassName="fab fa-facebook fa-lg" aria-hidden="true" />
          </a>
          <a
            className="btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0"
            href="/"
          >
            <ITag ClassName="fab fa-twitter fa-lg" aria-hidden="true" />
          </a>
          <a
            className="btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0"
            href="/"
          >
            <ITag ClassName="fab fa-instagram fa-lg" aria-hidden="true" />
          </a> */}
          {account && userPrice > 0 ? (
            <a href='#none'
              className="myPointBtn"
              onClick={withdraw}
            >
              Withdraw (
              {new BigNumber(userPrice)
                .div(new BigNumber(10).pow(18))
                .toString()}{' '}
              TVP)
            </a>
          ) : null}
      </>
  );
}

export default SecNavWrapper;
