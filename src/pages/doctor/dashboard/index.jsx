import "./style.css";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaStethoscope,
  FaCheck,
  FaTimes,
  FaHistory,
} from "react-icons/fa";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import ConsultaService from "../../../services/ConsultaService";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../../components/Button";

export default function DoctorCalendar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelJustification, setCancelJustification] = useState("");
  const [cancelTarget, setCancelTarget] = useState(null);

  const openCancelModal = (consulta) => {
    setCancelTarget(consulta);
    setCancelJustification("");
    setShowCancelModal(true);
  };

  const closeCancelModal = () => {
    setShowCancelModal(false);
    setCancelTarget(null);
    setCancelJustification("");
  };

  const confirmCancel = async () => {
    if (!cancelJustification.trim()) {
      alert("Por favor, informe a justificativa.");
      return;
    }
    try {
      await ConsultaService.cancelarPorMedico(
        cancelTarget.id,
        cancelJustification
      );
      setConsultas((prev) => prev.filter((c) => c.id !== cancelTarget.id));
      closeCancelModal();
      alert("Consulta cancelada com sucesso!");
    } catch (e) {
      alert("Erro ao cancelar consulta.");
    }
  };

  useEffect(() => {
    async function fetchConsultas() {
      setLoading(true);
      setError(null);
      try {
        if (!user?.id) throw new Error("Usuário não autenticado");
        const data = await ConsultaService.listarFuturasMedico(user.id);
        const agendadas = (data || [])
          .filter((c) => c.status === "AGENDADA")
          .sort((a, b) => new Date(a.inicio) - new Date(b.inicio));
        setConsultas(agendadas);
      } catch (err) {
        setError("Erro ao carregar as consultas.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (user?.id) fetchConsultas();
  }, [user]);

  const formatDateTime = (isoString) => {
    if (!isoString) return { date: "-", time: "-" };
    try {
      const dateObj = new Date(isoString);
      if (isNaN(dateObj.getTime())) return { date: "-", time: "-" };
      const date = dateObj.toLocaleDateString("pt-BR");
      const time = dateObj.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return { date, time };
    } catch {
      return { date: "-", time: "-" };
    }
  };

  const handleDetailClick = (consulta) => {
    setSelectedConsultation(consulta);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedConsultation(null);
  };

  // const handleCancel = async (consulta) => {
  //   const justificativa = window.prompt(
  //     "Informe a justificativa do cancelamento:"
  //   );
  //   if (!justificativa) return;
  //   try {
  //     await ConsultaService.cancelarPorMedico(consulta.id, justificativa);
  //     setConsultas((prev) => prev.filter((c) => c.id !== consulta.id));
  //     alert("Consulta cancelada com sucesso!");
  //   } catch (e) {
  //     alert("Erro ao cancelar consulta.");
  //   }
  // };

  const handleMarkAsDone = async (consulta) => {
    try {
      await ConsultaService.marcarComoRealizada(consulta.id);
      setConsultas((prev) => prev.filter((c) => c.id !== consulta.id));
      alert("Consulta marcada como realizada!");
    } catch (e) {
      alert("Erro ao marcar consulta como realizada.");
    }
  };

  return (
    <div className="dashboard-container">
      <Header />
      <div className="main-content">
        <div className="card">
          <h2 className="welcome-title">Bem-vindo, Doutor!</h2>
          <h3 className="section-title">Próximos Agendamentos</h3>
          {loading && <p>Carregando consultas...</p>}
          {error && <p className="error-message">{error}</p>}
          {!loading && !error && consultas.length === 0 && (
            <div className="dashboard-empty">
              <FaCalendarAlt size={48} />
              <p>Você não possui consultas futuras agendadas.</p>
            </div>
          )}
          {!loading && !error && consultas.length > 0 && (
            <ul className="dashboard----appointments-list">
              {consultas.map((c) => {
                const { date, time } = formatDateTime(c.inicio);
                return (
                  <li className="dashboard----appointment-item" key={c.id}>
                    <div className="dashboard----appointment-info">
                      <FaCalendarAlt className="dashboard-appointment-icon" />
                      <span>
                        <b>{date}</b> <FaClock style={{ margin: "0 4px" }} />{" "}
                        <b>{time}</b>
                        {" - "}
                        <FaUser style={{ margin: "0 4px" }} />
                        {c.paciente?.nome || "-"}
                        {" - "}
                        <FaStethoscope style={{ margin: "0 4px" }} />
                        {c.medico?.especialidade?.nome ||
                          c.medico?.especialidade ||
                          "-"}
                      </span>
                    </div>
                    <div className="dashboard-appointment-actions">
                      <Button
                        background="#fff"
                        color="#3b9b96"
                        border="1px solid #3b9b96"
                        fontWeight={600}
                        width="100%"
                        hoverBackground="#e6f9f8"
                        style={{ padding: "0.5rem 1rem" }}
                        onClick={() => handleDetailClick(c)}
                      >
                        Detalhes
                      </Button>
                      <Button
                        background="#dc3545"
                        hoverBackground="#c82333"
                        color="#fff"
                        fontWeight={600}
                        width="100%"
                        style={{ padding: "0.5rem 1rem" }}
                        onClick={() => openCancelModal(c)}
                      >
                        <FaTimes /> Cancelar
                      </Button>
                      <Button
                        background="#28a745"
                        hoverBackground="#218838"
                        color="#fff"
                        fontWeight={600}
                        width="100%"
                        style={{ padding: "0.5rem 1rem" }}
                        onClick={() => handleMarkAsDone(c)}
                      >
                        <FaCheck /> Realizada
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <div className="action-buttons">
            <Button
              background="#3b9b96"
              hoverBackground="#2d7a75"
              fontWeight={600}
              onClick={() => navigate("/doctor/appointments")}
              style={{ padding: "0.90rem 1rem" }}
            >
              <FaHistory className="btn-icon" style={{ marginRight: 8 }} />
              Ver Histórico
            </Button>

            <Button
              background="#3b9b96"
              hoverBackground="#2d7a75"
              fontWeight={600}
              onClick={() => navigate("/doctor/profile")}
              style={{ padding: "0.90rem 1rem" }}
            >
              <FaUser className="btn-icon" />
              Ver Meu Perfil
            </Button>
          </div>
        </div>
      </div>
      {/**/}
      {showDetails && selectedConsultation && (
        <div className="modal-----overlay" onClick={handleCloseDetails}>
          <div
            className="modal-----content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Detalhes da Consulta</h3>
            <table className="details-----table">
              <tbody>
                <tr>
                  <td>Data:</td>
                  <td>{formatDateTime(selectedConsultation.inicio).date}</td>
                </tr>
                <tr>
                  <td>Horário:</td>
                  <td>{formatDateTime(selectedConsultation.inicio).time}</td>
                </tr>
                <tr>
                  <td>Paciente:</td>
                  <td>{selectedConsultation.paciente?.nome || "-"}</td>
                </tr>
                <tr>
                  <td>Especialidade:</td>
                  <td>
                    {selectedConsultation.medico?.especialidade?.nome || "-"}
                  </td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td>{selectedConsultation.status}</td>
                </tr>
              </tbody>
            </table>
            <div className="modal-----actions">
              <Button
                background="#fff"
                color="#3b9b96"
                border="1px solid #3b9b96"
                fontSize="1.1rem"
                fontWeight={600}
                width="100%"
                hoverBackground="#e6f9f8"
                style={{ padding: "0.9rem 1rem" }}
                onClick={handleCloseDetails}
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}

      {showCancelModal && (
        <div className="modal-----overlay" onClick={closeCancelModal}>
          <div
            className="modal-----content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 420 }}
          >
            <h3>Cancelar Consulta</h3>
            <div style={{ width: "100%", marginBottom: 18 }}>
              <label
                htmlFor="justificativa-cancelamento"
                style={{
                  fontWeight: 600,
                  color: "#0d9488",
                  display: "block",
                  marginBottom: 8,
                  fontSize: "1.08rem",
                }}
              >
                Justificativa do cancelamento:
              </label>
              <textarea
                id="justificativa-cancelamento"
                value={cancelJustification}
                onChange={(e) => setCancelJustification(e.target.value)}
                rows={4}
                style={{
                  width: "100%",
                  borderRadius: 8,
                  border: "1px solid #b2dfdb",
                  padding: 10,
                  fontSize: "1rem",
                  resize: "vertical",
                  outline: "none",
                  marginBottom: 8,
                }}
                placeholder="Descreva o motivo do cancelamento..."
                autoFocus
              />
            </div>
            <div className="modal-----actions" style={{ gap: 8 }}>
              <Button
                background="#fff"
                color="#3b9b96"
                border="1px solid #3b9b96"
                fontWeight={600}
                onClick={closeCancelModal}
                style={{ padding: "0.5rem 1rem" }}
              >
                Voltar
              </Button>
              <Button
                background="#dc3545"
                hoverBackground="#c82333"
                color="#fff"
                fontWeight={600}
                onClick={confirmCancel}
                style={{ padding: "0.5rem 1rem" }}
              >
                Confirmar Cancelamento
              </Button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
