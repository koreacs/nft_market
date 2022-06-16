import { useParams } from 'react-router-dom';
import data from '../../../../data/data-components/data-SecNewListed.js';
import ListTag from './ListTag';
import { IAuction } from '../../../../types/index';

function SectionHistory(auction: IAuction) {
  const { id }: { id?: string } = useParams();
  const item = data[parseInt(id!) - 1];

  return (
    <div className="col-lg-6">
      <div className="card mb-30">
        <div className="card-body p-3">
          <h6 className="mb-0">History</h6>
          <ul className="dropdown-menu relative dropdown-menu-end show border-0">
            {item &&
              item.history.map((item, i) => (
                <ListTag key={i} mint={item.timeAgo} price={item.qty} />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SectionHistory;
