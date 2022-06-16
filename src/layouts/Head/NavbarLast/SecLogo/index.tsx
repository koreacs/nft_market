import { NavLink } from 'react-router-dom';

function SecLogo() {
  return (
    <>
      <NavLink
        className="navbar-brand font-weight-bolder ms-lg-0 ms-3 text-white"
        to="/"
      >
        NFT Marketplace
      </NavLink>
      {/* <button
        className="navbar-toggler shadow-none ms-2"
        data-bs-toggle="collapse"
        data-bs-target="#navigation"
        aria-controls="navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon mt-2">
          <span className="navbar-toggler-bar bar1"></span>
          <span className="navbar-toggler-bar bar2"></span>
          <span className="navbar-toggler-bar bar3"></span>
        </span>
      </button> */}
    </>
  );
}

export default SecLogo;
