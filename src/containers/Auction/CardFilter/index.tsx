import Input1 from '../../../components/Input1';
import Input2 from '../../../components/Input2';
import SectionHeading from '../../../components/SectionHeading';

import { Explore2Icon3 } from '../../../utils/allImgs';
import { useRecoilState } from 'recoil';
import auctionCategoryAtom from '../../../atoms/auctionCategory';
import auctionSortAtom from '../../../atoms/auctionSort';

const sorts = ['ASC', 'DESC', 'NEW', 'END', 'HOT'];
const categories = [
  'All',
  'Diamond',
  'Artwork',
  'Digital Art'
];

const CardFilter = () => {
  const [auctionSort, setAuctionSort] = useRecoilState(auctionSortAtom);
  const [auctionCategory, setAuctionCategory] =
    useRecoilState(auctionCategoryAtom);

  return (
    <div className="col-12">
      <SectionHeading
        img={Explore2Icon3}
        text="Filter Settings"
        title="Filters Settings"
      />

      <div className="card h-100 mb-30">
        <div className="card-header pb-0 p-3">
          <h6 className="mb-0">Filter Settings</h6>
        </div>
        <div className="card-body p-3">
          <h6 className="text-uppercase text-body text-xs font-weight-bolder mt-4">
            Item Sort
          </h6>
          <ul className="list-group">
            {sorts.map((sort, i: number) => (
              <li key={i} className="list-group-item border-0 px-0">
                <div className="form-check form-check-info text-left">
                  <input
                    id={sort}
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    checked={auctionSort === i}
                    onChange={(e) => e.target.checked && setAuctionSort(i)}
                  />
                  <label htmlFor={sort} className="form-check-label">
                    {sort}
                  </label>
                </div>
              </li>
            ))}
          </ul>
          <h6 className="text-uppercase text-body text-xs font-weight-bolder mt-4">
            Item Category
          </h6>
          <ul className="list-group">
            {categories.map((category, i: number) => (
              <li key={i} className="list-group-item border-0 px-0">
                <div className="form-check form-check-info text-left">
                  <input
                    id={category}
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    checked={auctionCategory === i}
                    onChange={(e) => e.target.checked && setAuctionCategory(i)}
                  />
                  <label htmlFor={category} className="form-check-label">
                    {category}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardFilter;
