import "./style.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const outrosTitulos = ["Drx.", "Dre.", "Dre@", "Dr*", "D."];

export default function DoctorProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [doctor, setDoctor] = useState({
    nome: "João Silva",
    email: "doctor@doctor.com",
    especialidade: "Clínico Geral",
    crm: "1234567",
    telefone: "(84) 99999-8888",
    genero: "Masculino",
    cpf: "123.456.789-00",
  });

  const [titulo, setTitulo] = useState("Dr.");

  useEffect(() => {
    if (doctor.genero === "Masculino") {
      setTitulo("Dr.");
    } else if (doctor.genero === "Feminino") {
      setTitulo("Dra.");
    } else {
      const random = outrosTitulos[Math.floor(Math.random() * outrosTitulos.length)];
      setTitulo(random);
    }
  }, [doctor.genero]);

  function handleChange(e) {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSave() {
    setIsEditing(false);
    // Aqui você pode adicionar lógica para salvar no backend, se desejar
  }

  function getInitials(nome) {
    if (!nome) return "";
    const ignorar = ["dr", "dra", "dr.", "dra."];
    const nomes = nome
      .trim()
      .split(" ")
      .filter(n => !ignorar.includes(n.toLowerCase()));
    if (nomes.length === 0) return "";
    if (nomes.length === 1) return nomes[0][0].toUpperCase();
    return (nomes[0][0] + nomes[nomes.length - 1][0]).toUpperCase();
  }

  return (
    <div className="doctor-profile-bg">
      <header className="doctor-header">
        <h1 className="doctor-logo">Saúde+</h1>
        <button className="doctor-exit-btn">Sair</button>
      </header>

      <main>
        <h2 className="doctor-profile-title">Perfil do Médico</h2>
        <div className="doctor-profile-card">
          <div className="doctor-profile-card-top">
            <div className="doctor-avatar">
              <span>{getInitials(doctor.nome)}</span>
            </div>
            <span className="doctor-specialty-badge">{doctor.especialidade}</span>
          </div>
          <div className="doctor-profile-card-bottom">
            <div className="doctor-name-block">
              {isEditing ? (
                <>
                  <input
                    className="doctor-name"
                    name="nome"
                    value={doctor.nome}
                    onChange={handleChange}
                  />
                  <input
                    className="doctor-crm"
                    name="crm"
                    value={doctor.crm}
                    onChange={handleChange}
                  />
                </>
              ) : (
                <>
                  <span className="doctor-name">{titulo} {doctor.nome}</span>
                  <span className="doctor-crm">CRM: {doctor.crm}</span>
                </>
              )}
            </div>
            <div className="doctor-info-grid">
              <div className="doctor-info-item">
                <span className="doctor-info-label">Email</span>
                {isEditing ? (
                  <input
                    className="doctor-info-value"
                    name="email"
                    value={doctor.email}
                    onChange={handleChange}
                  />
                ) : (
                  <span className="doctor-info-value">{doctor.email}</span>
                )}
              </div>
              <div className="doctor-info-item">
                <span className="doctor-info-label">Telefone</span>
                {isEditing ? (
                  <input
                    className="doctor-info-value"
                    name="telefone"
                    value={doctor.telefone}
                    onChange={handleChange}
                  />
                ) : (
                  <span className="doctor-info-value">{doctor.telefone}</span>
                )}
              </div>
              <div className="doctor-info-item">
                <span className="doctor-info-label">Gênero</span>
                {isEditing ? (
                  <select
                    className="doctor-info-value"
                    name="genero"
                    value={doctor.genero}
                    onChange={handleChange}
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                  </select>
                ) : (
                  <span className="doctor-info-value">{doctor.genero}</span>
                )}
              </div>
              <div className="doctor-info-item">
                <span className="doctor-info-label">CPF</span>
                {isEditing ? (
                  <input
                    className="doctor-info-value"
                    name="cpf"
                    value={doctor.cpf}
                    onChange={handleChange}
                  />
                ) : (
                  <span className="doctor-info-value">{doctor.cpf}</span>
                )}
              </div>
            </div>
            <div className="doctor-profile-actions" style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              {!isEditing && (
                <button className="doctor-edit-btn" onClick={handleEdit}>
                  Editar
                </button>
              )}
              <button
                className="doctor-save-btn"
                onClick={handleSave}
                disabled={!isEditing}
                style={{ opacity: isEditing ? 1 : 0.6, cursor: isEditing ? "pointer" : "not-allowed" }}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Botão Voltar alinhado à direita */}
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", margin: "20px 0 0 0" }}>
        <button
          className="btn-sair"
          onClick={() => navigate(-1)}
        >
          Voltar
        </button>
      </div>

      {/* Rodapé padrão */}
      <footer className="footer" style={{ textAlign: "center", color: "#fff", marginTop: 16 }}>
        Saúde+ © 2025 - Todos os direitos reservados
      </footer>
    </div>
  );
}