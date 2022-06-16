import { NavLink } from "react-router-dom";

function Card({imgBack , text1}){
	return(
		<div className="col-lg-6 mb-30">
		  <div className="card">
		    <div className="card-body p-3">
		      <div className="card card-background shadow-none card-background-mask-primary">
		        <div className="full-background" style={{backgroundImage: `url(${imgBack})`}}></div>
		        <div className="card-body text-center p-3 w-100">
		          <div className="icon icon-shape icon-sm bg-white shadow mx-auto mb-3 d-flex align-items-center justify-content-center border-radius-md">
		            <i className="ni ni-diamond gradient-text text-lg top-0" aria-hidden="true" ></i>
		          </div>
		          <h5 className="text-white up mb-10p">{text1}</h5>
		          <p className="text-sm">From colors, cards, typography to complex, you will find the.</p>
		          <NavLink to="/" className="btn btn-white bg-light mb-0 w-100">Connect Wallet</NavLink>
		        </div>
		      </div>
		    </div>
		  </div>
		</div>
	)
}

export default Card