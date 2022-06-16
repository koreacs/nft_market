import { NavLink } from "react-router-dom";
import ITag from '../../ITag'
import './SidenavFooter.css'


import discord from '../../../assets/img/discord-brands.svg';
import instagram from '../../../assets/img/instagram-brands.svg';
import internet from '../../../assets/img/internet-explorer-brands.svg';
import telegram from '../../../assets/img/telegram-plane-brands.svg';
import twitter from '../../../assets/img/twitter-brands.svg';
import xangle from '../../../assets/img/Xangle.svg';
import middot from '../../../assets/img/middot.png';


import { useRecoilState } from 'recoil';
import auctionCategoryAtom from '../../../atoms/auctionCategory';
import { useHistory } from 'react-router-dom';
import isCategoryFinishAtom from '../../../atoms/isCategoryFinish';



function SidenavFooter() {

  const [auctionCategory, setAuctionCategory] = useRecoilState(auctionCategoryAtom);
  const history = useHistory();
  const [categoryFinish, setCategoryFinish] = useRecoilState(isCategoryFinishAtom);

  const goAuction = async (category) => {
		await setAuctionCategory(Number(category));
    setCategoryFinish(categoryFinish+1);
		history.push("/auction");
	};
  

  return (
        <div className="sidenav-footer mx-3 mt-3 pt-3">
          <footer>
            <div className="footerConts">
              <div className="footerCont">
                <div className="footerCont1">
                  <div className="footTit">
                    <p>MNB NFT</p>
                    <span>Explore and monetize from a wide collection of</span>
                    <span>extraordinary NFTs</span>
                  </div>
                  <div className="footSubTit">
                    <p>Join the community</p>
                    <div className="iconArea">
                      <span style={{ cursor: 'pointer' }} className="frame" onClick={()=>window.open('http://tvsglobal.io')}><img src={internet} alt=""/></span>
                      <span style={{ cursor: 'pointer' }} className="frame" onClick={()=>window.open('https://discord.gg/BfHVpP5KZA')}><img src={discord} alt=""/></span>
                      <span style={{ cursor: 'pointer' }} className="frame" onClick={()=>window.open('https://xangle.io/project/TVS/profile')}><img src={xangle} alt=""/></span>
                      <span style={{ cursor: 'pointer' }} className="frame" onClick={()=>window.open('https://www.instagram.com/tvsglobal_platform')}><img src={instagram} alt=""/></span>
                      <span style={{ cursor: 'pointer' }} className="frame" onClick={()=>window.open('https://twitter.com/TVS_platform')}><img src={twitter} alt=""/></span>
                      <span style={{ cursor: 'pointer' }} className="frame" onClick={()=>window.open('https://t.me/tvstalk')}><img src={telegram} alt=""/></span>
                    </div>
                  </div>
                </div>
                <div className="footerCont2">
                  <div className="listCont">
                    <p>Explore</p>
                    <ul>
                      <li style={{ cursor: 'pointer' }} onClick={() => {goAuction(0);window.scrollTo(0, 0);}}>All</li>
                      <li style={{ cursor: 'pointer' }} onClick={() => {goAuction(1);window.scrollTo(0, 0);}}>Diamond</li>
                      <li style={{ cursor: 'pointer' }} onClick={() => {goAuction(2);window.scrollTo(0, 0);}}>Artwork</li>
                      <li style={{ cursor: 'pointer' }} onClick={() => {goAuction(3);window.scrollTo(0, 0);}}>Digital Art</li>
                    </ul>
                  </div>
                  <div className="listCont">
                    <p>Guides</p>
                    <ul>
                      <li style={{ cursor: 'pointer' }} onClick={()=>window.open("https://drive.google.com/file/d/1vbF4SuPxgk6CiTwMWiezyU4BMw6CRhK4/view?usp=sharing")} >English</li>
                      <li style={{ cursor: 'pointer' }} onClick={()=>window.open("https://drive.google.com/file/d/14JretVHxoWX7TXLUZcTjaEoZz9W0PNIe/view?usp=sharing")}>Korean</li>
                    </ul>
                  </div>
                  <div className="listCont">
                    <p style={{ cursor: 'pointer' }} onClick={()=>{history.push('/contact');window.scrollTo(0, 0);}}>Contact Us</p>
                  </div>
                </div>
              </div>
              <p>© TVS Global LLC. All right reserved.<span>Privacy Policy <em><img src={middot} alt=""/></em> Terms of Service</span></p>
            </div>
          </footer>
        </div>
        )
}

export default SidenavFooter
