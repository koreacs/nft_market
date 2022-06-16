import { NavLink } from 'react-router-dom';
import { IItem } from '../../../types/index';

function NewListedItem(props: IItem) {
  return (
    <div className="col-xl-3 col-md-6 mb-xl-0">
      <div className="card card-blog card-plain">
        <div className="d-block border-radius-xl">
          <div
            className="position-relative mb-30 img-fluid shadow border-radius-xl"
            style={{
              backgroundImage: `url('${props.img}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minWidth: '100%',
              aspectRatio: '1',
            }}
          ></div>
        </div>
        {/* <NavLink to={path2} className="item-owner" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="view profile">
            <img alt="placeholder" src={img2} />
          </NavLink> */}
        <div className="item-cont card-body px-1 pb-0">
          <p className="text-gradient text-dark mb-2 text-sm">#{props.id}</p>
          <div className="text-decoration-none">
            <h5 className="mb-4">{props.title}</h5>
          </div>
          {/* <p className="mb-4 text-sm">
            Currenct Price : <span className="gradient-text">0 ETH</span>
          </p> */}
          {/* <div className="d-flex align-items-center justify-content-between">
            <NavLink to="" className="btn btn-outline-primary btn-sm mb-0">
              Buy Now
            </NavLink>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default NewListedItem;
