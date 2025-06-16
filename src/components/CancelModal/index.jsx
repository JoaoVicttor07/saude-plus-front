import { useState } from "react"
import "./style.css"

const CancelModal = ({ consultation, onClose, onConfirm }) => {
  const [reason, setReason] = useState("")
  const [error, setError] = useState("")

  const handleConfirm = () => {
    if (!reason.trim()) {
      setError("O motivo do cancelamento é obrigatório")
      return
    }

    onConfirm(consultation.id, reason)
    setReason("")
    setError("")
  }

  const handleClose = () => {
    setReason("")
    setError("")
    onClose()
  }

  if (!consultation) return null

  return (
    <div className="cancel-modal-overlay">
      <div className="cancel-modal">
        <div className="cancel-modal-header">
          <h3>Cancelar Consulta</h3>
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="cancel-modal-content">
          <div className="consultation-summary">
            <p>
              <strong>Paciente:</strong> {consultation.patientName}
            </p>
            <p>
              <strong>Data:</strong> {consultation.date.toLocaleDateString("pt-BR")}
            </p>
            <p>
              <strong>Horário:</strong> {consultation.time}
            </p>
          </div>

          <div className="reason-section">
            <label htmlFor="cancel-reason">
              Motivo do cancelamento <span className="required">*</span>
            </label>
            <textarea
              id="cancel-reason"
              value={reason}
              onChange={(e) => {
                setReason(e.target.value)
                setError("")
              }}
              placeholder="Digite o motivo do cancelamento..."
              rows={4}
              className={error ? "error" : ""}
            />
            {error && <span className="error-message">{error}</span>}
          </div>
        </div>

        <div className="cancel-modal-actions">
          <button className="back-button" onClick={handleClose}>
            Voltar
          </button>
          <button className="confirm-button" onClick={handleConfirm}>
            Confirmar Cancelamento
          </button>
        </div>
      </div>
    </div>
  )
}

export default CancelModal
