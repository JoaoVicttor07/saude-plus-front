import { Link } from 'react-router-dom';
import Header from '../../../components/header';
import './style.css';

function AppointmentsList() {
  // TODO: Buscar consultas do backend
  const consultas = [
    { id: 2, data: '10/05/2025', hora: '10:00', medico: 'Dra. Maria Souza', status: 'Realizada' },
    { id: 4, data: '01/05/2025', hora: '15:00', medico: 'Dr. João Silva', status: 'Cancelada' },
  ];

  // Filtra apenas as realizadas ou canceladas
  const historico = consultas.filter(
    c => c.status === 'Realizada' || c.status === 'Cancelada'
  );

  return (
    <div className="dashboard-bg">
      <Header />
      <main className="patient-dashboard-container" role="main">
        <h2 className="dashboard-title">Histórico de Consultas</h2>
        {historico.length === 0 ? (
          <div className="dashboard-empty">
            <p>Você ainda não possui consultas realizadas ou canceladas.</p>
          </div>
        ) : (
          <ul className="dashboard-appointments-list">
            {historico.map(c => (
              <li className="dashboard-appointment-item" key={c.id}>
                <span>
                  <b>{c.data}</b> {c.hora} - {c.medico}
                  <span
                    className={`status-label ${
                      c.status === 'Realizada'
                        ? 'status-realizada'
                        : c.status === 'Cancelada'
                        ? 'status-cancelada'
                        : ''
                    }`}
                  >
                    {c.status}
                  </span>
                </span>
                <Link className="dashboard-action-link" to={`/appointment/${c.id}`}>
                  Detalhes
                </Link>
              </li>
            ))}
          </ul>
        )}
        <div className="dashboard-actions">
          <Link className="dashboard-action-btn secondary" to="/dashboard">
            Voltar ao Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}

export default AppointmentsList;