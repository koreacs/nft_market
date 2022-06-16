import { NavLink } from "react-router-dom";
import ITag from '../../ITag';

function ListTag1({path , img , classOfName , text1 , text2 , text3}){
  return(
      <li className="mb-2">
        <NavLink className="dropdown-item border-radius-md" to="/">
          <div className="d-flex py-1">
            <div className="my-auto">
              <img src={img} alt="img" className={classOfName} />
            </div>
            <div className="d-flex flex-column justify-content-center">
              <h6 className="text-sm font-weight-normal mb-1">
                <span className="font-weight-bold">{text1}</span> {text2}
              </h6>
              <p className="text-xs text-secondary mb-0">
                <ITag ClassName="fa fa-clock me-1" />
                {text3}
              </p>
            </div>
          </div>
        </NavLink>
      </li>
  )
}

export default ListTag1