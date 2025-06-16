import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import MedicoService from "../../../services/MedicoService";
import ConsultaService from "../../../services/ConsultaService";
// import { formatarTelefone } from "../../../utils/formatters";
import "./DoctorDetail.css";

export default function DoctorDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDoctorAndAppointments() {
      setIsLoading(true);
      try {
        const medico = await MedicoService.buscarPorId(id);
        setDoctor(medico);

        const consultas = await ConsultaService.listarPorMedico(id);
        // Mapeia status do backend para os tabs
        const statusMap = {
          AGENDADA: "pending",
          REALIZADA: "completed",
          DESMARCADA: "cancelled",
        };
        const mapped = (consultas || []).map((c) => ({
          id: c.id,
          date: c.inicio ? new Date(c.inicio).toLocaleDateString("pt-BR") : "-",
          time: c.inicio
            ? new Date(c.inicio).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-",
          patient: c.paciente?.nome || "-",
          location: c.local || "-",
          status: statusMap[c.status] || "pending",
        }));
        setAppointments(mapped);
      } catch (error) {
        setDoctor(null);
        setAppointments([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDoctorAndAppointments();
  }, [id]);

  function formatarEndereco(endereco) {
    if (!endereco || typeof endereco !== "object") return "-";
    const { logradouro, numero, bairro, cidade, estado, cep } = endereco;
    return [
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
      cep ? `CEP: ${cep}` : null,
    ]
      .filter(Boolean)
      .join(", ");
  }

  const pendingAppointments = appointments.filter(
    (apt) => apt.status === "pending"
  );
  const completedAppointments = appointments.filter(
    (apt) => apt.status === "completed"
  );
  const cancelledAppointments = appointments.filter(
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
          {appointments.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", color: "#888" }}>
                Nenhuma consulta encontrada.
              </td>
            </tr>
          ) : (
            appointments.map((appointment) => (
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
                      icon={<Eye size={15} />}
                      style={{ padding: "0.5rem 1rem" }}
                      disabled
                    >
                      Ver detalhes
                    </Button>
                    {appointment.status === "pending" && (
                      <>
                        <Button
                          background="#ffc107"
                          fontSize="0.75rem"
                          hoverBackground="#e8a800"
                          icon={<RotateCcw size={15} />}
                          style={{ padding: "0.5rem 1rem" }}
                          disabled
                        >
                          Remarcar
                        </Button>
                        <Button
                          background="#dc3545"
                          hoverBackground="#c82333"
                          fontSize="0.75rem"
                          icon={<X size={15} />}
                          style={{ padding: "0.5rem 1rem" }}
                          disabled
                        >
                          Cancelar
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  if (isLoading) {
    return (
      <div className="doctor-details-container">
        <Header />
        <div className="main--content">
          <div style={{ textAlign: "center", margin: "3rem 0" }}>
            Carregando dados do médico...
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="doctor-details-container">
        <Header />
        <div className="main--content">
          <div style={{ textAlign: "center", margin: "3rem 0", color: "#c00" }}>
            Médico não encontrado.
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="doctor-details-container">
      {/* Header */}
      <Header />

      <div className="main--content">
        {/* Page Title and Doctor Name */}
        <div className="page-title">
          <h2 className="subtitle">Detalhes do médico</h2>
          <h3 className="doctor-name">{doctor.nome}</h3>
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

          {/* <Button
            background="#3b9b96"
            fontWeight={600}
            width="180px"
            hoverBackground="#2d7a75"
            borderRadius="0.375rem"
            icon={<Calendar size={15} />}
          >
            Agendar Consulta
          </Button> */}
        </div>

        {/* Doctor Details Card */}
        <div className="card---">
          <div className="card-content">
            <div className="doctor-info-grid">
              <div className="info-column">
                <div className="info-item">
                  <label className="info-label">Nome:</label>
                  <p className="info-value">
                    <User className="info-icon" />
                    {doctor.nome}
                  </p>
                </div>
                <div className="info-item">
                  <label className="info-label">Telefone:</label>
                  <p className="info-value">
                    <Phone className="info-icon" />
                    {doctor.telefone}
                  </p>
                </div>
                <div className="info-item">
                  <label className="info-label">Data de Cadastro:</label>
                  <p className="info-value">
                    <Calendar className="info-icon" />
                    {doctor.dataCadastro
                      ? new Date(doctor.dataCadastro).toLocaleDateString(
                          "pt-BR"
                        )
                      : "-"}
                  </p>
                </div>
              </div>

              <div className="info-column">
                <div className="info-item">
                  <label className="info-label">CRM:</label>
                  <p className="info-value">
                    <CreditCard className="info-icon" />
                    {doctor.crm}
                  </p>
                </div>
                <div className="info-item">
                  <label className="info-label">Endereço:</label>
                  <p className="info-value">
                    <MapPin className="info-icon" />
                    {formatarEndereco(doctor.endereco)}
                  </p>
                </div>
              </div>

              <div className="info-column">
                <div className="info-item">
                  <label className="info-label">Especialidade:</label>
                  <p className="info-value">
                    <Stethoscope className="info-icon" />
                    {doctor.especialidade?.nome || "-"}
                  </p>
                </div>
                <div className="info-item">
                  <label className="info-label">Status:</label>
                  <div className="status-container">
                    {getStatusBadge(doctor.ativo)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="card---">
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
