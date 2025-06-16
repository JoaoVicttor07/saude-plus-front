import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import Button from "../../../components/Button";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import PacienteService from "../../../services/PacienteService";
import ConsultaService from "../../../services/ConsultaService";
import "./PatientDetail.css";
import { ArrowLeft, Calendar, UserX, UserCheck } from "lucide-react";
import { mascararCPF, formatarTelefone, formatarData } from "../../../utils/formatters";

export default function PatientDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [patientData, setPatientData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("Agendadas");
  const [patientStatus, setPatientStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setErro("");
      try {
        const paciente = await PacienteService.buscarPorId(id);
        setPatientData(paciente);
        setPatientStatus(paciente.ativo ? "Ativo" : "Inativo");
        // Buscar consultas do paciente
        const consultas = await ConsultaService.listarPorPaciente(id);
        setAppointments(consultas);
      } catch (err) {
        setErro("Erro ao buscar dados do paciente.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const statusToggleIcon = patientStatus === "Ativo" ? <UserX /> : <UserCheck />;

  const handleTogglePatientStatus = () => {
    setPendingAction(patientStatus === "Ativo" ? "desativar" : "ativar");
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    setPatientStatus(patientStatus === "Ativo" ? "Inativo" : "Ativo");
    setShowModal(false);
    setPendingAction(null);
    // Aqui você pode chamar PacienteService.desativar/ativar se quiser atualizar no back-end
  };

  const handleCancelAction = () => {
    setShowModal(false);
    setPendingAction(null);
  };

  const handleCancelAppointment = (id) => {
    alert(`Cancelar consulta ${id}`);
  };

  const handleScheduleAppointment = () => {
    alert("Agendar Nova Consulta");
  };

  const statusBadgeClass =
    "status-badge " +
    (patientStatus === "Ativo" ? "status-active" : "status-inactive");

  // Filtra as consultas conforme a aba ativa
  const filteredAppointments = appointments.filter((appointment) => {
    if (activeTab === "Agendadas") return appointment.status === "Agendada";
    if (activeTab === "Realizadas") return appointment.status === "Realizada";
    if (activeTab === "Canceladas") return appointment.status === "Cancelada";
    return true;
  });

  const getStatusBadgeClass = (status) => {
    if (status === "Agendada") return "status-badge-table status-scheduled";
    if (status === "Realizada") return "status-badge-table status-done";
    if (status === "Cancelada") return "status-badge-table status-canceled";
    return "status-badge-table";
  };

  if (loading) {
    return (
      <div className="patient-details-container">
        <Header />
        <main className="main-content">
          <p style={{ textAlign: "center", margin: 40 }}>Carregando...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (erro || !patientData) {
    return (
      <div className="patient-details-container">
        <Header />
        <main className="main-content">
          <p style={{ textAlign: "center", margin: 40, color: "#b00" }}>{erro || "Paciente não encontrado."}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="patient-details-container">
      <Header />
      <main className="main------content">
        <div className="page-header">
          <h2 className="page-title">Detalhes do Paciente</h2>
          <Button
            background="#fff"
            color="#374151"
            fontWeight="600"
            height="35px"
            width="210px"
            hoverBackground="#f8f9fa"
            borderRadius="0.375rem"
            icon={<ArrowLeft size={15}/>}
            onClick={() => navigate(-1)}
          >
            Voltar à lista de pacientes
          </Button>
        </div>

        {/* Patient Name and Status */}
        <div className="patient-header">
          <div className="patient-name-card">
            <span className="patient-name">{patientData.nome}</span>
          </div>
          <div className={statusBadgeClass}>{patientStatus}</div>
        </div>

        {/* Registration Date */}
        <p className="registration-date">
          Cadastrado desde: {formatarData(patientData.dataCriacao) || "-"}
        </p>

        {/* Patient Info Card */}
        <div className="patient-info-card">
          <div className="avatar-container">
            <div className="avatar">
              <FaUser className="avatar-icon" />
            </div>
          </div>
          <div className="patient-info-grid">
            <div className="info-item">
              <span className="info-label">Nome:</span>
              <span className="info-value">{patientData.nome}</span>
            </div>
            <div className="info-item">
              <span className="info-label">CPF:</span>
              <span className="info-value">{mascararCPF(patientData.cpf)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">E-mail:</span>
              <span className="info-value">{patientData.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Telefone:</span>
              <span className="info-value">{formatarTelefone(patientData.telefone)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <Button
            background="#3b9b96"
            hoverBackground="#2d7a75"
            fontWeight={600}
            borderRadius="0.375rem"
            style={{padding: "0.90rem 2rem"}}
            icon={<Calendar size={15} />}
            onClick={handleScheduleAppointment}
          >
            Agendar Consulta
          </Button>

          <Button
            background="#fff"
            color="#374151"
            hoverBackground="#e6f4f1"
            fontWeight="bold"
            icon={statusToggleIcon}
            style={{padding: "0.90rem 2rem"}}
            onClick={handleTogglePatientStatus}
          >
            {patientStatus === "Ativo"
              ? "Desativar Paciente"
              : "Ativar Paciente"}
          </Button>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>
                {pendingAction === "desativar"
                  ? "Desativar paciente"
                  : "Ativar paciente"}
              </h3>
              <p>
                {pendingAction === "desativar"
                  ? "Tem certeza que deseja desativar este paciente? Ele não poderá acessar o sistema até ser reativado."
                  : "Tem certeza que deseja ativar este paciente? Ele poderá acessar o sistema normalmente."}
              </p>
              <div className="modal-actions">
                <Button
                  background="#10b981"
                  color="#fff"
                  fontWeight="bold"
                  height="38px"
                  width="120px"
                  onClick={handleConfirmAction}
                >
                  Confirmar
                </Button>
                <Button
                  background="#f3f4f6"
                  color="#374151"
                  fontWeight="bold"
                  height="38px"
                  width="120px"
                  hoverBackground="#e5e7eb"
                  onClick={handleCancelAction}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Appointment History */}
        <div className="appointment-history">
          <h3 className="section-title">Histórico de Consultas</h3>

          {/* Tabs */}
          <div className="tabs-container">
            <div className="tabs">
              <button
                className={`tab ${
                  activeTab === "Agendadas" ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab("Agendadas")}
              >
                Agendadas
              </button>
              <button
                className={`tab ${
                  activeTab === "Realizadas" ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab("Realizadas")}
              >
                Realizadas
              </button>
              <button
                className={`tab ${
                  activeTab === "Canceladas" ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab("Canceladas")}
              >
                Canceladas
              </button>
            </div>

            {/* Table */}
            <div className="table-container">
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>Data da Consulta</th>
                    <th>Horário</th>
                    <th>Médico</th>
                    <th>Status</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        style={{ textAlign: "center", color: "#888" }}
                      >
                        Nenhuma consulta encontrada.
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td>{appointment.data}</td>
                        <td>{appointment.horario}</td>
                        <td>{appointment.medico}</td>
                        <td>
                          <span
                            className={getStatusBadgeClass(appointment.status)}
                          >
                            {appointment.status}
                          </span>
                        </td>
                        <td>
                          {activeTab === "Agendadas" && (
                            <button
                              className="btn btn-cancel"
                              onClick={() =>
                                handleCancelAppointment(appointment.id)
                              }
                            >
                              Cancelar
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
