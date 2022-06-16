import { useEffect } from 'react';
import { getMainWidth, handleTitle } from '../../utils';
import MainHeader from './MainHeader';
import SecLiveAuctions from '../../components/SecLiveAuctions';
import SecHotBid from '../../components/SecHotBid';
import { useSetRecoilState } from 'recoil';
import itemsAtom from '../../atoms/items';
import contracts from '../../constants/contracts';
import React from 'react';

import '../../assets/css/common.css';
import '../../assets/css/reset.css';
import '../../assets/css/swiper-bundle.css';
import '../../assets/css/style.css';

import gamesimg from '../../assets/img/gamesimg.png';
import artimg from '../../assets/img/artimg.png';
import photoimg from '../../assets/img/photoimg.png';
import collimg from '../../assets/img/collimg.png';
import musicimg from '../../assets/img/musicimg.png';
import sporimg from '../../assets/img/sporimg.png';
import enterimg from '../../assets/img/enterimg.png';
import traimg from '../../assets/img/traimg.png';

import connectimg from '../../assets/img/connectimg.png';
import createimg1 from '../../assets/img/createimg1.png';
import createimg2 from '../../assets/img/createimg2.png';
import createimg3 from '../../assets/img/createimg3.png';

import $ from 'jquery';
import { useRecoilState } from 'recoil';
import auctionCategoryAtom from '../../atoms/auctionCategory';
import { useHistory } from 'react-router-dom';

const HomeContainer = () => {
  
  const [auctionCategory, setAuctionCategory] = useRecoilState(auctionCategoryAtom);
  const history = useHistory();
  const [offset, setOffset] = React.useState<number>(0);
  const [limit, setLimit] = React.useState<number>(10);

  

  const setItems = useSetRecoilState(itemsAtom);

  const getItems = async () => {
    let datas: any = [];
    let i = 0;

    while (true) {
      i++;
      try {
        const hash = await contracts.nftContract.methods.tokenURI(i).call();
        const response = await fetch(
          `https://ipfs.infura.io/ipfs/${hash}?clear`
        );

        const metadata = await response.json();
        const isApproved = await contracts.nftContract.methods
          .getApproved(i)
          .call();
        const owner = await contracts.nftContract.methods.ownerOf(i).call();

        datas = [
          {
            id: i,
            title: metadata.properties.name.description,
            description: metadata.properties.description.description,
            category: metadata.properties.category.description || 1,
            img: `https://ipfs.infura.io/ipfs/${metadata.properties.image.description}`,
            isApproved,
            owner,
          },
          ...datas,
        ];
        setItems(datas);
      } catch (_) {
        break;
      }
    }

    console.log('datas', datas);
    // setItems(datas);
  };

  function gamenftPop(){
    $(".comingsoonPop").show();
  }


  const goAuction = async (category) => {
    
		await setAuctionCategory(Number(category));
    
    setOffset(0);
    setLimit(8);
		history.push("/auction");
		
	};

  useEffect(() => {
    // document.title = 'Dashboard'
    // handleTitle('Dashboard');
    handleTitle('MNB-NFT');
    getMainWidth();
  }, []);

  //React.useEffect(() => {
     //getItems();
  //}, []);

  

  return (

    
    <div className="mainPage">
      <MainHeader />
      
      <SecLiveAuctions />
      <SecHotBid />

      <div className="sectionCont thr">
        <span>Explore Categories</span>
        <ul className="webexploreList clearfix">
          <li style={{ cursor: 'pointer' }} onClick={()=> {goAuction(0);window.scrollTo(0, 0);}}>
            <div className="exploreCont">
              <span className="frame"><img src={photoimg} alt=""/></span>
              <p>All</p>
            </div>
          </li>
          <li style={{ cursor: 'pointer' }} onClick={()=> {goAuction(1);window.scrollTo(0, 0);}}>
            <div className="exploreCont">
              <span className="frame"><img src={collimg} alt=""/></span>
              <p>Diamond</p>
            </div>
          </li>
          <li style={{ cursor: 'pointer' }} onClick={()=> {goAuction(2);window.scrollTo(0, 0);}}>
            <div className="exploreCont">
              <span className="frame"><img src={artimg} alt=""/></span>
              <p>Artwork</p>
            </div>
          </li>
          <li style={{ cursor: 'pointer' }} onClick={()=> {goAuction(3);window.scrollTo(0, 0);}}>
            <div className="exploreCont">
              <span className="frame"><img src={musicimg} alt=""/></span>
              <p>Digital Art</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="sectionCont one">
        <span>Create and Sell NFTs</span>
        <ul className="createList clearfix">
          <li>
            <div className="createCont">
              <div className="contframe">
                <span className="frame"><img src={connectimg} alt=""/></span>
                <p>Connect Wallet</p>
                <span>Start by connecting your</span>
                <span>Metamask wallet</span>
              </div>
            </div>
          </li>
          <li>
            <div className="createCont">
              <div className="contframe">
                <span className="frame"><img src={createimg1} alt=""/></span>
                <p>Create NFT</p>
                <span>Use videos, images, audio,</span>
                <span>or GIFs to create your NFT</span>
              </div>
            </div>
          </li>
          <li>
            <div className="createCont">
              <div className="contframe">
                <span className="frame"><img src={createimg2} alt=""/></span>
                <p>List Auction Item</p>
                <span>Set your price and</span>
                <span>list your NFT for auction</span>
              </div>
            </div>
          </li>
          <li>
            <div className="createCont">
              <div className="contframe">
                <span className="frame"><img src={createimg3} alt=""/></span>
                <p>Get Your NFT!</p>
                <span>Buy or bid for your favorite</span>
                <span>NFT with simple steps</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    

  );
};

export default HomeContainer;
