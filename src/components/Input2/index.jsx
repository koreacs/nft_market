function Input2({checked , text}){
  return(
    <li className="list-group-item border-0 px-0">
      <div className="form-check form-check-info text-left">
        <input className="form-check-input" type="checkbox" value="" defaultChecked={checked}/>
        <label className="form-check-label" >
          {text}
        </label>
      </div>
    </li>
  )
}
export default Input2