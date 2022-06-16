function CardImg({ img }){

  return(
    <div className="col-lg-5 me-auto mt-lg-0">
      <div className="card">
        <div className="card-body p-3">
          <img src={img} className="w-100 border-radius-lg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default CardImg