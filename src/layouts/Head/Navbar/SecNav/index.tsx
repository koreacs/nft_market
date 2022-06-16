import { NavLink } from 'react-router-dom';

function SecNav() {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
        <li className="breadcrumb-item text-sm">
          <NavLink className="opacity-5 text-dark text-decoration-none" to="/">
            Pages
          </NavLink>
        </li>
        <li
          className="breadcrumb-item text-sm text-dark active"
          aria-current="page"
        >
          Home
        </li>
      </ol>
      <h6 className="font-weight-bolder mb-0">Home</h6>
    </nav>
  );
}

export default SecNav;
