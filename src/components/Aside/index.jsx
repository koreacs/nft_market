import SidenavHeader from './SidenavHeader';
import NavbarCollapse from './NavbarCollapse';
import SidenavFooter from './SidenavFooter';

import { LogoPandoNft } from '../../utils/allImgs';
import { hideShowSidebar } from '../../utils';
import { Switch, Route } from 'react-router-dom';

import {
  Contact,
  Explore,
  MyCollection,
  Authors,
  CreateItem,
  Home,
  SignIn,
  ConnectWallet,
  Auction,
  ItemDetails,
  SignUp,
  Games,
  Guide,
  TvsSwap,
  TvpSwap
} from '../../pages';

import '../../assets/css/common.css';
import '../../assets/css/reset.css';
import '../../assets/css/swiper-bundle.css';
import '../../assets/css/style.css';


const AsideContainer = () => {
  return (
    <>
      <aside
        className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-left ms-3"
        id="sidenav-main"
      >
        <SidenavHeader
          AsidelogoCt={LogoPandoNft}
          hideShowSidebar={hideShowSidebar}
        />
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/contact" component={Contact} />
        <Route path="/tvsSwap" component={TvsSwap} />
        <Route path="/tvpSwap/:tvpFlag" component={MyCollection} />
        <Route path="/guide" component={Guide} />
        <Route path="/mycollection/:regFlag" component={MyCollection} />
        <Route path="/mycollection" component={MyCollection} />
        <Route path="/authors" component={Authors} />
        <Route path="/createitem" component={CreateItem} />
        <Route path="/connectwallet" component={ConnectWallet} />
        <Route path="/auction" component={Auction} />
        <Route path="/itemdetails/:id/:regFlag" component={ItemDetails} />
        <Route path="/itemdetails" component={ItemDetails} />
      </Switch>
        <SidenavFooter />
      </aside>
    </>
  );
};

export default AsideContainer;