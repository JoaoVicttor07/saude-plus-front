"use client"

import { useState } from "react"
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
} from "lucide-react"
import "./style.css"

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
    notes: "Consulta de rotina para acompanhamento cardíaco",
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
    notes: "Avaliação de lesão cutânea",
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
    notes: "Consulta realizada com sucesso. Paciente orientado sobre fisioterapia.",
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
    notes: "Exame neurológico completo realizado. Resultados normais.",
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
    notes: "Cancelado pelo paciente por motivos pessoais",
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
    notes: "Cancelado devido à indisponibilidade do médico",
    phone: "(11) 94321-0987",
  },
]

export default function ViewAppointments() {
  const [activeTab, setActiveTab] = useState("pending")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAppointment, setSelectedAppointment] = useState(null)

  const filteredAppointments = mockAppointments.filter((appointment) => {
    const matchesTab = appointment.status === activeTab
    const matchesSearch =
      searchTerm === "" ||
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesTab && matchesSearch
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="status-icon pending" />
      case "completed":
        return <CheckCircle className="status-icon completed" />
      case "cancelled":
        return <XCircle className="status-icon cancelled" />
      default:
        return null
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pendente"
      case "completed":
        return "Realizada"
      case "cancelled":
        return "Cancelada"
      default:
        return status
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const AppointmentCard = ({ appointment }) => (
    <div className="appointment-card">
      <div className="appointment-header">
        <div className="appointment-datetime">
          <Calendar className="datetime-icon" />
          <span className="datetime-text">
            {formatDate(appointment.date)} às {appointment.time}
          </span>
        </div>
        <div className="appointment-status">
          {getStatusIcon(appointment.status)}
          <span className={`status-text ${appointment.status}`}>{getStatusText(appointment.status)}</span>
        </div>
      </div>

      <div className="appointment-details">
        <div className="detail-row">
          <User className="detail-icon" />
          <span className="detail-label">Paciente:</span>
          <span className="detail-value">{appointment.patient}</span>
        </div>
        <div className="detail-row">
          <Stethoscope className="detail-icon" />
          <span className="detail-label">Médico:</span>
          <span className="detail-value">{appointment.doctor}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Especialidade:</span>
          <span className="detail-value">{appointment.specialty}</span>
        </div>
        <div className="detail-row">
          <MapPin className="detail-icon" />
          <span className="detail-label">Local:</span>
          <span className="detail-value">{appointment.location}</span>
        </div>
      </div>

      <div className="appointment-actions">
        <button className="btn btn-outline" onClick={() => setSelectedAppointment(appointment)}>
          <Eye className="icon" />
          Ver Detalhes
        </button>

        {appointment.status === "pending" && (
          <>
            <button className="btn btn-warning">
              <RotateCcw className="icon" />
              Reagendar
            </button>
            <button className="btn btn-danger">
              <X className="icon" />
              Cancelar
            </button>
          </>
        )}
      </div>
    </div>
  )

  const AppointmentModal = ({ appointment, onClose }) => {
    if (!appointment) return null

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Detalhes da Consulta</h3>
            <button className="modal-close" onClick={onClose}>
              <X />
            </button>
          </div>

          <div className="modal-body">
            <div className="modal-section">
              <h4>Informações Gerais</h4>
              <div className="modal-details">
                <div className="modal-row">
                  <span className="modal-label">Data:</span>
                  <span className="modal-value">{formatDate(appointment.date)}</span>
                </div>
                <div className="modal-row">
                  <span className="modal-label">Horário:</span>
                  <span className="modal-value">{appointment.time}</span>
                </div>
                <div className="modal-row">
                  <span className="modal-label">Status:</span>
                  <span className={`modal-value status-badge ${appointment.status}`}>
                    {getStatusText(appointment.status)}
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-section">
              <h4>Paciente</h4>
              <div className="modal-details">
                <div className="modal-row">
                  <span className="modal-label">Nome:</span>
                  <span className="modal-value">{appointment.patient}</span>
                </div>
                <div className="modal-row">
                  <span className="modal-label">Telefone:</span>
                  <span className="modal-value">{appointment.phone}</span>
                </div>
              </div>
            </div>

            <div className="modal-section">
              <h4>Médico</h4>
              <div className="modal-details">
                <div className="modal-row">
                  <span className="modal-label">Nome:</span>
                  <span className="modal-value">{appointment.doctor}</span>
                </div>
                <div className="modal-row">
                  <span className="modal-label">Especialidade:</span>
                  <span className="modal-value">{appointment.specialty}</span>
                </div>
                <div className="modal-row">
                  <span className="modal-label">Local:</span>
                  <span className="modal-value">{appointment.location}</span>
                </div>
              </div>
            </div>

            <div className="modal-section">
              <h4>Observações</h4>
              <p className="modal-notes">{appointment.notes}</p>
            </div>
          </div>

          <div className="modal-footer">
            {appointment.status === "pending" && (
              <>
                <button className="btn btn-warning">
                  <RotateCcw className="icon" />
                  Reagendar
                </button>
                <button className="btn btn-danger">
                  <X className="icon" />
                  Cancelar
                </button>
              </>
            )}
            <button className="btn btn-secondary" onClick={onClose}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="appointments-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Saúde+</h1>
          <button className="btn btn-secondary">Sair</button>
        </div>
      </header>

      <div className="main-content">
        {/* Page Title and Navigation */}
        <div className="page-header">
          <button className="btn btn-secondary back-button">
            <ArrowLeft className="icon" />
            Voltar ao Dashboard
          </button>
          <h2 className="page-title">Gerenciamento de Consultas</h2>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs-header">
            <button
              className={`tab-button ${activeTab === "pending" ? "active" : ""}`}
              onClick={() => setActiveTab("pending")}
            >
              Pendentes
            </button>
            <button
              className={`tab-button ${activeTab === "completed" ? "active" : ""}`}
              onClick={() => setActiveTab("completed")}
            >
              Realizadas
            </button>
            <button
              className={`tab-button ${activeTab === "cancelled" ? "active" : ""}`}
              onClick={() => setActiveTab("cancelled")}
            >
              Canceladas
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <div className="search-bar">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por paciente ou médico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Appointments List */}
        <div className="appointments-list">
          {filteredAppointments.length === 0 ? (
            <div className="empty-state">
              <Calendar className="empty-icon" />
              <h3>Nenhuma consulta encontrada</h3>
              <p>
                {searchTerm
                  ? "Tente ajustar os termos de busca"
                  : `Não há consultas ${getStatusText(activeTab).toLowerCase()} no momento`}
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
      <footer className="footer">
        <p>Saúde+ © 2025 - Todos os direitos reservados</p>
      </footer>

      {/* Modal */}
      <AppointmentModal appointment={selectedAppointment} onClose={() => setSelectedAppointment(null)} />
    </div>
  )
}
