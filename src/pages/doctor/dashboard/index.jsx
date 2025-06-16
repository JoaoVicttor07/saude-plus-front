import "./style.css"
import { FaCalendarAlt, FaClock, FaUser, FaChevronRight } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import ConsultationDetails from "../../../components/ConsultationDetails";
import CancelModal from "../../../components/CancelModal";
import Header from "../../../components/header"
import Footer from "../../../components/footer";

export default function DoctorCalendar() {
  const navigate = useNavigate();

  // Consultas como estado
  const [consultas, setConsultas] = useState([
    {
      data: "22/05/2025",
      hora: "14:00",
      paciente: "Maria Oliveira",
      tipo: "Consulta de rotina",
      status: "Confirmada",
      phone: "(11) 99999-9999",
      insurance: "Unimed",
      symptoms: "Consulta de rotina",
    },
    {
      data: "22/05/2025",
      hora: "15:30",
      paciente: "João Santos",
      tipo: "Retorno",
      status: "Confirmada",
      phone: "(11) 88888-8888",
      insurance: "Bradesco Saúde",
      symptoms: "Retorno",
    },
    {
      data: "23/05/2025",
      hora: "09:00",
      paciente: "Ana Silva",
      tipo: "Primeira consulta",
      status: "Confirmada",
      phone: "(11) 77777-7777",
      insurance: "SulAmérica",
      symptoms: "Primeira consulta",
    },
    {
      data: "24/05/2025",
      hora: "10:00",
      paciente: "Pedro Oliveira",
      tipo: "Consulta preventiva",
      status: "Pendente",
      phone: "(11) 66666-6666",
      insurance: "Amil",
      symptoms: "Consulta preventiva",
    },
    {
      data: "25/05/2025",
      hora: "11:00",
      paciente: "Carla Mendes",
      tipo: "Acompanhamento",
      status: "Confirmada",
      phone: "(11) 55555-5555",
      insurance: "Porto Seguro",
      symptoms: "Acompanhamento pós-cirúrgico",
    },
    {
      data: "25/05/2025",
      hora: "13:00",
      paciente: "Lucas Lima",
      tipo: "Retorno",
      status: "Confirmada",
      phone: "(11) 44444-4444",
      insurance: "Unimed",
      symptoms: "Consulta de retorno",
    },
    {
      data: "26/05/2025",
      hora: "14:30",
      paciente: "Fernanda Souza",
      tipo: "Exame",
      status: "Pendente",
      phone: "(11) 33333-3333",
      insurance: "Bradesco Saúde",
      symptoms: "Exame de rotina",
    },
    {
      data: "27/05/2025",
      hora: "16:00",
      paciente: "Rafael Torres",
      tipo: "Pediatria",
      status: "Confirmada",
      phone: "(11) 22222-2222",
      insurance: "SulAmérica",
      symptoms: "Consulta pediátrica",
    },
    {
      data: "28/05/2025",
      hora: "17:30",
      paciente: "Juliana Alves",
      tipo: "Nutrição",
      status: "Confirmada",
      phone: "(11) 11111-1111",
      insurance: "Amil",
      symptoms: "Acompanhamento nutricional",
    },
    {
      data: "29/05/2025",
      hora: "19:00",
      paciente: "Bruno Martins",
      tipo: "Ortopedia",
      status: "Confirmada",
      phone: "(11) 00000-0000",
      insurance: "Porto Seguro",
      symptoms: "Consulta ortopédica",
    },
  ]);

  // Estado para mostrar todas as consultas
  const [showAll, setShowAll] = useState(false);

  // Estado para detalhes
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Estado para cancelamento
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Função para abrir detalhes (busca sempre a consulta atualizada)
  const handleDetailClick = (consulta) => {
    const consultaAtualizada = consultas.find(
      (c) =>
        c.data === consulta.data &&
        c.hora === consulta.hora &&
        c.paciente === consulta.paciente
    );

    setSelectedConsultation({
      ...consultaAtualizada,
      date: consultaAtualizada.data
        ? new Date(consultaAtualizada.data.split("/").reverse().join("-"))
        : null,
      time: consultaAtualizada.hora,
      patientName: consultaAtualizada.paciente,
      status: consultaAtualizada.status || "Confirmada",
      phone: consultaAtualizada.phone || "",
      insurance: consultaAtualizada.insurance || "",
      symptoms: consultaAtualizada.symptoms || consultaAtualizada.tipo || "",
      cancelReason: consultaAtualizada.cancelReason || "",
    });
    setShowDetails(true);
  };

  // Função para fechar detalhes
  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedConsultation(null);
  };

  // Função para abrir modal de cancelamento
  const handleCancelClick = () => {
    setShowCancelModal(true);
    setShowDetails(false);
  };

  // Função para fechar modal de cancelamento
  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
    setSelectedConsultation(null);
  };

  // Função para confirmar cancelamento
  const handleConfirmCancel = (reason) => {
    // Atualiza o array de consultas
    setConsultas((prev) =>
      prev.map((c) =>
        c.data === selectedConsultation.data &&
        c.hora === selectedConsultation.time &&
        c.paciente === selectedConsultation.patientName
          ? { ...c, status: "Cancelada", cancelReason: reason }
          : c
      )
    );
    // Atualiza o detalhe selecionado também
    setSelectedConsultation((prev) => ({
      ...prev,
      status: "Cancelada",
      cancelReason: reason,
    }));
    setShowCancelModal(false);
    setShowDetails(true);
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <Header/>

      {/* Main Content */}
      <div className="main-content">
        <div className="card">
          {/* Welcome Message */}
          <h2 className="welcome-title">Bem-vindo, Doutor!</h2>

          {/* Upcoming Appointments */}
          <div className="appointments-section">
            <h3 className="section-title">Próximas Consultas</h3>

            <div
              className="appointments-list"
              style={
                showAll
                  ? { maxHeight: 320, overflowY: "auto", transition: "max-height 0.3s" }
                  : {}
              }
            >
              {(showAll ? consultas : consultas.slice(0, 3)).map((consulta, index) => (
                <div key={index} className="appointment-item">
                  <div className="appointment-info">
                    <div className="appointment-icon">
                      <FaCalendarAlt />
                    </div>
                    <div className="appointment-details">
                      <div className="appointment-datetime">
                        <span className="appointment-date">{consulta.data}</span>
                        <FaClock className="clock-icon" />
                        <span className="appointment-time">{consulta.hora}</span>
                      </div>
                      <div className="appointment-patient">
                        {consulta.paciente} - {consulta.tipo}
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
              ))}
            </div>

            {!showAll && consultas.length > 3 && (
              <div className="view-all">
                <button className="btn-view-all" onClick={() => setShowAll(true)}>
                  Ver mais consultas
                  <FaChevronRight className="chevron-icon" />
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              className="btn-action"
              onClick={() => navigate("/doctor/calendar")}
            >
              <FaCalendarAlt className="btn-icon" />
              Ver Calendário de Consultas
            </button>

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

      {/* Detalhes da Consulta (Mini Tela) */}
      {showDetails && selectedConsultation && (
        <ConsultationDetails
          consultation={selectedConsultation}
          onClose={handleCloseDetails}
          onCancelClick={handleCancelClick}
        />
      )}

      {/* Modal de Cancelamento */}
      {showCancelModal && selectedConsultation && (
        <CancelModal
          consultation={selectedConsultation}
          onClose={handleCloseCancelModal}
          onConfirm={handleConfirmCancel}
        />
      )}

      {/* Footer */}
      <Footer/>
    </div>
  );
}