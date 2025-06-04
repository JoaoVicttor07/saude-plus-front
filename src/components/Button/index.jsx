import { useState } from "react";

function Button({
  children,
  width,
  height,
  fontSize,
  fontWeight,
  color,
  background,
  hoverBackground,
  hoverColor,
  disabledBackground,
  disabledColor,
  border,
  borderRadius,
  style = {},
  disabled,
  className = "",
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
      ? disabledColor || "#fff"
      : isHovered && hoverColor
      ? hoverColor
      : color,
    background: isBtnDisabled
      ? disabledBackground || "#b2dfdb"
      : isHovered && hoverBackground
      ? hoverBackground
      : background,
    border: border || "none",
    borderRadius: borderRadius || "8px",
    cursor: isBtnDisabled ? "not-allowed" : "pointer",
    opacity: isBtnDisabled ? 0.7 : 1,
    boxShadow: isHovered && !isBtnDisabled
      ? "0 4px 16px 0 rgba(44,122,123, 0.15)"
      : "none",
    transform: isHovered && !isBtnDisabled ? "translateY(-2px)" : "none",
    transition: "all 0.2s",
    ...style,
  };

  return (
    <button
      className={className}
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