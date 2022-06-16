const SectionHeading = ({img , text , title}) => {

  return (
      <div className="container-fluid section-heading d-flex mb-20">
        <div className="img-div mr-10"><img src={img} alt="" /></div>
        <div className="d-flex flex-column h-100">
          <p className="mb-1 pt-2 text-bold">{text}</p>
          <h5 className="font-weight-bolder">{title}</h5>
        </div>
      </div>
  );
}

export default SectionHeading;