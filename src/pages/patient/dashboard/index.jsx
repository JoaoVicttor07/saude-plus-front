import { Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import Header from "../../../components/header";
import Button from "../../../components/Button";
import "./style.css";

function PatientDashboard() {
  // Dados estáticos simulados
  const agendamentos = [
    {
      id: 1,
      data: "22/05/2025",
      hora: "14:00",
      medico: "Dr. João Silva",
      status: "Agendada",
    },
    {
      id: 3,
      data: "28/05/2025",
      hora: "09:30",
      medico: "Dra. Maria Souza",
      status: "Agendada",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="dashboard-bg">
      <Header />
      <main className="patient-dashboard-container" role="main">
        <h2 className="dashboard-title">Bem-vindo!</h2>
        <h3 className="dashboard-section-title">Próximos Agendamentos</h3>
        {agendamentos.length === 0 ? (
          <div className="dashboard-empty">
            <FaCalendarAlt size={48} aria-hidden="true" />
            <p>
              Você ainda não tem consultas agendadas.
              <br />
              Que tal agendar a primeira agora?
            </p>
          </div>
        ) : (
          <ul className="dashboard-appointments-list">
            {agendamentos.map((a) => (
              <li className="dashboard-appointment-item" key={a.id}>
                <FaCalendarAlt
                  className="dashboard-appointment-icon"
                  aria-hidden="true"
                />
                <span>
                  {a.data} {a.hora} - {a.medico}
                </span>
                <Link
                  className="dashboard-action-link"
                  to={`/appointment/${a.id}`}
                >
                  Detalhes
                </Link>
              </li>
            ))}
          </ul>
        )}
        <div className="dashboard-actions">
          <Button
            height="55px"
            fontWeight={600}
            onClick={() => navigate("/calendar")}
          >
            Agendar Consulta
          </Button>

          <Button
            background="#fff"
            color="#2c7a7b"
            fontWeight={600}
            hoverBackground="#f0f8f8"
            border="2px solid #2c7a7b"
            height="55px"
            onClick={() => navigate("/appointments")}
          >
            Ver histórico
          </Button>

          <Button
            background="#fff"
            color="#2c7a7b"
            fontWeight={600}
            hoverBackground="#f0f8f8"
            border="2px solid #2c7a7b"
            height="55px"
            onClick={() => navigate("/profile")}
          >
            Ver perfil
          </Button>
        </div>
      </main>
    </div>
  );
}

export default PatientDashboard;
