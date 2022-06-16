import { NavLink } from 'react-router-dom';

import NewListedItem from './NewListedItem';
import ITag from '../ITag';
import data from '../../data/data-components/data-SecNewListed.js';
import { useRecoilValue } from 'recoil';
import itemsAtom from '../../atoms/items';

function SecNewListed() {
  const items = useRecoilValue(itemsAtom);

  return (
    <div className="container-fluid">
      <div className="col-12 py-4">
        <div className="card">
          <div className="card-body p-3">
            <div className="row">
              {items.map((item, i) => (
                <NewListedItem key={i} {...item} />
              ))}

              <div className="col-md-12 text-center">
                <NavLink className="btn bg-gradient-dark mb-0" to="/">
                  <ITag ClassName="fas fa-plus mr-10" />
                  Load More
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecNewListed;
