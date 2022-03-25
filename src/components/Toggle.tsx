type Props = {
  isChecked: boolean;
  changeHandler: () => void;
  label: string;
}

const Toggle = ({ changeHandler, isChecked, label }: Props) => {
  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="flexSwitchCheckDefault"
        onChange={changeHandler}
        checked={isChecked}
      />
      <label
        className="form-check-label"
        htmlFor="flexSwitchCheckDefault"
      >
        {label}
      </label>
    </div>
  )
}

export default Toggle;