function ITag({
  ClassName,
  onClick,
  title,
}: {
  ClassName: any;
  onClick?: any;
  title?: any;
}) {
  return <i className={ClassName} onClick={onClick}></i>;
}
export default ITag;
