import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaSpinner } from "react-icons/fa";
import Header from "../../../components/header";
import Button from "../../../components/Button";
import Footer from "../../../components/footer";
import { useAuth } from "../../../context/AuthContext";
import AppointmentService from "../../../services/AppointmentService";
import "./style.css";

function PatientDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [futureAppointments, setFutureAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      const fetchAppointments = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const data = await AppointmentService.getFutureAppointmentsByPatient(
            user.id
          
          );

          // Filter for AGENDADA status and then sort
          const scheduledAppointments = (data || [])
            .filter(app => app.status === "AGENDADA")
            .sort((a, b) => new Date(a.inicio) - new Date(b.inicio));
          setFutureAppointments(scheduledAppointments);

          
        } catch (err) {
          console.error("Erro ao buscar agendamentos no dashboard:", err);
          setError(
            "Não foi possível carregar seus próximos agendamentos. Tente novamente mais tarde."
          );
          setFutureAppointments([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchAppointments();
    } else {
      setIsLoading(false);
      setFutureAppointments([]);
    }
  }, [user]);

  const formatDateTime = (isoString) => {
    if (!isoString) return { date: "Data inválida", time: "Hora inválida" };
    try {
      const dateObj = new Date(isoString);
      if (isNaN(dateObj.getTime())) {
        return { date: "Data inválida", time: "Hora inválida" };
      }
      const date = dateObj.toLocaleDateString("pt-BR", { timeZone: "UTC" });
      const time = dateObj.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
      });
      return { date, time };
    } catch (e) {
      console.error("Erro ao formatar data:", e, "Valor original:", isoString);
      return { date: "Erro na data", time: "Erro na hora" };
    }
  };

  return (
    <div className="dashboard-bg">
      <Header />
      <main className="patient-dashboard-container" role="main">
        <h2 className="dashboard-title">
          Bem-vindo, {user?.nome?.split(" ")[0] || "Paciente"}!
        </h2>
        <h3 className="dashboard-section-title">Próximos Agendamentos</h3>

        {isLoading && (
          <div className="dashboard-loading">
            <FaSpinner className="fa-spin" size={32} />
            <p>Carregando seus agendamentos...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="dashboard-empty dashboard-error">
            <FaCalendarAlt size={48} aria-hidden="true" />
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && futureAppointments.length === 0 && (
          <div className="dashboard-empty">
            <FaCalendarAlt size={48} aria-hidden="true" />
            <p>
              Você ainda não tem consultas futuras agendadas.
              <br />
              Que tal agendar a primeira agora?
            </p>
          </div>
        )}

        {!isLoading && !error && futureAppointments.length > 0 && (
          <ul className="dashboard-appointments-list">
            {futureAppointments.map((a) => {
              const { date, time } = formatDateTime(a.inicio);
              return (
                <li className="dashboard-appointment-item" key={a.id}>
                  <FaCalendarAlt
                    className="dashboard-appointment-icon"
                    aria-hidden="true"
                  />
                  <span>
                    {date} {time} - {a.medico?.nome || "Médico não informado"}
                  </span>
                  {/* O link de detalhes pode levar para uma página específica da consulta */}
                  {/* Por enquanto, vamos manter simples ou remover se não houver página de detalhes */}
                  <Link
                    className="dashboard-action-link"
                    to={`/appointment-details/${a.id}`}
                  >
                    Detalhes
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        <div className="dashboard-actions">
          <Button
            background="#3b9b96"
            hoverBackground="#2d7a75"
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
      <Footer />
    </div>
  );
}

export default PatientDashboard;
