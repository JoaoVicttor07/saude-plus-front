import { useState } from "react";
import Header from "../../../components/header";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import "./style.css";
import { useNavigate } from "react-router-dom";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você faria a chamada para salvar as alterações
    alert("Perfil atualizado com sucesso!");
    navigate("/profile");
  };

  return (
    <div className="dashboard-bg">
      <Header />
      <main className="patient-dashboard-container" role="main">
        <h2 className="dashboard-title">Editar Perfil</h2>
        <form className="profile-form" onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome</label>
          <Input
            type="text"
            id="nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="telefone">Telefone</label>
          <Input
            type="text"
            id="telefone"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            required
          />

          <label htmlFor="cpf">CPF</label>
          <Input
            type="text"
            id="cpf"
            name="cpf"
            value={form.cpf}
            disabled
            style={{ background: "#f1f5f9", color: "#888" }}
          />

          <div className="dashboard-actions">
            <Button
              background="#2c7a7b"
              color="#fff"
              fontWeight={600}
              hoverBackground="#285e61"
              border="none"
              borderRadius="6px"
              height="45px"
              type="submit"
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
              type="button"
              onClick={() => navigate("/profile")}
              style={{marginTop: '10px'}}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ProfileEdit;