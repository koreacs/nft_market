import { useEffect } from 'react';
import { getMainWidth, handleTitle } from '../../utils';

import Breadcrumb from '../../components/Breadcrumb';
import Navbar from '../../layouts/Head/Navbar';

import IconEnpng from '../../assets/img/EN_icon.svg';
import IconKopng from '../../assets/img/KO_icon.svg';
//import '../../assets/css/style.css';
import '../../assets/css/style.css';
import '../../assets/css/common.css';
import '../../assets/css/reset.css';
import '../../assets/css/swiper-bundle.css';

const GuideContainer = () => {

  useEffect(() => {
    // handleTitle('User Guide');
    handleTitle('MNB-NFT');
    getMainWidth();
  }, []);

  return (
    <main className="main-content mt-1 border-radius-lg">
      <Navbar />

      <div className="container-fluid">
        <div className="page-header breadcrumb-header min-height-300 border-radius-xl mt-4 mb-30 ExploreIMG">
          <Breadcrumb text1="User Guide" text2="" />
        </div>
      </div>

      <div className="container-fluid">
        <div className="col-12">
          <div id="mainsubMnu">
            <a
              className="btn koGuide"
              href="https://drive.google.com/file/d/14JretVHxoWX7TXLUZcTjaEoZz9W0PNIe/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              <span className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center mr-2">
                <img src={IconKopng} width="20" height="20" alt="ko" />
              </span>
              <span className="nav-link-text ms-4 fw-normal subTit">Korean</span>
            </a>
            <a
              className="btn enGuide"
              href="https://drive.google.com/file/d/1vbF4SuPxgk6CiTwMWiezyU4BMw6CRhK4/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              <span className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center mr-2">
                <img src={IconEnpng} width="20" height="20" alt="en" />
              </span>
              <span className="nav-link-text ms-4 fw-normal subTit">English</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GuideContainer;
