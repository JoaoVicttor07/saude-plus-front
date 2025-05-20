import { Link, useNavigate } from 'react-router-dom';

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
    <div className="patient-dashboard-container">
      <button className="dashboard-logout-btn" onClick={handleLogout}>Sair</button>
      <h2 className="dashboard-title">Bem-vindo!</h2>
      <h3 className="dashboard-section-title">Próximos Agendamentos</h3>
      <ul className="dashboard-appointments-list">
        {agendamentos.map(a => (
          <li className="dashboard-appointment-item" key={a.id}>
            {a.data} {a.hora} - {a.medico}
          </li>
        ))}
      </ul>
      <nav className="dashboard-nav">
        <Link className="dashboard-link" to="/patient/calendar">Agendar nova consulta</Link> |{' '}
        <Link className="dashboard-link" to="/patient/appointmentsList">Ver histórico</Link> |{' '}
        <Link className="dashboard-link" to="/patient/profileEdit">Editar perfil</Link>
      </nav>
    </div>
  );
}

export default PatientDashboard;