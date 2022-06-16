import SectionHistory from './SectionHistory';
import SectionBids from './SectionBids';
import { IAuction } from '../../../types';

function SectionCardDown(auction: IAuction) {
  return (
    <>
      {/* <SectionHistory {...auction} /> */}
      <SectionBids {...auction} />
    </>
  );
}

export default SectionCardDown;
