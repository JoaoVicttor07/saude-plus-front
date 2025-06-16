import { useState, useEffect } from "react";
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
import ConsultaService from "../../../services/ConsultaService";
import "./style.css";

export default function ViewAppointments() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const statusMap = {
    AGENDADA: "pending",
    REALIZADA: "completed",
    DESMARCADA: "cancelled",
  };

  useEffect(() => {
    async function fetchAppointments() {
      setIsLoading(true);
      try {
        const data = await ConsultaService.listarTodas();
        // Adapta os campos para o formato esperado pelo componente
        const mapped = data.map((c) => ({
          id: c.id,
          date: c.inicio?.split("T")[0] || "",
          time: c.inicio?.split("T")[1]?.slice(0, 5) || "",
          patient: c.paciente?.nome || "-",
          doctor: c.medico?.nome || "-",
          specialty: c.medico?.especialidade?.nome || "-",
          location: c.local || "-",
          status: statusMap[c.status] || "pending",
          phone: c.paciente?.telefone || "-",
        }));
        setAppointments(mapped);
      } catch (e) {
        setAppointments([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter((appointment) => {
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
    if (!dateString) return "-";
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
