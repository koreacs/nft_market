import ITag from '../../../components/ITag';

function SecAvatar({ img }: { img: any }) {
  return (
    <div className="col-auto">
      <div className="avatar avatar-xl position-relative">
        <img src={img} alt="..." className="w-100 border-radius-lg shadow-sm" />
        <a
          href="/"
          className="btn btn-sm btn-icon-only bg-gradient-light rounded-circle position-absolute bottom-0 end-0"
          style={{ marginBottom: '-0.5rem', marginRight: '-.5rem' }}
        >
          <ITag
            ClassName="fa fa-pen top-0"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Edit Image"
          />
        </a>
      </div>
    </div>
  );
}

export default SecAvatar;
