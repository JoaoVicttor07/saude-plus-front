import { useState } from "react"
import Calendar from "../../../components/Calendar"
import CancelModal from "../../../components/CancelModal"
import Header from "../../../components/header";
import ConsultationDetails from "../../../components/ConsultationDetails"
import ConsultationList from "../../../components/ConsultationList"
import { useNavigate } from "react-router-dom";
import "./style.css"

// Exemplo de mockConsultations para o calendário do médico

const mockConsultations = [
  // 20 agendamentos distribuídos pelo mês de junho de 2025
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    date: new Date(2025, 5, (i % 28) + 1), // Dias de 1 a 28 de junho
    time: `${String(8 + (i % 10)).padStart(2, "0")}:00`,
    patientName: `Paciente ${i + 1}`,
    status: i % 3 === 0 ? "Confirmada" : i % 3 === 1 ? "Pendente" : "Cancelada",
    phone: `(84) 9${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
    insurance: "Unimed",
    symptoms: "Consulta de rotina",
  })),
  // 6 agendamentos para o dia 15 de junho de 2025
  ...Array.from({ length: 6 }, (_, i) => ({
    id: 100 + i,
    date: new Date(2025, 5, 15),
    time: `${String(9 + i)}:30`,
    patientName: `Paciente Especial ${i + 1}`,
    status: "Confirmada",
    phone: `(84) 9${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
    insurance: "Bradesco Saúde",
    symptoms: "Consulta especial",
  })),
];

const CalendarPage = () => {
  const [selectedDay, setSelectedDay] = useState(null)
  const [consultations, setConsultations] = useState(mockConsultations)
  const [selectedConsultation, setSelectedConsultation] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const navigate = useNavigate(); 
  const [showCancelModal, setCancelModal] = useState(false)

  const handleDaySelect = (date) => setSelectedDay(date)

  const getConsultationsForDay = (date) => {
    if (!date) return []
    return consultations.filter((consultation) =>
      consultation.date.toDateString() === date.toDateString()
    )
  }

  const handleDetailClick = (consultation) => {
    // Busca a consulta atualizada pelo id para garantir motivo/status atualizados
    const updated = consultations.find(c => c.id === consultation.id);
    setSelectedConsultation(updated);
    setShowDetails(true);
  }

  const handleCloseDetails = () => {
    setShowDetails(false)
    setSelectedConsultation(null)
  }

  const handleCancelClick = (consultation) => {
    setSelectedConsultation(consultation)
    setShowDetails(false)
    setCancelModal(true)
  }

  const handleCloseCancelModal = () => {
    setCancelModal(false)
    setSelectedConsultation(null)
  }

  const handleConfirmCancel = (consultationId, reason) => {
    setConsultations((prev) =>
      prev.map((consultation) =>
        consultation.id === consultationId
          ? { ...consultation, status: "Cancelada", cancelReason: reason }
          : consultation
      )
    )
    setCancelModal(false)
    setSelectedConsultation(null)
    alert("Consulta cancelada com sucesso!")
  }
  
  const dayConsultations = getConsultationsForDay(selectedDay)
  const isCalendarShifted = selectedDay !== null

  return (
    <div className="calendar-page">
      <Header />
      <div className="calendar-page-header">
        <h1>Calendário de Consultas</h1>
      </div>

      <div className="calendar-content">
        <Calendar
          onDaySelect={handleDaySelect}
          selectedDay={selectedDay}
          isShifted={isCalendarShifted}
          consultationDays={consultations.map(c => c.date.toDateString())}
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

      {/* Botão Voltar alinhado à direita */}
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", margin: "32px 0 0 0" }}>
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
      <footer className="footer" style={{ textAlign: "center", color:"#fff",
        marginTop: 32 }}>
        Saúde+ © 2025 - Todos os direitos reservados
      </footer>
    </div>
  )
}

export default CalendarPage