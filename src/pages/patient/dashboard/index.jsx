import { Link, useNavigate } from 'react-router-dom';
import { FaCalendarAlt } from "react-icons/fa";
import "./style.css";

function PatientDashboard() {
  // Dados estáticos simulados
  const agendamentos = [
    { id: 1, data: '22/05/2025', hora: '14:00', medico: 'Dr. João Silva' },
    { id: 2, data: '25/05/2025', hora: '09:30', medico: 'Dra. Maria Souza' },
  ];
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Limpar autenticação quando houver
    navigate('/signin');
  };

  return (
    <div className="dashboard-bg">
      <header className="dashboard-header">
        <div className="dashboard-logo" aria-label="Saúde+">Saúde<span>+</span></div>
        <button
          className="dashboard-logout-btn"
          onClick={handleLogout}
          aria-label="Sair"
        >
          Sair
        </button>
      </header>
      <main className="patient-dashboard-container" role="main">
        <h2 className="dashboard-title">Bem-vindo!</h2>
        <h3 className="dashboard-section-title">Próximos Agendamentos</h3>
        {agendamentos.length === 0 ? (
          <div className="dashboard-empty">
            <FaCalendarAlt size={48} aria-hidden="true" />
            <p>Você ainda não tem consultas agendadas.<br />Que tal agendar a primeira agora?</p>
          </div>
        ) : (
          <ul className="dashboard-appointments-list">
            {agendamentos.map(a => (
              <li className="dashboard-appointment-item" key={a.id}>
                <FaCalendarAlt className="dashboard-appointment-icon" aria-hidden="true" />
                <span>
                  {a.data} {a.hora} - {a.medico}
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className="dashboard-actions">
          <Link className="dashboard-action-btn primary" to="/calendar">
            Agendar nova consulta
          </Link>
          <Link className="dashboard-action-btn secondary" to="/appointments">
            Ver histórico
          </Link>
          <Link className="dashboard-action-btn secondary" to="/profile/edit">
            Editar perfil
          </Link>
        </div>
      </main>
    </div>
  );
}

export default PatientDashboard;