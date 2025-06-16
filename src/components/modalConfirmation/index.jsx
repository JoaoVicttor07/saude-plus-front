import "./style.css";
import Button from "../Button";

function Modal({ open, title, children, onClose, buttonText = "OK", buttonProps = {} }) {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modalContent">
        {title && <h2 className="modal-title">{title}</h2>}
        <div className="modal-body">{children}</div>
        <Button
          background="#2c7a7b"
          color="#fff"
          fontWeight={600}
          hoverBackground="#285e61"
          border="none"
          borderRadius="6px"
          height="45px"
          width="60%"
          style={{ marginTop: "1.5rem", minWidth: 140, }}
          onClick={onClose}
          {...buttonProps}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

export default Modal;