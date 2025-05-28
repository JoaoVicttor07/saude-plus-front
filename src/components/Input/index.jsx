import './style.css';

function Input({
  type = "text",
  id,
  name,
  placeholder,
  value,
  onChange,
  disabled,
  width,
  maxWidth,
  minWidth,
  style = {},
  className = "",
  ...props
}) {
  const customStyle = {
    width,
    maxWidth,
    minWidth,
    ...style,
  };

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
      style={customStyle}
      {...props}
    />
  );
}

export default Input;