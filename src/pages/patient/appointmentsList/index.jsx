import { Link } from 'react-router-dom';

function AppointmentsList() {
  // TODO: Buscar consultas do backend
  const consultas = [
    { id: 1, data: '22/05/2025', hora: '14:00', medico: 'Dr. João Silva', status: 'Agendada' },
    { id: 2, data: '10/05/2025', hora: '10:00', medico: 'Dra. Maria Souza', status: 'Realizada' },
  ];

  return (
    <div>
      <h2>Minhas Consultas</h2>
      <ul>
        {consultas.map(c => (
          <li key={c.id}>
            {c.data} {c.hora} - {c.medico} - {c.status}{' '}
            <Link to={`/patient/appointmentDetail/${c.id}`}>Detalhes</Link>
          </li>
        ))}
      </ul>
      <nav>
        <Link to="/patient/dashboard">Dashboard</Link> |{' '}
        <Link to="/patient/calendar">Calendário</Link> |{' '}
        <Link to="/patient/profileView">Perfil</Link>
      </nav>
    </div>
  );
}

export default AppointmentsList;