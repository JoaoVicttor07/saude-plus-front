import { useState } from "react";
import Header from "../../../components/header";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Modal from "../../../components/modalConfirmation";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaIdCard } from "react-icons/fa";

// Simulação de dados iniciais
const usuarioFake = {
  nome: "Maria Souza",
  email: "maria@email.com",
  telefone: "(11) 91234-5678",
  cpf: "123.456.789-00",
};

function ProfileEdit() {
  const navigate = useNavigate();
  const [form, setForm] = useState(usuarioFake);
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    navigate('/profile');
  }

  return (
    <div className="profile-edit-bg">
      <Header />
      <main className="profile-edit-container" role="main">
        <h2 className="profile-edit-title">Editar Perfil</h2>
        <form className="profile-edit-form" onSubmit={handleSubmit}>
          <div className="profile-edit-grid">
            <div className="profile-edit-field">
              <label htmlFor="nome">
                <FaUser className="profile-edit-icon" /> Nome
              </label>
              <Input
                type="text"
                id="nome"
                name="nome"
                value={form.nome}
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
                style={{ background: "#f1f5f9", color: "#888" }}
              />
            </div>
          </div>
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
            >
              Salvar
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
            >
              Cancelar
            </Button>
          </div>
        </form>
        <Modal
        open={modalOpen}
        title="Perfil atualizado!"
        onClose={handleModalClose}
        buttonText="OK"
        >
          Suas informações foram atualizadas com sucesso.
          </Modal>
      </main>
    </div>
  );
}

export default ProfileEdit;