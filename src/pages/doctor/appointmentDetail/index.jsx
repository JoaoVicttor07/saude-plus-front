import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSpinner, FaExclamationCircle, FaCalendarAlt } from "react-icons/fa";
import Header from "../../../components/header";
import Button from "../../../components/Button";
import Footer from "../../../components/footer";
import ConsultaService from "../../../services/ConsultaService";
import "../../patient/appointmentDetail/style.css";

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
    return { date: "Erro na data", time: "Erro na hora" };
  }
};

function DoctorAppointmentDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [consulta, setConsulta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchAppointmentDetail = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const data = await ConsultaService.buscarPorId(id);
          setConsulta(data);
        } catch (err) {
          setError("Não foi possível carregar os detalhes desta consulta.");
          setConsulta(null);
        } finally {
          setIsLoading(false);
        }
      };
      fetchAppointmentDetail();
    } else {
      setError("ID da consulta não fornecido.");
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="dashboard-bg">
        <Header />
        <main
          className="patient-dashboard-container loading-container"
          role="main"
        >
          <FaSpinner className="fa-spin" size={48} />
          <p>Carregando detalhes da consulta...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error && !consulta) {
    return (
      <div className="dashboard-bg">
        <Header />
        <main
          className="patient-dashboard-container error-container"
          role="main"
        >
          <FaExclamationCircle size={48} style={{ color: "#b00" }} />
          <h2 className="dashboard-title">Erro ao Carregar Consulta</h2>
          <p>{error}</p>
          <div className="dashboard-actions">
            <Button onClick={() => navigate("/doctor/appointments")}>
              Voltar ao Histórico
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!consulta) {
    return (
      <div className="dashboard-bg">
        <Header />
        <main className="patient-dashboard-container" role="main">
          <h2 className="dashboard-title">Consulta não encontrada</h2>
          <div className="dashboard-empty">
            <FaCalendarAlt size={48} />
            <p>
              Não foi possível localizar os detalhes para a consulta com ID:{" "}
              {id}.
            </p>
          </div>
          <div className="dashboard-actions">
            <Button onClick={() => navigate("/doctor/appointments")}>
              Voltar ao Histórico
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { date: formattedDate, time: formattedTime } = formatDateTime(
    consulta.inicio
  );

  return (
    <div className="dashboard-bg">
      <Header />
      <main className="patient-dashboard-container" role="main">
        <h2 className="dashboard-title">Detalhes da Consulta</h2>
        <div className="appointment-detail-card">
          <div className="appointment-detail-row">
            <span className="label">Data:</span>
            <span>{formattedDate}</span>
          </div>
          <div className="appointment-detail-row">
            <span className="label">Horário:</span>
            <span>{formattedTime}</span>
          </div>
          <div className="appointment-detail-row">
            <span className="label">Paciente:</span>
            <span>{consulta.paciente?.nome || "N/A"}</span>
          </div>
          <div className="appointment-detail-row">
            <span className="label">Especialidade:</span>
            <span>{consulta.medico?.especialidade?.nome || "N/A"}</span>
          </div>
          <div className="appointment-detail-row">
            <span className="label">Status:</span>
            <span
              className={`status-label status-${consulta.status?.toLowerCase()}`}
            >
              {consulta.status || "N/A"}
            </span>
          </div>
          {consulta.observacao && (
            <div className="appointment-detail-row">
              <span className="label">Observações/Motivo Cancel.:</span>
              <span
                style={{
                  color: consulta.status === "CANCELADA" ? "#b00" : "inherit",
                }}
              >
                {consulta.observacao}
              </span>
            </div>
          )}
        </div>
        <div className="dashboard-actions">
          <Button
            background="#fff"
            color="#2c7a7b"
            fontWeight={600}
            hoverBackground="#F0F8F8"
            border="2px solid #2c7a7b"
            height="45px"
            onClick={() => navigate("/doctor/appointments")}
          >
            Voltar ao Histórico
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default DoctorAppointmentDetail;
