import { NavLink } from 'react-router-dom';
import ITag from '../../../../components/ITag';
function SecLinks() {
  let data = [
    {
      path: '/signup',
      classIco: 'fas fa-user-circle opacity-6  me-1',
      text: 'Sign Up',
    },
    {
      path: '/signin',
      classIco: 'fas fa-key opacity-6  me-1',
      text: 'Sign In',
    },
  ];

  return (
    <div className="collapse navbar-collapse" id="navigation">
      <ul className="navbar-nav mx-auto">
        <li className="nav-item">
          <NavLink
            className="nav-link d-flex align-items-center me-2 active"
            aria-current="page"
            to="/"
          >
            <ITag ClassName="fa fa-chart-pie opacity-6  me-1" />
            Dashboard
          </NavLink>
        </li>
        {/* <li className="nav-item">
	        <NavLink className="nav-link d-flex align-items-center me-2 active" aria-current="page" to='/profile'>
	          <ITag ClassName='fa fa-user opacity-6  me-1'/>
	          Profile
	        </NavLink>
	      </li>
	      {data && data.map((item , i) => (
	        <li className="nav-item">
	          <NavLink className="nav-link d-flex align-items-center me-2 active" aria-current="page" to={item.path}>
	            <ITag ClassName={item.classIco}/>
	            {item.text}
	          </NavLink>
	        </li>                
        ))} */}
      </ul>
      <ul className="navbar-nav d-lg-block d-none">
        <li className="nav-item">
          <NavLink
            to="/connectwallet"
            className="btn btn-sm btn-round mb-0 me-1 bg-gradient-light"
          >
            Connect Wallet
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SecLinks;
