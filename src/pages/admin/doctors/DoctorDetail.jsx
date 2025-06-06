import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Phone,
  MapPin,
  User,
  CreditCard,
  Stethoscope,
  Eye,
  RotateCcw,
  X,
} from "lucide-react";
import Header from "../../../components/header";
import Button from "../../../components/Button";
import Footer from "../../../components/footer";
import "./DoctorDetail.css";

const mockDoctor = {
  id: "1",
  name: "Dr. João Almeida",
  crm: "123456-SP",
  specialty: "Cardiologia",
  phone: "(11) 91234-5678",
  address: "Não sei o que vai ser aqui, 123 - Cafundó do Judas/BA",
  status: "Inactive",
  registrationDate: "10/01/2024",
};

const mockAppointments = [
  {
    id: "1",
    date: "12/06/2025",
    time: "14:00",
    patient: "Ana Paula Souza",
    location: "Clínica Central",
    status: "pending",
  },
  {
    id: "2",
    date: "11/06/2025",
    time: "10:30",
    patient: "Carlos Silva",
    location: "Clínica Norte",
    status: "completed",
  },
  {
    id: "3",
    date: "10/06/2025",
    time: "16:00",
    patient: "Maria Santos",
    location: "Clínica Sul",
    status: "cancelled",
  },
];

export default function DoctorDetails() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pending");

  const pendingAppointments = mockAppointments.filter(
    (apt) => apt.status === "pending"
  );
  const completedAppointments = mockAppointments.filter(
    (apt) => apt.status === "completed"
  );
  const cancelledAppointments = mockAppointments.filter(
    (apt) => apt.status === "cancelled"
  );

  const getStatusBadge = (status) => {
    const className =
      status === "active"
        ? "status-badge status-active"
        : "status-badge status-inactive";
    const text = status === "active" ? "Ativo" : "Inativo";
    return <span className={className}>{text}</span>;
  };

  const AppointmentTable = ({ appointments }) => (
    <div className="table-container">
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Horário</th>
            <th>Paciente</th>
            <th>Localidade</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.patient}</td>
              <td>{appointment.location}</td>
              <td>
                <div className="action-buttons">
                  <Button
                  background="#fff"
                  hoverBackground="#e6f9f8"
                  color="#4ecdc4"
                  border="1px solid #4ecdc4"
                  fontSize="0.75rem"
                  icon={<Eye size={15}/>}
                  style={{padding: "0.5rem 1rem"}}
                  >
                    Ver detalhes
                    </Button>
                  {appointment.status === "pending" && (
                    <>
                      <Button
                      background="#ffc107"
                      fontSize="0.75rem"
                      hoverBackground="#e8a800"
                      icon={<RotateCcw size={15}/>}
                      style={{padding: "0.5rem 1rem"}}
                      >
                        Remarcar
                      </Button>

                      <Button
                      background="#dc3545"
                      hoverBackground="#c82333"
                      fontSize="0.75rem"
                      icon={<X size={15}/>}
                      style={{padding: "0.5rem 1rem"}}
                      >
                        Cancelar
                      </Button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="doctor-details-container">
      {/* Header */}
      <Header />

      <div className="main--content">
        {/* Page Title and Doctor Name */}
        <div className="page-title">
          <h2 className="subtitle">Detalhes do médico</h2>
          <h3 className="doctor-name">{mockDoctor.name}</h3>
        </div>

        {/* Action Buttons */}
        <div className="action-section">
          <Button
            background="#fff"
            color="#374151"
            fontWeight="600"
            width="150px"
            height="45px"
            borderRadius="0.375rem"
            hoverBackground="#f8f9fa"
            icon={<ArrowLeft size={15} />}
            onClick={() => navigate(-1)}
          >
            Voltar à Lista
          </Button>

          <Button
            background="#3b9b96"
            fontWeight={600}
            width="180px"
            hoverBackground="#2d7a75"
            borderRadius="0.375rem"
            icon={<Calendar size={15} />}
          >
            Agendar Consulta
          </Button>
        </div>

        {/* Doctor Details Card */}
        <div className="card">
          <div className="card-content">
            <div className="doctor-info-grid">
              <div className="info-column">
                <div className="info-item">
                  <label className="info-label">Nome:</label>
                  <p className="info-value">
                    <User className="info-icon" />
                    {mockDoctor.name}
                  </p>
                </div>
                <div className="info-item">
                  <label className="info-label">Telefone:</label>
                  <p className="info-value">
                    <Phone className="info-icon" />
                    {mockDoctor.phone}
                  </p>
                </div>
                <div className="info-item">
                  <label className="info-label">Data de Cadastro:</label>
                  <p className="info-value">
                    <Calendar className="info-icon" />
                    {mockDoctor.registrationDate}
                  </p>
                </div>
              </div>

              <div className="info-column">
                <div className="info-item">
                  <label className="info-label">CRM:</label>
                  <p className="info-value">
                    <CreditCard className="info-icon" />
                    {mockDoctor.crm}
                  </p>
                </div>
                <div className="info-item">
                  <label className="info-label">Endereço:</label>
                  <p className="info-value">
                    <MapPin className="info-icon" />
                    {mockDoctor.address}
                  </p>
                </div>
              </div>

              <div className="info-column">
                <div className="info-item">
                  <label className="info-label">Especialidade:</label>
                  <p className="info-value">
                    <Stethoscope className="info-icon" />
                    {mockDoctor.specialty}
                  </p>
                </div>
                <div className="info-item">
                  <label className="info-label">Status:</label>
                  <div className="status-container">
                    {getStatusBadge(mockDoctor.status)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="card">
          <div className="tabsContainer">
            <div className="tabs-header">
              <button
                className={`tab-button ${
                  activeTab === "pending" ? "active" : ""
                }`}
                onClick={() => setActiveTab("pending")}
              >
                Pendentes
              </button>
              <button
                className={`tab-button ${
                  activeTab === "completed" ? "active" : ""
                }`}
                onClick={() => setActiveTab("completed")}
              >
                Realizadas
              </button>
              <button
                className={`tab-button ${
                  activeTab === "cancelled" ? "active" : ""
                }`}
                onClick={() => setActiveTab("cancelled")}
              >
                Canceladas
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "pending" && (
                <AppointmentTable appointments={pendingAppointments} />
              )}
              {activeTab === "completed" && (
                <AppointmentTable appointments={completedAppointments} />
              )}
              {activeTab === "cancelled" && (
                <AppointmentTable appointments={cancelledAppointments} />
              )}
            </div>
          </div>
        </div>

        {/* Schedule New Appointment Button */}
        <div className="schedule-section">
          <Button
            background="#3b9b96"
            fontWeight={600}
            fontSize="1.1rem"
            hoverBackground="#2d7a75"
            borderRadius="0.375rem"
            icon={<Calendar size={15} />}
            style={{ padding: "1rem 2.5rem" }}
          >
            Agendar Consulta
          </Button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
