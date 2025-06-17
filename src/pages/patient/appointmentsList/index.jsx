import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import Header from '../../../components/header';
import Button from '../../../components/Button';
import Footer from "../../../components/footer"
import AppointmentService from '../../../services/AppointmentService';
import { useAuth } from '../../../context/AuthContext';
import './style.css';

const formatDateTime = (isoString) => {
  if (!isoString) return { date: "Data inválida", time: "Hora inválida" };
  try {
    const dateObj = new Date(isoString);
    if (isNaN(dateObj.getTime())) {
      return { date: "Data inválida", time: "Hora inválida" };
    }
    const date = dateObj.toLocaleDateString("pt-BR");
    const time = dateObj.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { date, time };
  } catch (e) {
    console.error("Erro ao formatar data:", e, "Valor original:", isoString);
    return { date: "Erro na data", time: "Erro na hora" };
  }
};

function AppointmentsList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [appointmentsHistory, setAppointmentsHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      const fetchAppointmentsHistory = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const allAppointments = await AppointmentService.getAllAppointmentsByPatient(user.id);

          if (allAppointments && Array.isArray(allAppointments)) {
            const filteredAppointments = allAppointments.filter(
              (appointment) => appointment.status === 'REALIZADA' || appointment.status === 'DESMARCADA'
            );

            const sortedAppointments = filteredAppointments.sort(
              (a, b) => new Date(b.inicio) - new Date(a.inicio)
            );
            setAppointmentsHistory(sortedAppointments);
          } else {
            setAppointmentsHistory([]);
          }
        } catch (err) {
          console.error("Erro ao buscar histórico de consultas:", err);
          setError(
            "Não foi possível carregar seu histórico de consultas. Tente novamente mais tarde."
          );
          setAppointmentsHistory([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchAppointmentsHistory();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <div className="dashboard-bg">
      <Header />
      <main className="patient-dashboard-container" role="main">
        <h2 className="dashboard-title">Histórico de Consultas</h2>


        {isLoading && (
          <div className="dashboard-loading">
            <FaSpinner className="fa-spin" size={32} />
            <p>Carregando histórico...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="dashboard-empty dashboard-error">
            <FaExclamationCircle size={48} aria-hidden="true" style={{ color: "#b00" }} />
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && appointmentsHistory.length === 0 && (
          <div className="dashboard-empty">
            <FaCalendarAlt size={48} aria-hidden="true" />
            <p>Você ainda não possui consultas realizadas ou desmarcadas em seu histórico.</p>
          </div>
        )}

        {!isLoading && !error && appointmentsHistory.length > 0 && (
          <ul className="dashboard-appointments-list">
            {appointmentsHistory.map(c => {
              const { date, time } = formatDateTime(c.inicio);
              const statusClass = c.status ? c.status.toLowerCase() : '';
              return (
                <li className="dashboard-appointment-item" key={c.id}>
                  <FaCalendarAlt className="dashboard-appointment-icon" aria-hidden="true" />
                  <span>
                    <b>{date}</b> {time} - {c.medico?.nome || 'Médico não informado'}
                    <span
                      className={`status-label status-${statusClass}`}
                    >
                       {/**/}
                      {c.status === 'DESMARCADA' ? 'Desmarcada' : c.status === 'REALIZADA' ? 'Realizada' : c.status}
                    </span>
                  </span>
                  <Link className="dashboard-action-link" to={`/appointment-details/${c.id}`}>
                    Detalhes
                  </Link>
                </li>
              );
            })}
          </ul>
        )}


        <div className="dashboard-actions">
          <Button
            background="#fff"
            color="#2c7a7b"
            border="2px solid #2c7a7b"
            borderRadius="4px"
            height="50px"
            hoverBackground="#f0f8f8"
            fontWeight={600}
            onClick={() => navigate('/dashboard')}
          >
            Voltar ao Dashboard
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AppointmentsList;