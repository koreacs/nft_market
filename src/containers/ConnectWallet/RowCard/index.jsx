import Card from './Card'

function RowCard({img , data}){
	return(
      <div className="row">
        <div className="col-lg-5 me-auto mt-lg-0 mb-30">
          <div className="card">
            <div className="card-body p-3">
              <img src={img} className="w-100 border-radius-lg" alt="" />
            </div>
          </div>
        </div>
        <div className="col-lg-7">
          <div className="row">

            {data && data.map((item , i) => (
              <Card
                key={i}
                imgBack={item.imgBack}
                text1={item.text1}
              />
            ))}
          </div>
          
        </div>
      </div>
	)
}

export default RowCard