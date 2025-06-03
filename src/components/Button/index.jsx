import { useState } from "react";

function Button({
  children,
  width,
  height,
  fontSize,
  fontWeight,
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
    cursor: isBtnDisabled ? "not-allowed" : "pointer",
    opacity: isBtnDisabled ? 0.7 : 1,
    // Efeitos visuais leves, não sobrescrevendo cor/background do CSS
    boxShadow: isHovered && !isBtnDisabled
      ? "0 4px 16px 0 rgba(44,122,123, 0.15)"
      : "none",
    transform: isHovered && !isBtnDisabled ? "translateY(-2px)" : "none",
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