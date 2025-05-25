import React from "react";
import "./style.css";

function Modal({ show, motivo, setMotivo, onConfirm, onClose }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Motivo do cancelamento</h4>
        <textarea
          value={motivo}
          onChange={e => setMotivo(e.target.value)}
          placeholder="Descreva o motivo..."
          rows={3}
        />
        <div className="modal-actions">
          <button onClick={onConfirm} className="confirmar-button">Confirmar</button>
          <button onClick={onClose} className="fechar-button">Fechar</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;