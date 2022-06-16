import SecLogo from './SecLogo';
import SecLinks from './SecLinks';

function NavbarLast() {
  return (
    <nav
      className="navbar navbar-expand-lg position-absolute top-0 z-index-3 w-100 shadow-none my-3  navbar-transparent mt-4"
      style={{ zIndex: 100 }}
    >
      <div className="container">
        <SecLogo />
        {/* <SecLinks /> */}
      </div>
    </nav>
  );
}

export default NavbarLast;
