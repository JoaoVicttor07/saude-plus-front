import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaUser } from "react-icons/fa"
import Button from "../../../components/Button"
import Header from "../../../components/header"
import Footer from "../../../components/footer"
import "./PatientDetail.css"

const patientData = {
  nome: "Ana Paula Souza",
  cpf: "123.456.789-00",
  email: "ana@email.com",
  telefone: "(11) 91234-5678",
  status: "Inativo",
  dataCadastro: "25/04/2023",
}

const appointmentsData = [
  {
    id: 1,
    data: "10/06/2025",
    horario: "14:00",
    medico: "Dr. João Almeida",
    status: "Agendada",
  },
  {
    id: 2,
    data: "10/06/2025",
    horario: "14:00",
    medico: "Dr. teste",
    status: "Agendada",
  },
]

export default function PatientDetailsPage() {
  const [activeTab, setActiveTab] = useState("Agendadas")

  const handleCancelAppointment = (id) => {
    alert(`Cancelar consulta ${id}`)
  }

  const handleScheduleAppointment = () => {
    alert("Agendar Nova Consulta")
  }

  const handleActivatePatient = () => {
    alert("Ativar Paciente")
  }

  const handleGoBack = () => {
    alert("Voltar à lista de pacientes")
  }

  const handleExit = () => {
    alert("Sair")
  }

  return (
    <div className="patient-details-container">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="main-content">
        {/* Page Title and Back Button */}
        <div className="page-header">
          <h2 className="page-title">Detalhes do Paciente</h2>
          <Button
            background="#fff"
            color="#374151"
            fontWeight={600}
            hoverBackground="#e6f4f1"
          >
            Voltar à lista de pacientes</Button>
          {/* <button className="back-button" onClick={handleGoBack}>
            Voltar à lista de pacientes
          </button> */}
        </div>

        {/* Patient Name and Status */}
        <div className="patient-header">
          <div className="patient-name-card">
            <span className="patient-name">{patientData.nome}</span>
          </div>
          <div className="status-badge status-inactive">{patientData.status}</div>
        </div>

        {/* Registration Date */}
        <p className="registration-date">Cadastrado desde: {patientData.dataCadastro}</p>

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
              <span className="info-value">{patientData.cpf}</span>
            </div>
            <div className="info-item">
              <span className="info-label">E-mail:</span>
              <span className="info-value">{patientData.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Telefone:</span>
              <span className="info-value">{patientData.telefone}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <Button
            background="#126964"
            fontWeight="bold"
          >
            Agendar Nova Consulta</Button>

          <Button
          background="#fff"
          color="#126964"
          hoverBackground="#e6f4f1"
          fontWeight="bold"
          >
            Ativar Paciente</Button>
          {/* <button className="btn btn-secondary" onClick={handleActivatePatient}>
            Ativar Paciente
          </button> */}
        </div>

        {/* Appointment History */}
        <div className="appointment-history">
          <h3 className="section-title">Histórico de Consultas</h3>

          {/* Tabs */}
          <div className="tabs-container">
            <div className="tabs">
              <button
                className={`tab ${activeTab === "Agendadas" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("Agendadas")}
              >
                Agendadas
              </button>
              <button
                className={`tab ${activeTab === "Realizadas" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("Realizadas")}
              >
                Realizadas
              </button>
              <button
                className={`tab ${activeTab === "Canceladas" ? "tab-active" : ""}`}
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
                  {appointmentsData.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{appointment.data}</td>
                      <td>{appointment.horario}</td>
                      <td>{appointment.medico}</td>
                      <td>
                        <span className="status-badge-table status-scheduled">{appointment.status}</span>
                      </td>
                      <td>
                        <button className="btn btn-cancel" onClick={() => handleCancelAppointment(appointment.id)}>
                          Cancelar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
