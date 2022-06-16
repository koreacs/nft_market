import { useWeb3React } from '@web3-react/core';
function SecName() {
  const { account } = useWeb3React();

  return (
    <div className="col-auto my-auto">
      <div className="h-100">
        <h5 className="mb-1">{account}</h5>
        {/* <h5 className="mb-1">Alec Thompson</h5> */}
        {/* <p className="mb-0 font-weight-bold text-sm">CEO / Co-Founder</p> */}
      </div>
    </div>
  );
}

export default SecName;
