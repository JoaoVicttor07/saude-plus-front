import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/header";
import Button from "../../../components/Button";
import Footer from "../../../components/footer"
import "./style.css";
import { useState } from "react";

// Simulação de dados (substitua por busca da API futuramente)
const CONSULTAS = [
  {
    id: 1,
    data: "22/05/2025",
    hora: "14:00",
    medico: "Dr. João Silva",
    especialidade: "Cardiologia",
    local: "Clínica Central",
    status: "Agendada",
    observacao: "",
  },
  {
    id: 2,
    data: "10/05/2025",
    hora: "10:00",
    medico: "Dra. Maria Souza",
    especialidade: "Dermatologia",
    local: "Clínica Sul",
    status: "Realizada",
    observacao: "Paciente apresentou melhora.",
  },
  {
    id: 3,
    data: "28/05/2025",
    hora: "09:30",
    medico: "Dra. Maria Souza",
    especialidade: "Dermatologia",
    local: "Clínica Sul",
    status: "Agendada",
    observacao: "",
  },
  {
    id: 4,
    data: "01/05/2025",
    hora: "15:00",
    medico: "Dr. João Silva",
    especialidade: "Cardiologia",
    local: "Clínica Central",
    status: "Cancelada",
    observacao: "Consulta cancelada pelo paciente.",
  },
];

function AppointmentDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cancelada, setCancelada] = useState(false);
  const consulta = CONSULTAS.find((c) => String(c.id) === String(id));

  if (!consulta) {
    return (
      <div className="dashboard-bg">
        <Header />
        <main className="patient-dashboard-container" role="main">
          <h2 className="dashboard-title">Consulta não encontrada</h2>
          <div className="dashboard-empty">
            <p>Não foi possível localizar os detalhes desta consulta.</p>
          </div>
          <div className="dashboard-actions">
            <Link className="dashboard-action-btn secondary" to="/appointments">
              Voltar ao Histórico
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const handleCancelar = () => {
    // Aqui você pode chamar a API futuramente
    setCancelada(true);
  };

  // Determina se pode cancelar: status agendada e não já cancelada
  const podeCancelar = consulta.status === "Agendada" && !cancelada;

  return (
    <div className="dashboard-bg">
      <Header />
      <main className="patient-dashboard-container" role="main">
        <h2 className="dashboard-title">Detalhes da Consulta</h2>
        <div className="appointment-detail-card">
          <div className="appointment-detail-row">
            <span className="label">Data:</span>
            <span>{consulta.data}</span>
          </div>
          <div className="appointment-detail-row">
            <span className="label">Horário:</span>
            <span>{consulta.hora}</span>
          </div>
          <div className="appointment-detail-row">
            <span className="label">Médico:</span>
            <span>{consulta.medico}</span>
          </div>
          <div className="appointment-detail-row">
            <span className="label">Especialidade:</span>
            <span>{consulta.especialidade}</span>
          </div>
          <div className="appointment-detail-row">
            <span className="label">Local:</span>
            <span>{consulta.local}</span>
          </div>
          <div className="appointment-detail-row">
            <span className="label">Status:</span>
            <span
              className={`status-label ${
                cancelada || consulta.status === "Cancelada"
                  ? "status-cancelada"
                  : consulta.status === "Realizada"
                  ? "status-realizada"
                  : consulta.status === "Agendada"
                  ? "status-agendada"
                  : ""
              }`}
            >
              {cancelada ? "Cancelada" : consulta.status}
            </span>
          </div>
        </div>
        <div className="dashboard-actions">
          {podeCancelar && (
            <Button
              color="#b00"
              fontWeight={600}
              hoverBackground="#ffcccc"
              hoverColor="#900"
              background="#ffeaea"
              border="1px solid #b00"
              height="45px"
              onClick={handleCancelar}
              style={{ marginBottom: "15px" }}
            >
              Cancelar consulta
            </Button>
          )}

          <Button
            background="#fff"
            color="#2c7a7b"
            fontWeight={600}
            hoverBackground="#F0F8F8"
            border="2px solid #2c7a7b"
            height="45px"
            onClick={() =>
              navigate(
                consulta.status === "Agendada" ? "/dashboard" : "/appointments"
              )
            }
          >
            Voltar
          </Button>
        </div>
        {cancelada && (
          <div className="dashboard-empty" style={{ marginTop: 16 }}>
            <p>Sua consulta foi cancelada com sucesso.</p>
          </div>
        )}
      </main>
      <Footer/>
    </div>
  );
}

export default AppointmentDetail;
