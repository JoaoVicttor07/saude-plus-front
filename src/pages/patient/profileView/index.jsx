import Header from "../../../components/header";
import Button from "../../../components/Button";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaIdCard } from "react-icons/fa";

const usuario = {
  nome: "Maria Souza",
  email: "maria@email.com",
  telefone: "(11) 91234-5678",
  cpf: "123.456.789-00",
};

function ProfileView() {
  const navigate = useNavigate();

  return (
    <div className="profile-bg">
      <Header />
      <main className="profile-container" role="main">
        <h2 className="profile-title">Meu Perfil</h2>
        <div className="profile-card">
          <div className="profile-grid">
            <div className="profile-field">
              <span className="profile-label">
                <FaUser className="profile-icon" /> Nome
              </span>
              <span className="profile-value">{usuario.nome}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">
                <FaEnvelope className="profile-icon" /> E-mail
              </span>
              <span className="profile-value">{usuario.email}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">
                <FaPhone className="profile-icon" /> Telefone
              </span>
              <span className="profile-value">{usuario.telefone}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">
                <FaIdCard className="profile-icon" /> CPF
              </span>
              <span className="profile-value">{usuario.cpf}</span>
            </div>
          </div>
        </div>
        <div className="profile-actions">
          <Button
            background="#2c7a7b"
            color="#fff"
            fontWeight={600}
            hoverBackground="#285e61"
            border="none"
            borderRadius="6px"
            height="45px"
            width="50%"
            onClick={() => navigate("/profile/edit")}
            
          >
            Editar Perfil
          </Button>
          <Button
            background="#fff"
            color="#2c7a7b"
            fontWeight={600}
            hoverBackground="#f0f8f8"
            border="2px solid #2c7a7b"
            height="45px"
            width="50%"
            borderRadius="6px"
            onClick={() => navigate("/dashboard")}
            
          >
            Dashboard
          </Button>
        </div>
      </main>
    </div>
  );
}

export default ProfileView;