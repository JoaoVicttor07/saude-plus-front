import { useState } from "react";

function Button({
  children,
  width,
  height,
  fontSize = "1rem",
  fontWeight,
  color,
  background = "#2c7a7b",
  border = "none",
  borderRadius = "0.5rem",
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
    padding: "0.75rem 1.5rem",
    cursor: isBtnDisabled ? "not-allowed" : "pointer",
    opacity: isBtnDisabled ? 0.6 : 1,
    transition: "background 0.2s, color 0.2s, opacity 0.2s, box-shadow 0.2s, transform 0.2s",
    boxShadow: isHovered
      ? "0 4 px 16 px 0 rgba(44,122,123, 0.15)"
      : "none",
    transform: isHovered ? "translateY(-2px)" : "none",
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