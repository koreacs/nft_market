import { NavLink } from "react-router-dom";

const SecForm = () => {

  return (
    <div className="card-body">
      <form>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Name" aria-label="Name"  />
        </div>
        <div className="mb-3">
          <input type="email" className="form-control" placeholder="Email" aria-label="Email"  />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Password" />
        </div>
        <div className="form-check form-check-info text-left">
          <input className="form-check-input" type="checkbox" value=""  checked />
          <label className="form-check-label" >
            I agree the <NavLink to="/" className="text-dark font-weight-bolder">Terms and Conditions</NavLink>
          </label>
        </div>
        <div className="text-center">
          <button  className="btn bg-gradient-dark w-100 my-4 mb-2">Sign up</button>
        </div>
      </form>
    </div>
  );
}

export default SecForm;