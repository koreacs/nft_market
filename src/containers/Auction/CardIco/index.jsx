import { NavLink } from 'react-router-dom';
import ITag from '../../../components/ITag';

const CardIco = ({ onClick }: { onClick: any }) => {
  return (
    <div className="col-12 py-4">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12 text-center">
              <button
                type="button"
                className="btn bg-gradient-dark mb-0"
                onClick={onClick}
              >
                <ITag ClassName="fas fa-plus mr-10" />
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardIco;
