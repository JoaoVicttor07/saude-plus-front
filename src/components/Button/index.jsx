import { useState } from 'react';

function Button({
  children,
  width,
  height = '40px',
  fontSize = '1rem',
  fontWeight,
  color,
  background = '#2c7a7b',
  border = 'none',
  borderRadius = '4px',
  hoverBackground = '#285e61',
  hoverColor,
  style = {},
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);

  const customStyle = {
    width,
    height,
    fontSize,
    fontWeight,
    color: isHovered && hoverColor ? hoverColor : color,
    background: isHovered && hoverBackground ? hoverBackground : background,
    border,
    borderRadius,
    padding: '10px',
    cursor: 'pointer',
    transition: 'background 0.2s, color 0.2s',
    ...style,
  };

  return (
    <button
      style={customStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;