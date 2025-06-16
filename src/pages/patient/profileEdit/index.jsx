import { useState, useEffect } from "react";
import Header from "../../../components/header";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Modal from "../../../components/modalConfirmation";
import Footer from "../../../components/footer";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import PacienteService from "../../../services/PacienteService";


function ProfileEdit() {
    const navigate = useNavigate();
  const { user, isAuthenticated, updateUserContext } = useAuth();
  const [form, setForm] = useState({
    nomeCompleto: "",
    email: "",
    telefone: "",
    cpf: "",
  });
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });


  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchProfile = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const data = await PacienteService.buscarMeuPerfil();
          setForm({
            nomeCompleto: data.nomeCompleto || data.nome || "",
            email: data.email || "",
            telefone: data.telefone || "",
            cpf: data.cpf || "",
          });
          setInitialData(data);
        } catch (err) {
          console.error("Erro ao buscar perfil para edição:", err);
          setError(err.message || "Não foi possível carregar os dados do perfil para edição.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchProfile();
    } else {
      setIsLoading(false);
      setError("Usuário não autenticado.");
      navigate("/signin");
    }
  }, [user, isAuthenticated]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      setError("ID do usuário não encontrado. Não é possível salvar.");
      setModalContent({ title: "Erro", message: "ID do usuário não encontrado. Tente fazer login novamente." });
      setModalOpen(true);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const updatePayload = {
      nomeCompleto: form.nomeCompleto,
      email: form.email,
      telefone: form.telefone,
    };

    try {
      await PacienteService.atualizar(user.id, updatePayload);
      setModalContent({ title: "Perfil Atualizado!", message: "Suas informações foram atualizadas com sucesso." });
      // If email or other critical info affecting the token changes,
      // the backend should ideally issue a new token.
      // For now, updateUserContext re-decodes the existing token.
      updateUserContext();
    }catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      const errorMessage = err.response?.data?.message || err.message || "Não foi possível salvar as alterações. Tente novamente.";
      setModalContent({ title: "Erro ao Salvar", message: errorMessage });
      setError(errorMessage); // Also set error state for potential display outside modal
    } finally {
      setIsSubmitting(false);
      setModalOpen(true);
    }
  };

   

  const handleModalClose = () => {
    setModalOpen(false);
    if (modalContent.title === "Perfil Atualizado!") {
      navigate('/profile'); // Navigate to profile view on successful update
    }
    // For errors, the user stays on the edit page to correct them.
  };

  if (isLoading) {
    return (
      <div className="profile-edit-bg">
        <Header />
        <main className="profile-edit-container" role="main">
          <div className="profile-loading-container"> {/* Added for centering */}
            <FaSpinner className="fa-spin" size={48} />
            <p>Carregando dados para edição...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

   if (error && !initialData) { // Show error if initial load failed
     return (
      <div className="profile-edit-bg">
        <Header />
        <main className="profile-edit-container" role="main">
          <div className="profile-error-container"> {/* Added for centering/styling */}
            <FaExclamationTriangle size={48} style={{color: "#b00"}} />
            <p>{error}</p>
            <Button onClick={() => navigate("/dashboard")}>Voltar ao Dashboard</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="profile-edit-bg">
      <Header />
      <main className="profile-edit-container" role="main">
        <h2 className="profile-edit-title">Editar Perfil</h2>
        <form className="profile-edit-form" onSubmit={handleSubmit}>
          <div className="profile-edit-grid">
            <div className="profile-edit-field">
              <label htmlFor="nomeCompleto">
                <FaUser className="profile-edit-icon" /> Nome Completo
              </label>
              <Input
                type="text"
                id="nomeCompleto"
                name="nomeCompleto"
                value={form.nomeCompleto}
                onChange={handleChange}
                required
                width="85%"
              />
            </div>
            <div className="profile-edit-field">
              <label htmlFor="email">
                <FaEnvelope className="profile-edit-icon" /> Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                width="85%"
              />
            </div>
            <div className="profile-edit-field">
              <label htmlFor="telefone">
                <FaPhone className="profile-edit-icon" /> Telefone
              </label>
              <Input
                type="text"
                id="telefone"
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                required
                width="85%"
              />
            </div>
            <div className="profile-edit-field">
              <label htmlFor="cpf">
                <FaIdCard className="profile-edit-icon" /> CPF
              </label>
              <Input
                type="text"
                id="cpf"
                name="cpf"
                value={form.cpf}
                disabled
                width="85%"
                style={{ background: "#f1f5f9", color: "#666" }}
              />
            </div>
          </div>
           {error && <p className="profile-edit-error-message">{error}</p>} {/* Display submit error */}
          <div className="profile-edit-actions">
            <Button
              background="#2c7a7b"
              color="#fff"
              fontWeight={600}
              hoverBackground="#285e61"
              border="none"
              borderRadius="6px"
              height="45px"
              width="100%"
              type="submit"
              style={{ minWidth: 140 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <FaSpinner className="fa-spin" /> : "Salvar"}
            </Button>
            <Button
              background="#fff"
              color="#2c7a7b"
              fontWeight={600}
              hoverBackground="#f0f8f8"
              border="2px solid #2c7a7b"
              borderRadius="6px"
              height="45px"
              width="100%"
              type="button"
              onClick={() => navigate("/profile")}
              style={{ minWidth: 140 }}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          </div>
        </form>
        <Modal
        open={modalOpen}
        title={modalContent.title}
        onClose={handleModalClose}
        buttonText="OK"
        >
          {modalContent.message}
          </Modal>
      </main>
      <Footer/>
    </div>
  );
}

export default ProfileEdit;