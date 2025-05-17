import './Input.css';

function Input({ type, id, placeholder, ...props }) {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="custom-input"
      {...props}
    />
  );
}

export default Input;