function Input({ checked, text }: { checked: any; text: any }) {
  return (
    <li className="list-group-item border-0 px-0">
      <div className="form-check form-switch ps-0">
        <input
          className="form-check-input ms-auto"
          type="checkbox"
          id="flexSwitchCheckDefault3"
          defaultChecked={checked}
        />
        <label
          className="form-check-label text-body ms-3 text-truncate w-80 mb-0"
          htmlFor="flexSwitchCheckDefault3"
        >
          {text}
        </label>
      </div>
    </li>
  );
}
export default Input;
