function Breadcrumb({ text1, text2 }) {
  return (
    <>
      <span className="mask bg-gradient-primary opacity-6"></span>
      <div className="con-wrapper">
        <h2>{text1}</h2>
        <p style={{ whiteSpace: 'pre-line' }}>{text2}</p>
      </div>
    </>
  );
}

export default Breadcrumb;
