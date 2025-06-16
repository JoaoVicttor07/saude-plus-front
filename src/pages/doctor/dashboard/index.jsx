import "./style.css";
import { FaCalendarAlt, FaClock, FaUser, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ConsultationDetails from "../../../components/ConsultationDetails";
import CancelModal from "../../../components/CancelModal";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import ConsultaService from "../../../services/ConsultaService";
import { useAuth } from "../../../context/AuthContext";

export default function DoctorCalendar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAll, setShowAll] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    async function fetchConsultas() {
      setLoading(true);
      setError(null);
      try {
        if (!user?.id) throw new Error("Usuário não autenticado");
        // Passe o id do médico para o service
        const data = await ConsultaService.listarPorMedico(user.id);

        // Filtra apenas AGENDADA
        const agendadas = data.filter((c) => c.status === "AGENDADA");

        // Formate se necessário
        const formatted = agendadas.map((c) => ({
          ...c,
          dateObj: c.dataConsulta ? new Date(c.dataConsulta) : null,
          status: c.status,
          id: c.idConsulta || c.id,
          patientName: c.paciente?.nome || c.nomePaciente || "",
          time: c.horaConsulta || c.hora || "",
          phone: c.paciente?.telefone || "",
          insurance: c.planoSaude || "",
          symptoms: c.sintomas || c.tipo || "",
          cancelReason: c.motivoCancelamento || "",
        }));

        setConsultas(formatted);
      } catch (err) {
        setError("Erro ao carregar as consultas.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (user?.id) fetchConsultas();
  }, [user]);

  const handleDetailClick = (consulta) => {
    setSelectedConsultation(consulta);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedConsultation(null);
  };

  const handleCancelClick = () => {
    setShowCancelModal(true);
    setShowDetails(false);
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
    setSelectedConsultation(null);
  };

  const handleConfirmCancel = async (reason) => {
    try {
      if (!selectedConsultation?.id) throw new Error("Consulta inválida");

      await ConsultaService.desmarcar(selectedConsultation.id);

      setConsultas((prev) =>
        prev.map((c) =>
          c.id === selectedConsultation.id
            ? { ...c, status: "Cancelada", cancelReason: reason }
            : c
        )
      );

      setSelectedConsultation((prev) => ({
        ...prev,
        status: "Cancelada",
        cancelReason: reason,
      }));

      alert("Consulta cancelada com sucesso!");
    } catch (error) {
      alert("Erro ao cancelar a consulta. Tente novamente.");
      console.error(error);
    } finally {
      setShowCancelModal(false);
      setShowDetails(true);
    }
  };

  return (
    <div className="dashboard-container">
      <Header />

      <div className="main-content">
        <div className="card">
          <h2 className="welcome-title">Bem-vindo, Doutor!</h2>

          <div className="appointments-section">
            <h3 className="section-title">Próximas Consultas</h3>

            {loading && <p>Carregando consultas...</p>}
            {error && <p className="error-message">{error}</p>}

            {!loading && !error && (
              <>
                <div
                  className="appointments-list"
                  style={
                    showAll
                      ? {
                          maxHeight: 320,
                          overflowY: "auto",
                          transition: "max-height 0.3s",
                        }
                      : {}
                  }
                >
                  {(showAll ? consultas : consultas.slice(0, 3)).map(
                    (consulta, index) => (
                      <div
                        key={consulta.id || index}
                        className="appointment-item"
                      >
                        <div className="appointment-info">
                          <div className="appointment-icon">
                            <FaCalendarAlt />
                          </div>
                          <div className="appointment-details">
                            <div className="appointment-datetime">
                              <span className="appointment-date">
                                {consulta.dataConsulta || consulta.data}
                              </span>
                              <FaClock className="clock-icon" />
                              <span className="appointment-time">
                                {consulta.hora || consulta.time}
                              </span>
                            </div>
                            <div className="appointment-patient">
                              {consulta.patientName || consulta.paciente} -{" "}
                              {consulta.tipo}
                            </div>
                          </div>
                        </div>
                        <button
                          className="btn-"
                          onClick={() => handleDetailClick(consulta)}
                        >
                          Detalhes
                          <FaChevronRight className="chevron-icon" />
                        </button>
                      </div>
                    )
                  )}
                </div>

                {!showAll && consultas.length > 3 && (
                  <div className="view-all">
                    <button
                      className="btn-view-all"
                      onClick={() => setShowAll(true)}
                    >
                      Ver mais consultas
                      <FaChevronRight className="chevron-icon" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="action-buttons">
            

            <button
              className="btn-action"
              onClick={() => navigate("/doctor/profile")}
            >
              <FaUser className="btn-icon" />
              Ver Meu Perfil
            </button>
          </div>
        </div>
      </div>

      {showDetails && selectedConsultation && (
        <ConsultationDetails
          consultation={selectedConsultation}
          onClose={handleCloseDetails}
          onCancelClick={handleCancelClick}
        />
      )}

      {showCancelModal && selectedConsultation && (
        <CancelModal
          consultation={selectedConsultation}
          onClose={handleCloseCancelModal}
          onConfirm={handleConfirmCancel}
        />
      )}

      <Footer />
    </div>
  );
}
