import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaSpinner, FaExclamationCircle, FaCalendarAlt } from "react-icons/fa";
import Header from "../../../components/header";
import Button from "../../../components/Button";
import Footer from "../../../components/footer";
import AppointmentService from "../../../services/AppointmentService";
import "./style.css";

const formatDateTime = (isoString) => {
  if (!isoString) return { date: "N/A", time: "N/A" };
  try {
    const dateObj = new Date(isoString);
    if (isNaN(dateObj.getTime())) return { date: "Inválida", time: "Inválida" };
    const date = dateObj.toLocaleDateString("pt-BR", { timeZone: "UTC" });
    const time = dateObj.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
    return { date, time };
  } catch (e) {
    return { date: "Erro", time: "Erro" };
  }
};

function AppointmentDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [consulta, setConsulta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCanceling, setIsCanceling] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchAppointmentDetail = async () => {
        setIsLoading(true);
        setError(null);
        setCancelSuccess(false); // Resetar mensagem de sucesso ao carregar
        try {
          const data = await AppointmentService.getAppointmentById(id);
          setConsulta(data);
        } catch (err) {
          console.error("Erro ao buscar detalhes da consulta:", err);
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
  }, [id]); // Re-fetch se o ID mudar

  const handleDesmarcarConsulta = async () => {
    if (!consulta || consulta.status !== "AGENDADA") return;


    const confirmDesmarcar = window.confirm(
      "Tem certeza que deseja desmarcar esta consulta?"
    );

    if (confirmDesmarcar) {
      setIsCanceling(true);
      setError(null);
      try {
        const updatedConsulta = await AppointmentService.unmarkAppointmentByPatient(consulta.id);
        setConsulta(updatedConsulta);
        setCancelSuccess(true);
      } catch (err) {
        console.error("Erro ao desmarcar consulta:", err);
        setError(err.response?.data?.message || "Falha ao desmarcar a consulta. Tente novamente.");
        setCancelSuccess(false);
      } finally {
        setIsCanceling(false);
      }
    }
  };

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
    // Mostrar erro apenas se a consulta não pôde ser carregada
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
            <Button onClick={() => navigate("/dashboard")}>
              Voltar ao Dashboard
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!consulta) {
    // Caso de ID inválido ou não encontrado após o loading
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
            <Button onClick={() => navigate("/dashboard")}>
              Voltar ao Dashboard
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { date: formattedDate, time: formattedTime } = formatDateTime(consulta.inicio);
  const podeCancelar = consulta.status === "AGENDADA";

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
            <span className="label">Médico:</span>
            <span>{consulta.medico?.nome || "N/A"}</span>
          </div>
          <div className="appointment-detail-row">
            <span className="label">Especialidade:</span>
            <span>{consulta.medico?.especialidade?.nome || "N/A"}</span>
          </div>
          <div className="appointment-detail-row">
            <span className="label">Local:</span>
            <span>{consulta.medico?.clinica?.nomeFantasia || "N/A"}</span>
          </div>
          {/* {consulta.medico?.clinica?.endereco && (
            <div className="appointment-detail-row">
              <span className="label">Endereço da Clínica:</span>
              <span>
                {`${consulta.medico.clinica.endereco.logradouro}, ${consulta.medico.clinica.endereco.numero} - ${consulta.medico.clinica.endereco.bairro}, ${consulta.medico.clinica.endereco.cidade} - ${consulta.medico.clinica.endereco.estado}, CEP: ${consulta.medico.clinica.endereco.cep}`}
              </span>
            </div>
          )} */}
          <div className="appointment-detail-row">
            <span className="label">Status:</span>
            <span
              className={`status-label status-${consulta.status?.toLowerCase()}`}
            >
              {consulta.status || "N/A"}
            </span>
          </div>
          {/* {consulta.diagnostico && (
            <div className="appointment-detail-row">
              <span className="label">Motivo/Diagnóstico:</span>
              <span>{consulta.diagnostico}</span>
            </div>
          )} */}
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
          {/* Exibir erro específico do cancelamento, se houver */}
          {error && isCanceling && (
            <p
              className="error-message"
              style={{ color: "#b00", marginTop: "10px" }}
            >
              {error}
            </p>
          )}

          {cancelSuccess && (
            <div
              className="success-message"
              style={{ color: "green", textAlign: "center", margin: "15px 0" }}
            >
              Consulta cancelada com sucesso!
            </div>
          )}
        </div>
        <div className="dashboard-actions">
          {podeCancelar && !cancelSuccess && (
            <Button
              color="#b00"
              fontWeight={600}
              hoverBackground="#ffcccc"
              hoverColor="#900"
              background="#ffeaea"
              border="1px solid #b00"
              height="45px"
              onClick={handleDesmarcarConsulta}
              disabled={isCanceling}
              style={{ marginBottom: "15px" }}
            >
              {isCanceling ? (
                <FaSpinner className="fa-spin" />
              ) : (
                "Cancelar consulta"
              )}
            </Button>
          )}

          <Button
            background="#fff"
            color="#2c7a7b"
            fontWeight={600}
            hoverBackground="#F0F8F8"
            border="2px solid #2c7a7b"
            height="45px"
            onClick={() => navigate("/dashboard")}
          >
            Voltar ao Dashboard
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AppointmentDetail;
