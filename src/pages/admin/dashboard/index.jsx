import { FaUser, FaUserMd, FaClipboardList, FaCheckCircle, FaTimesCircle, FaPlus } from "react-icons/fa";
import Header from "../../../components/header";
import Button from "../../../components/Button";
import "./style.css";

const resumo = [
  { label: "Pacientes", value: 128, icon: <FaUser />, color: "#2c7a7b", link: "/admin/patients" },
  { label: "Médicos", value: 17, icon: <FaUserMd />, color: "#319898", link: "/admin/doctors" },
  { label: "Pendentes", value: 9, icon: <FaClipboardList />, color: "#f6ad55", link: "/admin/appointments?status=pendente" },
  { label: "Realizadas", value: 45, icon: <FaCheckCircle />, color: "#38a169", link: "/admin/appointments?status=realizada" },
  { label: "Canceladas", value: 3, icon: <FaTimesCircle />, color: "#e53e3e", link: "/admin/appointments?status=cancelada" },
];

function AdminDashboard() {
  return (
    <div className="admin-dashboard-bg">
      <Header />
      <div className="admin-dashboard-content">
        <div className="admin-dashboard-top">
          <h2 className="admin-dashboard-title">Painel do Administrador</h2>
        </div>
        <div className="admin-dashboard-layout">
          <div className="admin-dashboard-cards">
            {resumo.map((item) => (
              <div className="admin-dashboard-card" key={item.label} style={{ borderTop: `4px solid ${item.color}` }}>
                <div className="admin-dashboard-card-icon" style={{ color: item.color }}>{item.icon}</div>
                <div className="admin-dashboard-card-value">{item.value}</div>
                <div className="admin-dashboard-card-label">{item.label}</div>
                <Button
                  background="#fff"
                  color={item.color}
                  fontWeight={600}
                  hoverBackground="#f0f8f8"
                  height="36px"
                  width="100%"
                  border={`1.5px solid ${item.color}`}
                  style={{ marginTop: "10px" }}
                  onClick={() => window.location.href = item.link}
                >
                  Ver {item.label.toLowerCase()}
                </Button>
              </div>
            ))}
          </div>
          <div className="admin-dashboard-actions">
            <h4>Ações Rápidas</h4>
            <Button
              background="#2c7a7b"
              color="#fff"
              fontWeight={600}
              width="100%"
              style={{ marginBottom: "10px" }}
              onClick={() => window.location.href = "/admin/patients"}
            >
              <FaPlus /> Novo Paciente
            </Button>
            <Button
              background="#319898"
              color="#fff"
              fontWeight={600}
              width="100%"
              style={{ marginBottom: "10px" }}
              onClick={() => window.location.href = "/admin/doctors"}
            >
              <FaPlus /> Novo Médico
            </Button>
            <Button
              background="#38a169"
              color="#fff"
              fontWeight={600}
              width="100%"
              onClick={() => window.location.href = "/admin/appointments/create"}
            >
              <FaPlus /> Nova Consulta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;