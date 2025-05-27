import './style.css';

function Input({
  type = "text",
  id,
  name,
  placeholder,
  value,
  onChange,
  disabled,
  style = {},
  className = "",
  ...props
}) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`custom-input ${className}`}
      style={style}
      {...props}
    />
  );
}

export default Input;