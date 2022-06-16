import Input1 from '../../../components/Input1';
import Input2 from '../../../components/Input2';
import { useRecoilState } from 'recoil';
import createItemCategoryAtom from '../../../atoms/createItemCategory';

const categories = [
  'Diamond',
  'Artwork',
  'Digital Art'
];

const CategoryCard = () => {
  const [createItemCategory, setCreateItemCategory] = useRecoilState(
    createItemCategoryAtom
  );

  return (
    <div className="card h-100 mb-30">
      <div className="card-header pb-0 p-3">
        <h6 className="mb-0">Category Settings</h6>
      </div>
      <div className="card-body p-3">
        {/* <h6 className="text-uppercase text-body text-xs font-weight-bolder">Item Collection</h6>
        <ul className="list-group">
          {data1 && data1.map((item , i) => (
            <Input1
              key={i}
              checked={item.checked}
              text={item.text}
            />
          ))}
        </ul> */}
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
                  checked={createItemCategory === i + 1}
                  onChange={(e) =>
                    e.target.checked && setCreateItemCategory(i + 1)
                  }
                />
                <label htmlFor={category} className="form-check-label">
                  {category}
                </label>
              </div>
            </li>
          ))}
        </ul>
        {/* <h6 className="text-uppercase text-body text-xs font-weight-bolder mt-4">Blockchain Based </h6>
        <ul className="list-group">
          {data2 && data2.map((item , i) => (
            <Input1
              key={i}
              checked={item.checked}
              text={item.text}
            />
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default CategoryCard;
