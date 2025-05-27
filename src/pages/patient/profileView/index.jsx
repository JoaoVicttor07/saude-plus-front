import Header from "../../../components/header";
import Button from "../../../components/Button";
import "./style.css";
import { useNavigate } from "react-router-dom";

// Simulação de dados do usuário (substitua pelo contexto/autenticação futuramente)
const usuario = {
  nome: "Maria Souza",
  email: "maria@email.com",
  telefone: "(11) 91234-5678",
  cpf: "123.456.789-00",
};

function ProfileView() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-bg">
      <Header />
      <main className="patient-dashboard-container" role="main">
        <h2 className="dashboard-title">Meu Perfil</h2>
        <div className="profile-card">
          <div className="profile-row">
            <span className="profile-label">Nome:</span>
            <span className="profile-value">{usuario.nome}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Email:</span>
            <span className="profile-value">{usuario.email}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Telefone:</span>
            <span className="profile-value">{usuario.telefone}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">CPF:</span>
            <span className="profile-value">{usuario.cpf}</span>
          </div>
        </div>
        <div className="dashboard-actions">
          <Button
            background="#2c7a7b"
            color="#fff"
            fontWeight={600}
            hoverBackground="#285e61"
            border="none"
            borderRadius="6px"
            height="45px"
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
          borderRadius="6px"
          onClick={() => navigate("/dashboard")}
          style={{marginTop: '10px'}}
          >
            Voltar
          </Button>
        </div>
      </main>
    </div>
  );
}

export default ProfileView;