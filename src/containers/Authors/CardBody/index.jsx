import { NavLink } from "react-router-dom";
import Card from './Card'
import ITag from '../../../components/ITag'

function CardBody({data}){

  return(
      <div className="card-body">
        <div className="row">

          {data && data.map((item , i) => (
            <Card
              key={i}
              img1={item.img1}
              img2={item.img2}
              path1={item.path1}
              path2={item.path2}
              path3={item.path3}
              path4={item.path4}
            />
          ))}


          <div className="col-md-12 text-center">
            <NavLink className="btn bg-gradient-dark mb-0" to="/"><ITag ClassName="fas fa-plus mr-10" />Load More</NavLink>
          </div>
        </div>
      </div>
  )
}

export default CardBody