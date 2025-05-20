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
      <button onClick={handleLogout}>Sair</button>
      <h2>Bem-vindo!</h2>
      <h3>Próximos Agendamentos</h3>
      <ul>
        {agendamentos.map(a => (
          <li key={a.id}>
            {a.data} {a.hora} - {a.medico}
          </li>
        ))}
      </ul>
      <nav>
        <Link to="/patient/calendar">Agendar nova consulta</Link> |{' '}
        <Link to="/patient/appointmentsList">Ver histórico</Link> |{' '}
        <Link to="/patient/profileEdit">Editar perfil</Link>
      </nav>
    </div>
  );
}

export default PatientDashboard;