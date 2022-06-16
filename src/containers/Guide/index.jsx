import { useEffect } from 'react';

import NavbarLast from '../../layouts/Head/NavbarLast';

import { handleTitle } from '../../utils';

import SecHeadSignup from './SecHeadSignup';
import SecSVG from './SecSVG';
import SecForm from './SecForm';

const GuideContainer = () => {
  useEffect(() => {
    handleTitle('Guide');
  }, []);

  return (
    <>
      <NavbarLast />
      <section className="h-100-vh mb-8">
        <SecHeadGuide />

        <div className="container">
          <div
            className="row mt-lg-n10 mt-md-n11 mt-n10"
            style={{ marginTop: '-10rem' }}
          >
            <div className="col-lg-5 col-md-7 mx-auto mb-30">
              <div className="card z-index-0">
                <div className="card-header gray-bg text-center pt-4">
                  <h5>Register with</h5>
                </div>

                <SecSVG />
                <SecForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GuideContainer;
