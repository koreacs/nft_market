function ListTag({
  img,
  name,
  mint,
  subPrice,
  price,
}: {
  img: any;
  name: any;
  mint: any;
  subPrice: any;
  price: any;
}) {
  return (
    <li className="mb-2">
      <div className="dropdown-item border-radius-md">
        <div className="d-flex py-1">
          <div className="my-auto">
            <img src={img} className="avatar avatar-sm  me-3 " alt="" />
          </div>
          <div className="d-flex flex-column justify-content-center">
            <h6 className="text-sm font-weight-normal mb-1">
              <span className="font-weight-bold">By</span> {name}
            </h6>
            <p className="text-xs text-secondary mb-0">
              <i className="fa fa-clock me-1" aria-hidden="true"></i>
              {mint}
            </p>
          </div>
          <div className="d-flex flex-column justify-content-center ms-auto">
            <h6 className="text-sm font-weight-normal mb-1">
              <span className="gradient-text">{subPrice} TVP</span>
            </h6>
            <p className="text-xs text-secondary mb-0">${price}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ListTag;
