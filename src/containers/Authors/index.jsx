import { useEffect } from 'react';
import data from '../../data/data-containers/data-Authors.js';
import Breadcrumb from '../../components/Breadcrumb';
import SectionHeading from '../../components/SectionHeading';
import { AuthorsIcon2 } from '../../utils/allImgs';
import { getMainWidth, handleTitle } from '../../utils';
import Navbar from '../../layouts/Head/Navbar';
import CardBody from './CardBody';
import './AuthorsHeader.css';

const AuthorsContainer = () => {
  useEffect(() => {
    // document.title = 'Authors'
    handleTitle('Authors');
    getMainWidth();
  }, []);

  return (
    <>
      <main className="main-content mt-1 border-radius-lg">
        <Navbar />

        <div className="container-fluid">
          <div className="page-header AuthorsHeaderIMG breadcrumb-header min-height-300 border-radius-xl mt-4 mb-30">
            <Breadcrumb text1="Our Authors" text2="Our Authors" />
          </div>
        </div>

        <div className="container-fluid">
          <SectionHeading
            img={AuthorsIcon2}
            text="Our Artists"
            title="Our Artists"
          />
        </div>

        <div className="container-fluid">
          <div className="col-12 py-4">
            <div className="card">
              <CardBody data={data} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AuthorsContainer;
