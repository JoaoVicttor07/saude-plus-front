import React from 'react';
import './style.css';

function Button({ children, ...props }) {
  return (
    <button className="custom-button" {...props}>
      {children}
    </button>
  );
}

export default Button;