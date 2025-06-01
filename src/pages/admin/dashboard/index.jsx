import {
  FaUser,
  FaUserMd,
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header";
import Button from "../../../components/Button";
import Footer from "../../../components/footer";
import "./style.css";

const resumo = [
  {
    label: "Pacientes",
    value: 3,
    icon: <FaUser />,
    color: "#2c7a7b",
    link: "/admin/patients",
  },
  {
    label: "Médicos",
    value: 17,
    icon: <FaUserMd />,
    color: "#319898",
    link: "/admin/doctors",
  },
  {
    label: "Pendentes",
    value: 9,
    icon: <FaClipboardList />,
    color: "#f6ad55",
    link: "/admin/appointments?status=pendente",
  },
  {
    label: "Realizadas",
    value: 45,
    icon: <FaCheckCircle />,
    color: "#38a169",
    link: "/admin/appointments?status=realizada",
  },
  {
    label: "Canceladas",
    value: 3,
    icon: <FaTimesCircle />,
    color: "#e53e3e",
    link: "/admin/appointments?status=cancelada",
  },
];

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard-bg">
      <Header />
      <main className="admin-dashboard-main">
        <h2 className="admin-dashboard-title">Painel do Administrador</h2>
        <div className="admin-dashboard-cards">
          {resumo.map((item) => (
            <div
              className="admin-dashboard-card"
              key={item.label}
              style={{
                borderTop: `4px solid ${item.color}`,
                background:
                  "linear-gradient(135deg, #f9fafb 80%, #e6f4f1 100%)",
              }}
            >
              <div
                className="admin-dashboard-card-icon"
                style={{ color: item.color }}
              >
                {item.icon}
              </div>
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
                style={{
                  marginTop: "10px",
                  transition: "background 0.2s, color 0.2s",
                }}
                onClick={() => (window.location.href = item.link)}
              >
                Ver {item.label.toLowerCase()}
              </Button>
            </div>
          ))}
        </div>
        <div className="admin-dashboard-actions-horizontal">
          <h4>Ações rápidas</h4>
          <div className="admin-dashboard-actions-btns">

            <Button
              background="#319898"
              color="#fff"
              fontWeight={600}
              onClick={() => navigate("admin/doctors/create")}
            >
              + Novo Médico

            </Button>
            <Button
              background="#38a169"
              color="#fff"
              fontWeight={700}
              style={{ minWidth: 220, fontSize: "1.1rem" }}
              onClick={() => navigate("/admin/appointments/create")}
            >
              <FaPlus /> Nova Consulta (Encaixe)
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AdminDashboard;
