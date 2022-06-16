import Input from './Input';

function SecSettings({ data2, data3 }: { data2: any; data3: any }) {
  return (
    <div className="col-12 col-xl-4 col-lg-6">
      <div className="card h-100">
        <div className="card-header pb-0 p-3">
          <h6 className="mb-0">Platform Settings</h6>
        </div>
        <div className="card-body p-3">
          <h6 className="text-uppercase text-body text-xs font-weight-bolder">
            Account
          </h6>
          <ul className="list-group">
            {data2 &&
              data2.map((item: any, i: number) => (
                <Input key={i} checked={item.checked} text={item.text} />
              ))}
          </ul>
          <h6 className="text-uppercase text-body text-xs font-weight-bolder mt-4">
            Application
          </h6>
          <ul className="list-group">
            {data3 &&
              data3.map((item: any, i: number) => (
                <Input key={i} checked={item.checked} text={item.text} />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SecSettings;
