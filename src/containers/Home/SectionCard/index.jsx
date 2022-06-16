import ListTag from './ListTag'

function SectionCard({data1 , data2 , data3}){
  return(
        <div className="container-fluid py-4 pb-0">
          <div className="row">
            
            <div className="col-12 col-xl-4 col-md-6 mb-30">
              <div className="card h-100">
                <div className="card-body p-3">
                  <ul className="list-group">
                    {data1 && data1.map((item , i) => (

                        <ListTag 
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
            <div className="col-12 col-xl-4 col-md-6 mb-30">
              <div className="card h-100">
                <div className="card-body p-3">
                  <ul className="list-group">

                    {data2 && data2.map((item , i) => (

                        <ListTag
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
            <div className="col-12 col-xl-4 col-md-6 mb-30">
              <div className="card h-100">
                <div className="card-body p-3">
                  <ul className="list-group">
                    {data3 && data3.map((item , i) => (

                        <ListTag
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
          </div>
        </div>
  )
}

export default SectionCard