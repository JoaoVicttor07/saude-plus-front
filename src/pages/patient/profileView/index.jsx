import { useEffect, useState } from "react";
import Header from "../../../components/header";
import Button from "../../../components/Button";
import Footer from "../../../components/footer";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import PacienteService from "../../../services/PacienteService";



function ProfileView() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchProfile = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const data = await PacienteService.buscarMeuPerfil();
          setProfileData(data);
        } catch (err) {
          console.error("Erro ao buscar perfil:", err);
          setError(err.message || "Não foi possível carregar os dados do perfil. Tente novamente mais tarde.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchProfile();
    } else {
      setIsLoading(false);
      setError("Usuário não autenticado.");
    }
  }, [user, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="profile-bg">
        <Header />
        <main className="profile-container" role="main">
          <div className="profile-loading">
            <FaSpinner className="fa-spin" size={48} />
            <p>Carregando perfil...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="profile-bg">
        <Header />
        <main className="profile-container" role="main">
          <p>Nenhum dado de perfil encontrado.</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-bg">
        <Header />
        <main className="profile-container" role="main">
          <div className="profile-error">
            <FaExclamationTriangle size={48} style={{ color: "#b00" }} />
            <p>{error}</p>
            <Button onClick={() => navigate("/dashboard")}>Voltar ao Dashboard</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
              <span className="profile-value">{profileData.nomeCompleto || profileData.nome || "N/A"}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">
                <FaEnvelope className="profile-icon" /> E-mail
              </span>
              <span className="profile-value">{profileData.email || "N/A"}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">
                <FaPhone className="profile-icon" /> Telefone
              </span>
              <span className="profile-value">{profileData.telefone || "N/A"}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">
                <FaIdCard className="profile-icon" /> CPF
              </span>
              <span className="profile-value">{profileData.cpf || "N/A"}</span>
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
      <Footer />
    </div>

  );
}

export default ProfileView;