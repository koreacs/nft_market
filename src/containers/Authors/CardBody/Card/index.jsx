import { NavLink } from "react-router-dom";

function Card({ img1 , img2 , path1 , path2 , path3 , path4 }){

  return(
    <div className="col-xl-3 col-md-6 mb-xl-0 ">
      <div className="card card-blog card-plain">
        <div className="position-relative">
          <NavLink to={path1} className="d-block border-radius-xl">
            <img src={img1} alt="img-blur-shadow" className="img-fluid shadow border-radius-xl" />
          </NavLink>
        </div>
        <NavLink to={path2} className="item-owner v2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="view profile">
          <img alt="placeholder" src={img2} />
        </NavLink>
        <div className="item-cont card-body px-1 pb-0 text-center">
          <NavLink className="text-decoration-none" to={path3}>
            <h5 className="mt-20">
              Travis Scott
            </h5>
          </NavLink>
          <p className="mb-4 text-sm">
            Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths,
          </p>
          <div className="d-flex align-items-center justify-content-between">
            <NavLink to={path4} className="btn btn-outline-primary btn-sm mb-0 w-100">Follow Now</NavLink>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Card