import {Explore2Icon1} from '../../../utils/allImgs'

import TopSelling from './TopSelling'
import SectionHeading from '../../../components/SectionHeading'

const CardTopSelling = ({data}) => {

  return (
  <div className="col-12">
    <SectionHeading
                    img={Explore2Icon1}
                    text='Our Top Creatives'
                    title='Top Selling Authors'
    />


    <div className="card h-100">
      <div className="card-body p-3">
        <ul className="list-group">
          {data && data.map((item , i) => (

              <TopSelling 
                        key={i}
                        path1={item.path1}
                        NumImg={item.NumImg}
                        img={item.img}
                        path2={item.path2}
                        text1={item.text1}
                        path3={item.path3}
                        text2={item.text2}
                        price={item.price}
              />

          ))}
        </ul>
      </div>
    </div>
  </div>
  );
}

export default CardTopSelling;