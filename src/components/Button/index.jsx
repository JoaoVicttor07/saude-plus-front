import React from 'react';
import './style.css';

function Button({ children, className = '', ...props }) {
  return (
    <button className={`custom-button ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;