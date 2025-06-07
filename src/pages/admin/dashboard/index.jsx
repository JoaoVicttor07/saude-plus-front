import { UserRound, Stethoscope, Calendar, Plus } from "lucide-react"
import Button from "../../../components/Button"
import Header from "../../../components/header"
import Footer from "../../../components/footer"
import "./style.css"

export default function AdminDashboard() {
  return (
    <div className="admin-container">
      {/* Header */}
      <Header />

      <div className="main-content">
        {/* Page Title */}
        <div className="page-title">
          <h2 className="admin-title">Painel do Administrador</h2>
        </div>

        {/* Dashboard Cards */}
        <div className="dashboard-grid">
          {/* Patients Card */}
          <div className="dashboard--card">
            <div className="card-icon patient-icon">
              <UserRound size={32} />
            </div>
            <div className="card-content">
              <h3 className="card-value">3</h3>
              <p className="card-label">Pacientes</p>
            </div>
            <button className="card-action patient-action">Ver pacientes</button>
          </div>

          {/* Doctors Card */}
          <div className="dashboard--card">
            <div className="card-icon doctor-icon">
              <Stethoscope size={32} />
            </div>
            <div className="card-content">
              <h3 className="card-value">3</h3>
              <p className="card-label">Médicos</p>
            </div>
            <button className="card-action doctor-action">Ver médicos</button>
          </div>

          {/* Appointments Card */}
          <div className="dashboard--card appointments-card">
            <div className="card-icon appointment-icon">
              <Calendar size={32} />
            </div>
            <div className="card-content">
              <h3 className="card-value">18</h3>
              <p className="card-label">Consultas</p>
              <div className="appointment-stats">
                <div className="stat-item">
                  <span className="stat-badge pending"></span>
                  <span className="stat-label">9 Pendentes</span>
                </div>
                <div className="stat-item">
                  <span className="stat-badge completed"></span>
                  <span className="stat-label">6 Realizadas</span>
                </div>
                <div className="stat-item">
                  <span className="stat-badge cancelled"></span>
                  <span className="stat-label">3 Canceladas</span>
                </div>
              </div>
            </div>
            <button className="card-action appointment-action">Ver consultas</button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-container">
          <div className="quick-actions-card">
            <h3 className="section-title">Ações rápidas</h3>
            <div className="quick-actions">
              <button className="btn btn-primary">
                <Plus className="icon" />
                Novo Médico
              </button>
              <button className="btn btn-primary">
                <Plus className="icon" />
                Nova Consulta
              </button>
              <button className="btn btn-primary">
                <Plus className="icon" />
                Novo Paciente
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>Saúde+ © 2025 - Todos os direitos reservados</p>
      </footer>
    </div>
  )
}
