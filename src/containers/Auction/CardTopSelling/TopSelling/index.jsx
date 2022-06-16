import { NavLink } from 'react-router-dom';

function TopSelling({ path1, NumImg, img, path2, text1, path3, text2, price }) {
  return (
    <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
      <NavLink to={path1} className="avatar v2 me-3">
        <span className="author-num">{NumImg}</span>
        <img src={img} alt="kal" className="border-radius-lg shadow" />
      </NavLink>
      <div className="d-flex align-items-start flex-column justify-content-center">
        <NavLink to={path2}>
          <h6 className="author-name">{text1}</h6>
        </NavLink>
        <NavLink className="btn btn-link autho-link" to={path3}>
          {text2}
        </NavLink>
      </div>
      <span className="auth-earning ms-auto">{price} TVP</span>
    </li>
  );
}

export default TopSelling;
