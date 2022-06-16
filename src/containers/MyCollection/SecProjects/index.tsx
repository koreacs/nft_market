'use strict';
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import ITag from '../../../components/ITag';
import MyItem from '../../../components/MyItem';
import contracts from '../../../constants/contracts';
import { useWeb3React } from '@web3-react/core';
import { useRecoilState } from 'recoil';
import myItemsAtom from '../../../atoms/myItems';
import myAuctionsAtom from '../../../atoms/myAuctions';
import MyAuctionItem from '../../../components/MyAuctionItem';
import { IAuction } from '../../../types';
import addresses from '../../../constants/addresses';
import { getTokenInfo } from '../../../utils';
import { useMoralisWeb3Api } from 'react-moralis';
import { useInterval } from 'usehooks-ts';
import isAuctionFinishAtom from '../../../atoms/isAuctionFinish';

function SecProjects() {
  const { account: mAccount } = useMoralisWeb3Api();
  const history = useHistory();
  const { account } = useWeb3React();
  const [ids, setIds] = React.useState<number[]>([]);
  const [balance, setBalance] = React.useState<number>(0);
  const [myAuctions, setMyAuctions] = useRecoilState(myAuctionsAtom);
  const [myItems, setMyItems] = useRecoilState(myItemsAtom);


  const [isAuctionFinish, setIsAuctionFinish] =
    useRecoilState(isAuctionFinishAtom);

  const getAuctions = async () => {
    console.log(account);
    console.log("contracts ------------", contracts)
    console.log("contracts.nftMarketContract -------------", contracts.nftMarketContract)
    console.log("contracts.nftMarketContract -------------", contracts.nftMarketContract._address)
    console.log("contracts.nftMarketContract.methods.getUserAuctions(account) ---------- ", contracts.nftMarketContract.methods.getUserAuctions(account) )
    console.log("contracts.nftMarketContract.methods.getUserAuctions(account) ---------- ", contracts.nftMarketContract.methods.getUserAuctions(account).call() )
    try {

      const userAuctions = await contracts.nftMarketContract.methods.getUserAuctions(account).call();
      console.log(userAuctions);

      const isApproved = await contracts.nftContract.methods
        .isApprovedForAll(account, addresses.nftMarket)
        .call();

      console.log("isApproved[[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]", isApproved)
      console.log('userAuctions', userAuctions);

      const promises = userAuctions.map(async (auction: IAuction) => {
        console.log('status', auction.auctionTypes.status);
        if (
          auction.auctionTypes.status === '1' ||
          auction.auctionTypes.status === '2'
        ) {
          const tokenInfo = await getTokenInfo(parseInt(auction['tokenId']));

          return {
            ...auction,
            tokenInfo,
          };
        } else {
          return null;
        }
      });

      const data = await Promise.all(promises);

      setMyAuctions(data.filter((el) => el != null));
    } catch (e) {
      console.log(e);
    }
  };

  const getTotalSupply = async () => {
    let datas: any[] = [];
    // chain: '0x4',
    const tokens = await mAccount.getNFTsForContract({
      // chain: '0x37',
      chain: 'rinkeby',
      address: account,
      token_address: addresses.nft
    });
    
    if (tokens.result) {
      tokens.result.map(async (token) => {
        const result = await contracts.nftContract.methods
          .ownerOf(token.token_id)
          .call();

        if (result === account) {
          const tokenInfo = await getTokenInfo(parseInt(token.token_id));

          datas = [{ ...tokenInfo }, ...datas];
          setMyItems(datas);
        }
      });
    }

    // const counts = await contracts.nftContract.methods
    //       .balanceOf(account)
    //       .call();
    // console.log("contracts: " + contracts.nftContract);
    // console.log("balanceOf: " + counts);

    // if (counts > 0) {
      
    //   for(let i = 1, tokenid = 0; i <= counts; i++) {
        
    //     let owner = await contracts.nftContract.methods
    //       .ownerOf(i)
    //       .call();

    //     if (owner === account) {
    //       tokenid = i;
    //       const tokenInfo = await getTokenInfo(tokenid);

    //       datas = [{ ...tokenInfo }, ...datas];
    //       setMyItems(datas);
    //     }
    //   }
    // }
  };

  useInterval(
    () => {
      if (account) {
        getTotalSupply();
        getAuctions();
        setIsAuctionFinish(false);
      }
    },
    isAuctionFinish ? 1000 : null
  );

  React.useEffect(() => {
    if (account) {
      getTotalSupply();
      getAuctions();
    } else {
      setMyItems([]);
      history.replace('/');
    }
  }, [account]);

  return (
    <div className="col-12 mt-4">
      <div className="card mb-4">
        <div className="card-header pb-0 p-3" id="projects">
          <h6 className="mb-1">My auctions</h6>
          {/* <p className="text-sm">My NFTs</p> */}
        </div>
        <div className="container-fluid">
          <div className="col-12 py-4">
            <div className="card">
              <div className="card-body p-3">
                <div className="row">
                  {myAuctions.map((item, i) => (
                    <MyAuctionItem key={i} {...item} />
                  ))}

                  {/* <div className="col-md-12 text-center">
                    <NavLink className="btn bg-gradient-dark mb-0" to="/">
                      <ITag ClassName="fas fa-plus mr-10" />
                      Load More
                    </NavLink>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header pb-0 p-3" id="projects">
          <h6 className="mb-1">My NFTs</h6>
          {/* <p className="text-sm">My NFTs</p> */}
        </div>
        <div className="container-fluid">
          <div className="col-12 py-4">
            <div className="card">
              <div className="card-body p-3">
                <div className="row">
                  {myItems.map((item, i) => (
                    <MyItem key={i} {...item} />
                  ))}

                  {/* <div className="col-md-12 text-center">
                    <NavLink className="btn bg-gradient-dark mb-0" to="/">
                      <ITag ClassName="fas fa-plus mr-10" />
                      Load More
                    </NavLink>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecProjects;
