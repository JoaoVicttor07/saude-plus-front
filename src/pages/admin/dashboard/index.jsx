import {useNavigate} from 'react-router-dom'
import { UserRound, Stethoscope, Calendar, Plus } from "lucide-react";
import Button from "../../../components/Button";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import "./style.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

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
            <div className="cardContent">
              <h3 className="card-value">3</h3>
              <p className="card-label">Pacientes</p>
            </div>
            <Button
              width="100%"
              background="#3b9b96"
              hoverBackground="#2d7a75"
              borderRadius="0.375rem"
              onClick={() => navigate('/admin/patients')}
              style={{ padding: "1rem" }}
            >
              Ver pacientes
            </Button>
          </div>

          {/* Doctors Card */}
          <div className="dashboard--card">
            <div className="card-icon doctor-icon">
              <Stethoscope size={32} />
            </div>
            <div className="cardContent">
              <h3 className="card-value">3</h3>
              <p className="card-label">Médicos</p>
            </div>
            <Button
              width="100%"
              background="#3b9b96"
              hoverBackground="#2d7a75"
              borderRadius="0.375rem"
              onClick={() => navigate('/admin/doctors')}
              style={{ padding: "1rem" }}
            >
              Ver médicos
            </Button>
          </div>

          {/* Appointments Card */}
          <div className="dashboard--card appointments-card">
            <div className="card-icon appointment-icon">
              <Calendar size={32} />
            </div>
            <div className="cardContent">
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
            <Button
              width="100%"
              background="#3b9b96"
              hoverBackground="#2d7a75"
              // background="#4ecdc4"
              // hoverBackground="#3db1a8"
              borderRadius="0.375rem"
              style={{ padding: "1rem" }}
            >
              Ver consultas
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-container">
          <div className="quick-actions-card">
            <h3 className="sectionTitle">Ações rápidas</h3>
            <div className="quick-actions">
              <Button
                background="#3b9b96"
                hoverBackground="#2d7a75"
                fontSize="0.875rem"
                icon={<Plus size={15} />}
                style={{ padding: "0.80rem 1.5rem" }}
              >
                Novo Médico
              </Button>

              <Button
                background="#3b9b96"
                hoverBackground="#2d7a75"
                fontSize="0.875rem"
                icon={<Plus size={15} />}
                style={{ padding: "0.80rem 1.5rem" }}
              >
                Nova Consulta
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
