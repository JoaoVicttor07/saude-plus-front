import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Calendar,
  User,
  Stethoscope,
  Clock,
  MapPin,
  Eye,
  RotateCcw,
  X,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Button from "../../../components/Button";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import "./style.css";

const mockAppointments = [
  {
    id: "1",
    date: "2025-06-10",
    time: "14:00",
    patient: "Ana Souza",
    doctor: "Dr. João Silva",
    specialty: "Cardiologia",
    location: "Clínica Central",
    status: "pending",

    phone: "(11) 98765-4321",
  },
  {
    id: "2",
    date: "2025-06-09",
    time: "10:30",
    patient: "Carlos Mendes",
    doctor: "Dr. Maria Santos",
    specialty: "Dermatologia",
    location: "Clínica Norte",
    status: "pending",

    phone: "(11) 99876-5432",
  },
  {
    id: "3",
    date: "2025-06-08",
    time: "16:00",
    patient: "Lucia Oliveira",
    doctor: "Dr. Pedro Costa",
    specialty: "Ortopedia",
    location: "Clínica Sul",
    status: "completed",

    phone: "(11) 97654-3210",
  },
  {
    id: "4",
    date: "2025-06-07",
    time: "09:00",
    patient: "Roberto Silva",
    doctor: "Dr. Ana Lima",
    specialty: "Neurologia",
    location: "Clínica Central",
    status: "completed",

    phone: "(11) 96543-2109",
  },
  {
    id: "5",
    date: "2025-06-06",
    time: "11:30",
    patient: "Fernanda Costa",
    doctor: "Dr. João Silva",
    specialty: "Cardiologia",
    location: "Clínica Norte",
    status: "cancelled",

    phone: "(11) 95432-1098",
  },
  {
    id: "6",
    date: "2025-06-05",
    time: "15:45",
    patient: "Marcos Pereira",
    doctor: "Dr. Maria Santos",
    specialty: "Dermatologia",
    location: "Clínica Sul",
    status: "cancelled",

    phone: "(11) 94321-0987",
  },
];

export default function ViewAppointments() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const filteredAppointments = mockAppointments.filter((appointment) => {
    const matchesTab = appointment.status === activeTab;
    const matchesSearch =
      searchTerm === "" ||
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="appt-status-icon appt-pending" />;
      case "completed":
        return <CheckCircle className="appt-status-icon appt-completed" />;
      case "cancelled":
        return <XCircle className="appt-status-icon appt-cancelled" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pendente";
      case "completed":
        return "Realizada";
      case "cancelled":
        return "Cancelada";
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const AppointmentCard = ({ appointment }) => (
    <div className="appt-appointment-card">
      <div className="appt-appointment-header">
        <div className="appt-appointment-datetime">
          <Calendar className="appt-datetime-icon" />
          <span className="appt-datetime-text">
            {formatDate(appointment.date)} às {appointment.time}
          </span>
        </div>
        <div className="appt-appointment-status">
          {getStatusIcon(appointment.status)}
          <span className={`appt-status-text appt-${appointment.status}`}>
            {getStatusText(appointment.status)}
          </span>
        </div>
      </div>

      <div className="appt-appointment-details">
        <div className="appt-detail-row">
          <User className="appt-detail-icon" />
          <span className="appt-detail-label">Paciente:</span>
          <span className="appt-detail-value">{appointment.patient}</span>
        </div>
        <div className="appt-detail-row">
          <Stethoscope className="appt-detail-icon" />
          <span className="appt-detail-label">Médico:</span>
          <span className="appt-detail-value">{appointment.doctor}</span>
        </div>
        <div className="appt-detail-row">
          <span className="appt-detail-label">Especialidade:</span>
          <span className="appt-detail-value">{appointment.specialty}</span>
        </div>
        <div className="appt-detail-row">
          <MapPin className="appt-detail-icon" />
          <span className="appt-detail-label">Local:</span>
          <span className="appt-detail-value">{appointment.location}</span>
        </div>
      </div>

      <div className="appt-appointment-actions">
        <Button
          background="#fff"
          color="#4ecdc4"
          fontWeight={600}
          hoverBackground="#e6f9f8"
          border="1px solid #4ecdc4"
          borderRadius="0.375rem"
          icon={<Eye size={15} />}
          style={{ padding: "0.8rem 1rem" }}
          onClick={() => setSelectedAppointment(appointment)}
        >
          Ver Detalhes
        </Button>

        {appointment.status === "pending" && (
          <>
            <Button
              fontWeight={600}
              background="#ffc107"
              hoverBackground="#e0a800"
              borderRadius="0.375rem"
              style={{ padding: "0.8rem 1rem" }}
              icon={<RotateCcw size={15} />}
            >
              Reagendar
            </Button>

            <Button
              fontWeight={600}
              background="#dc3545"
              hoverBackground="#c82333"
              borderRadius="0.375rem"
              icon={<X size={15} />}
              style={{ padding: "0.8rem 1rem" }}
            >
              Cancelar
            </Button>
          </>
        )}
      </div>
    </div>
  );

  const AppointmentModal = ({ appointment, onClose }) => {
    if (!appointment) return null;

    return (
      <div className="appt-modal-overlay" onClick={onClose}>
        <div
          className="appt-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="appt-modal-header">
            <h3>Detalhes da Consulta</h3>
            <button className="appt-modal-close" onClick={onClose}>
              <X />
            </button>
          </div>

          <div className="appt-modal-body">
            <div className="appt-modal-section">
              <h4>Informações Gerais</h4>
              <div className="appt-modal-details">
                <div className="appt-modal-row">
                  <span className="appt-modal-label">Data:</span>
                  <span className="appt-modal-value">
                    {formatDate(appointment.date)}
                  </span>
                </div>
                <div className="appt-modal-row">
                  <span className="appt-modal-label">Horário:</span>
                  <span className="appt-modal-value">{appointment.time}</span>
                </div>
                <div className="appt-modal-row">
                  <span className="appt-modal-label">Status:</span>
                  <span
                    className={`appt-modal-value appt-status-badge appt-${appointment.status}`}
                  >
                    {getStatusText(appointment.status)}
                  </span>
                </div>
              </div>
            </div>

            <div className="appt-modal-section">
              <h4>Paciente</h4>
              <div className="appt-modal-details">
                <div className="appt-modal-row">
                  <span className="appt-modal-label">Nome:</span>
                  <span className="appt-modal-value">
                    {appointment.patient}
                  </span>
                </div>
                <div className="appt-modal-row">
                  <span className="appt-modal-label">Telefone:</span>
                  <span className="appt-modal-value">{appointment.phone}</span>
                </div>
              </div>
            </div>

            <div className="appt-modal-section">
              <h4>Médico</h4>
              <div className="appt-modal-details">
                <div className="appt-modal-row">
                  <span className="appt-modal-label">Nome:</span>
                  <span className="appt-modal-value">{appointment.doctor}</span>
                </div>
                <div className="appt-modal-row">
                  <span className="appt-modal-label">Especialidade:</span>
                  <span className="appt-modal-value">
                    {appointment.specialty}
                  </span>
                </div>
                <div className="appt-modal-row">
                  <span className="appt-modal-label">Local:</span>
                  <span className="appt-modal-value">
                    {appointment.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="appt-modal-footer">
            {appointment.status === "pending" && (
              <>
                <Button
                  fontWeight={600}
                  background="#ffc107"
                  hoverBackground="#e0a800"
                  borderRadius="0.375rem"
                  style={{ padding: "0.8rem 1rem" }}
                  icon={<RotateCcw size={15} />}
                >
                  Reagendar
                </Button>

                <Button
                  fontWeight={600}
                  background="#dc3545"
                  hoverBackground="#c82333"
                  borderRadius="0.375rem"
                  icon={<X size={15} />}
                  style={{ padding: "0.8rem 1rem" }}
                >
                  Cancelar
                </Button>
              </>
            )}

            <Button
              background="#fff"
              hoverBackground="#e6f9f8"
              color="#4ecdc4"
              border="1px solid #4ecdc4"
              style={{ padding: "0.8rem 1rem" }}
              onClick={onClose}
            >
              Fechar
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="appt-container">
      {/* Header */}
      <Header />

      <div className="appt-main-content">
        {/* Page Title and Navigation */}
        <div className="appt-page-header">
          <Button
            background="#fff"
            color="#374151"
            hoverBackground="#f8f9fa"
            fontWeight={600}
            icon={<ArrowLeft size={15} />}
            borderRadius="0.375rem"
            style={{ padding: "0.7rem 1rem" }}
            onClick={() => navigate(-1)}
          >
            Voltar ao Dashboard
          </Button>

          <h2 className="appt-page-title">Gerenciamento de Consultas</h2>
        </div>

        {/* Tabs */}
        <div className="appt-tabs-container">
          <div className="appt-tabs-header">
            <button
              className={`appt-tab-button ${
                activeTab === "pending" ? "active" : ""
              }`}
              onClick={() => setActiveTab("pending")}
            >
              Pendentes
            </button>
            <button
              className={`appt-tab-button ${
                activeTab === "completed" ? "active" : ""
              }`}
              onClick={() => setActiveTab("completed")}
            >
              Realizadas
            </button>
            <button
              className={`appt-tab-button ${
                activeTab === "cancelled" ? "active" : ""
              }`}
              onClick={() => setActiveTab("cancelled")}
            >
              Canceladas
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="appt-search-container">
          <div className="appt-search-bar">
            <Search className="appt-search-icon" />
            <input
              type="text"
              placeholder="Buscar por paciente ou médico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="appt-search-input"
            />
          </div>
        </div>

        {/* Appointments List */}
        <div className="appt-appointments-list">
          {filteredAppointments.length === 0 ? (
            <div className="appt-empty-state">
              <Calendar className="appt-empty-icon" />
              <h3>Nenhuma consulta encontrada</h3>
              <p>
                {searchTerm
                  ? "Tente ajustar os termos de busca"
                  : `Não há consultas ${getStatusText(
                      activeTab
                    ).toLowerCase()} no momento`}
              </p>
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Modal */}
      <AppointmentModal
        appointment={selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
      />
    </div>
  );
}
