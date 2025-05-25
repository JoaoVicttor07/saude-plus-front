import { useState } from "react";

function Button({
  children,
  width,
  height = "40px",
  fontSize = "1rem",
  fontWeight,
  color,
  background = "#2c7a7b",
  border = "none",
  borderRadius = "4px",
  hoverBackground = "#285e61",
  hoverColor,
  disabledBackground = "#b2dfdb",
  disabledColor = "#fff", 
  style = {},
  disabled,
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);

  const isBtnDisabled = !!disabled;

  const customStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width,
    height,
    fontSize,
    fontWeight,
    color: isBtnDisabled
      ? disabledColor
      : isHovered && hoverColor
      ? hoverColor
      : color,
    background: isBtnDisabled
      ? disabledBackground
      : isHovered && hoverBackground
      ? hoverBackground
      : background,
    border,
    borderRadius,
    padding: "10px",
    cursor: isBtnDisabled ? "not-allowed" : "pointer",
    opacity: isBtnDisabled ? 0.6 : 1,
    transition: "background 0.2s, color 0.2s, opacity 0.2s",
    ...style,
  };

  return (
    <button
      style={customStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={isBtnDisabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;