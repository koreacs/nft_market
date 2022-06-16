import SectionInfo from './SectionInfo';
import SectionPrice from './SectionPrice';
import SectionForm from './SectionForm';
import { IAuction } from '../../../types';

function SectionCardUp(auction: IAuction) {
  return (
    <>
      <div className="col-12 mb-30 mt-s">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <SectionInfo {...auction} />
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 mb-30">
        <div className="card">
          <div className="card-body p-3">
            <div className="row align-items-center">
              <SectionPrice {...auction} />

              <SectionForm {...auction} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionCardUp;
