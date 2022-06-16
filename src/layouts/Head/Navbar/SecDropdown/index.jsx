import { NavLink } from "react-router-dom";
import ITag from '../../../../components/ITag'

function SecDropdown(){

  return(
    <li>
      <NavLink className="dropdown-item border-radius-md" to="/">
        <div className="d-flex py-1">
          <div className="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">
            <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
              <title>credit-card</title>
              <g  stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g  transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF" fillRule="nonzero">
                  <g  transform="translate(1716.000000, 291.000000)">
                    <g  transform="translate(453.000000, 454.000000)">
                      <path className="color-background" d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"  opacity="0.593633743"></path>
                      <path className="color-background" d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z" ></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div className="d-flex flex-column justify-content-center">
            <h6 className="text-sm font-weight-normal mb-1">
              Payment successfully completed
            </h6>
            <p className="text-xs text-secondary mb-0">
              <ITag ClassName="fa fa-clock me-1" />
              2 days
            </p>
          </div>
        </div>
      </NavLink>
    </li>
  )
}

export default SecDropdown