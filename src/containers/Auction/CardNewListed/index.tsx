import Card from './Card';
import SectionHeading from '../../../components/SectionHeading';
import { Explore2Icon2 } from '../../../utils/allImgs';
import { IAuction } from '../../../types';

const CardNewListed = ({ auctions }: { auctions: IAuction[] }) => {
  return (

  <div className="listArea">
    <ul>
      {auctions.map((item, i) => (
        <Card key={i} {...item} />
      ))}  
      
    </ul>
  </div>

  );
};

export default CardNewListed;
