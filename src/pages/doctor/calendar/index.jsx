import { useState, useEffect } from "react";
import Calendar from "../../../components/Calendar";
import CancelModal from "../../../components/CancelModal";
import Header from "../../../components/header";
import ConsultationDetails from "../../../components/ConsultationDetails";
import ConsultationList from "../../../components/ConsultationList";
import { useNavigate } from "react-router-dom";
import ConsultaService from "../../../services/ConsultaService";
import "./style.css";

const CalendarPage = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [consultations, setConsultations] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showCancelModal, setCancelModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsultations = async () => {
      setLoading(true);
      setError(null);
      try {
        const medicoId = "me";
        const data = await ConsultaService.listarPorMedico(medicoId);

        const formatted = data.map((c) => ({
          ...c,
          date: new Date(c.dataConsulta),
          id: c.idConsulta || c.id,
        }));

        setConsultations(formatted);
      } catch (err) {
        console.error("Erro ao carregar consultas:", err);
        setError("Erro ao carregar consultas. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  const handleDaySelect = (date) => setSelectedDay(date);

  const getConsultationsForDay = (date) => {
    if (!date) return [];
    return consultations.filter(
      (consultation) => consultation.date.toDateString() === date.toDateString()
    );
  };

  const handleDetailClick = (consultation) => {
    const updated = consultations.find((c) => c.id === consultation.id);
    setSelectedConsultation(updated);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedConsultation(null);
  };

  const handleCancelClick = (consultation) => {
    setSelectedConsultation(consultation);
    setShowDetails(false);
    setCancelModal(true);
  };

  const handleCloseCancelModal = () => {
    setCancelModal(false);
    setSelectedConsultation(null);
  };

  const handleConfirmCancel = async (consultationId, reason) => {
    try {
      await ConsultaService.desmarcar(consultationId);
      // Atualiza localmente o status para refletir cancelamento
      setConsultations((prev) =>
        prev.map((consultation) =>
          consultation.id === consultationId
            ? { ...consultation, status: "Cancelada", cancelReason: reason }
            : consultation
        )
      );
      alert("Consulta cancelada com sucesso!");
    } catch (err) {
      alert("Erro ao cancelar consulta. Tente novamente.");
      console.error(err);
    } finally {
      setCancelModal(false);
      setSelectedConsultation(null);
    }
  };

  const dayConsultations = getConsultationsForDay(selectedDay);
  const isCalendarShifted = selectedDay !== null;

  return (
    <div className="calendar-page">
      <Header />
      <div className="calendar-page-header">
        <h1>Calendário de Consultas</h1>
      </div>

      {loading && <p>Carregando consultas...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <div className="calendar-content">
            <Calendar
              onDaySelect={handleDaySelect}
              selectedDay={selectedDay}
              isShifted={isCalendarShifted}
              consultationDays={consultations.map((c) => c.date.toDateString())}
            />

            <ConsultationList
              consultations={dayConsultations}
              selectedDate={selectedDay}
              onDetailClick={handleDetailClick}
            />
          </div>

          {showDetails && selectedConsultation && (
            <ConsultationDetails
              consultation={selectedConsultation}
              onClose={handleCloseDetails}
              onCancelClick={handleCancelClick}
            />
          )}
        </>
      )}

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          margin: "32px 0 0 0",
        }}
      >
        <button
          className="btn-sair"
          style={{ minWidth: 120 }}
          onClick={() => navigate(-1)}
        >
          Voltar
        </button>
      </div>

      {showCancelModal && selectedConsultation && (
        <CancelModal
          consultation={selectedConsultation}
          onClose={handleCloseCancelModal}
          onConfirm={handleConfirmCancel}
        />
      )}

      <footer
        className="footer"
        style={{ textAlign: "center", color: "#fff", marginTop: 32 }}
      >
        Saúde+ © 2025 - Todos os direitos reservados
      </footer>
    </div>
  );
};

export default CalendarPage;