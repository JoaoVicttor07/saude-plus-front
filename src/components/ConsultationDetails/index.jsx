import "./style.css"

const ConsultationDetails = ({ consultation, onClose, onCancelClick }) => {
  if (!consultation) return null;

  const formatDate = (date) => {
    if (!date) return "";
    return date instanceof Date
      ? date.toLocaleDateString("pt-BR")
      : new Date(date).toLocaleDateString("pt-BR");
  };

  const isCancelada = consultation.status?.toLowerCase() === "cancelada";

  return (
    <div className="consultation-details-overlay">
      <div className="consultation-details-panel">
        <div className="details-header">
          <h3>Detalhes da Consulta</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="details-content">
          <div className="detail-row">
            <strong>Data:</strong>
            <span>{formatDate(consultation.date)}</span>
          </div>
          <div className="detail-row">
            <strong>Horário:</strong>
            <span>{consultation.time}</span>
          </div>
          <div className="detail-row">
            <strong>Paciente:</strong>
            <span>{consultation.patientName}</span>
          </div>
          <div className="detail-row">
            <strong>Status:</strong>
            <span className={`status-${consultation.status?.toLowerCase()}`}>{consultation.status}</span>
          </div>
          {isCancelada && consultation.cancelReason && (
            <div className="detail-row">
              <strong>Motivo do cancelamento:</strong>
              <span style={{ color: "#ef4444", textAlign: "justify", display: "block" }}>
                {consultation.cancelReason}
              </span>
            </div>
          )}
        </div>
        {!isCancelada && (
          <div className="details-actions">
            <button
              className="cancel-consultation-button"
              onClick={() => onCancelClick(consultation)}
            >
              Cancelar Consulta
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationDetails;