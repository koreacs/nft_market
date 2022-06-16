import { NavLink } from 'react-router-dom';

function NavItem({
  path,
  ViewBox,
  title,
  transform2,
  Id = '',
  transform4,
  polygon = false,
  opacityPoly = '',
  points = '',
  D1,
  opacityNormal,
  D2,
  pathSVGMore = 0,
  D3 = '',
  D4 = '',
  opacity3 = '',
  opacity4 = '',
  spanText,
  Svg,
}: {
  path?: any;
  ViewBox?: any;
  title?: any;
  transform2?: any;
  Id?: any;
  transform4?: any;
  polygon?: any;
  opacityPoly?: any;
  points?: any;
  D1?: any;
  opacityNormal?: any;
  D2?: any;
  pathSVGMore?: any;
  D3?: any;
  D4?: any;
  opacity3?: any;
  opacity4?: any;
  spanText?: any;
  Svg?: any;
}) {
  return (
    <li className="nav-item">
      <NavLink className="nav-link" exact activeClassName="active" to={path}>
        <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center mr-2 d-flex align-items-center justify-content-center">
          {Svg ? (
            <Svg width={20} height={20} />
          ) : (
            // <img src={svg} width={20} height={20} />
            <svg
              width="12px"
              height="12px"
              viewBox={ViewBox}
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              // xlink="http://www.w3.org/1999/xlink"
            >
              <title>{title}</title>
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform={transform2} fill="#FFFFFF" fillRule="nonzero">
                  <g transform="translate(1716.000000, 291.000000)">
                    <g id={Id} transform={transform4}>
                      {polygon && (
                        <polygon
                          className="color-background"
                          opacity={opacityPoly}
                          points={points}
                        ></polygon>
                      )}

                      {pathSVGMore === 3 ? (
                        <>
                          <path
                            className="color-background"
                            d={D1}
                            opacity={opacityNormal}
                          ></path>
                          <path className="color-background" d={D2}></path>
                          <path className="color-background" d={D3}></path>
                        </>
                      ) : pathSVGMore === 4 ? (
                        <>
                          <path className="color-background" d={D1}></path>
                          <path className="color-background" d={D2}></path>
                          <path
                            className="color-background"
                            d={D3}
                            opacity={opacity3}
                          ></path>
                          <path
                            className="color-background"
                            d={D4}
                            opacity={opacity4}
                          ></path>
                        </>
                      ) : (
                        <>
                          <path
                            className="color-background"
                            d={D1}
                            opacity={opacityNormal}
                          ></path>
                          <path className="color-background" d={D2}></path>
                        </>
                      )}
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          )}
        </div>
        <span className="nav-link-text ms-2 fw-normal">{spanText}</span>
      </NavLink>
    </li>
  );
}

export default NavItem;
