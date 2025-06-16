import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRound, Stethoscope, Calendar, Plus } from "lucide-react";
import Button from "../../../components/Button";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import PacienteService from "../../../services/PacienteService";
import MedicoService from "../../../services/MedicoService";
import AppointmentService from "../../../services/AppointmentService";
import ConsultaService from "../../../services/ConsultaService";
import "./style.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [totalPacientes, setTotalPacientes] = useState(0);
  const [totalMedicos, setTotalMedicos] = useState(0);
  const [totalConsultas, setTotalConsultas] = useState(0);
  const [pendentes, setPendentes] = useState(0);
  const [realizadas, setRealizadas] = useState(0);
  const [canceladas, setCanceladas] = useState(0);

  useEffect(() => {
    PacienteService.listarTodos()
      .then((data) => setTotalPacientes(Array.isArray(data) ? data.length : 0))
      .catch(() => setTotalPacientes(0));

    MedicoService.listarTodos()
      .then((data) => setTotalMedicos(Array.isArray(data) ? data.length : 0))
      .catch(() => setTotalMedicos(0));

    ConsultaService.listarTodas()
      .then((data) => {
        if (Array.isArray(data)) {
          setTotalConsultas(data.length);
          setPendentes(data.filter((c) => c.status === "AGENDADA").length);
          setRealizadas(data.filter((c) => c.status === "REALIZADA").length);
          setCanceladas(data.filter((c) => c.status === "DESMARCADA").length);
        }
      })
      .catch(() => {
        setTotalConsultas(0);
        setPendentes(0);
        setRealizadas(0);
        setCanceladas(0);
      });
  }, []);

  return (
    <div className="admin-container">
      {/* Header */}
      <Header />

      <div className="main---content">
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
              <h3 className="card-value">{totalPacientes}</h3>
              <p className="card-label">Pacientes</p>
            </div>
            <Button
              width="100%"
              background="#3b9b96"
              hoverBackground="#2d7a75"
              borderRadius="0.375rem"
              onClick={() => navigate("/admin/patients")}
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
              <h3 className="card-value">{totalMedicos}</h3>
              <p className="card-label">Médicos</p>
            </div>
            <Button
              width="100%"
              background="#3b9b96"
              hoverBackground="#2d7a75"
              borderRadius="0.375rem"
              onClick={() => navigate("/admin/doctors")}
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
              <h3 className="card-value">{totalConsultas}</h3>
              <p className="card-label">Consultas</p>
              <div className="appointment-stats">
                <div className="stat-item">
                  <span className="stat-badge pending"></span>
                  <span className="stat-label">{pendentes} Pendentes</span>
                </div>
                <div className="stat-item">
                  <span className="stat-badge completed"></span>
                  <span className="stat-label">{realizadas} Realizadas</span>
                </div>
                <div className="stat-item">
                  <span className="stat-badge cancelled"></span>
                  <span className="stat-label">{canceladas} Canceladas</span>
                </div>
              </div>
            </div>
            <Button
              width="100%"
              background="#3b9b96"
              hoverBackground="#2d7a75"
              borderRadius="0.375rem"
              style={{ padding: "1rem" }}
              onClick={() => navigate("/admin/appointments")}
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
              {/* <Button
                background="#3b9b96"
                hoverBackground="#2d7a75"
                fontSize="0.875rem"
                icon={<Plus size={15} />}
                style={{ padding: "0.80rem 1.5rem" }}
              >
                Novo Médico
              </Button> */}

              <Button
                background="#3b9b96"
                hoverBackground="#2d7a75"
                fontSize="0.875rem"
                icon={<Plus size={15} />}
                style={{ padding: "0.80rem 1.5rem" }}
                onClick={() => navigate("/admin/appointments/create")}
                disabled
              >
                Nova Consulta
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
