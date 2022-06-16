import ListTag from './ListTag';

function SecLatest({ data1 }: { data1: any }) {
  return (
    <div className="col-12 col-xl-4 col-lg-6 mt-ls">
      <div className="card h-100">
        <div className="card-header pb-0 p-3">
          <h6 className="mb-0">Latest Bids</h6>
        </div>
        <div className="card-body p-3">
          <ul className="list-group list-group-none">
            {data1 &&
              data1.map((item: any, i: number) => (
                <ListTag
                  key={i}
                  img={item.img}
                  name={item.name}
                  mint={item.mint}
                  subPrice={item.subPrice}
                  price={item.price}
                />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SecLatest;
