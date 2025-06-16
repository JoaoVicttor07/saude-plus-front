import "./style.css"

const ConsultationList = ({ consultations, selectedDate, onDetailClick }) => {
  if (!selectedDate) {
    return <div className="consultation-list-container">Selecione um dia no calendário.</div>;
  }

  if (!consultations.length) {
    return <div className="consultation-list-container">Nenhuma consulta marcada para este dia.</div>;
  }

  return (
    <div className="consultation-list-container">
      <h4>Consultas do dia</h4>
      <div className="consultations-list">
        {consultations.map((consulta) => (
          <div key={consulta.id} className="consultation-item">
            <div className="consultation-info">
              <strong>{consulta.time}</strong> - {consulta.patientName}
              <span style={{ marginLeft: 8, fontSize: 13, color: "#888" }}>
                ({consulta.status})
              </span>
            </div>
            <button className="detail-button" onClick={() => onDetailClick(consulta)}>
              Detalhes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultationList;