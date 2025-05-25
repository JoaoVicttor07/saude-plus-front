import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

function DoctorProfile() {
  const [doctor, setDoctor] = useState({
    nome: "Dr. João Silva",
    email: "doctor@doctor.com",
    especialidade: "Clínico Geral",
    crm: "1234567",
    telefone: "(84) 99999-8888",
    clinica: "Clínica Central",
    observacao: "",
    foto: null,
  });

  // Para mostrar a imagem selecionada
  const [preview, setPreview] = useState(null);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDoctor({ ...doctor, foto: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleObservacaoChange = (e) => {
    setDoctor({ ...doctor, observacao: e.target.value });
  };

  return (
    <div className="doctor-profile-container">
      <h2>Perfil do Médico</h2>
      <div className="profile-info">
        <div className="profile-photo-section">
          <label htmlFor="foto" className="profile-photo-label">
            {preview ? (
              <img src={preview} alt="Foto de perfil" className="profile-photo" />
            ) : (
              <div className="profile-photo-placeholder">Adicionar foto</div>
            )}
            <input
              type="file"
              id="foto"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFotoChange}
            />
          </label>
        </div>
        <p><strong>Nome:</strong> {doctor.nome}</p>
        <p><strong>Email:</strong> {doctor.email}</p>
        <p><strong>Especialidade:</strong> {doctor.especialidade}</p>
        <p><strong>CRM:</strong> {doctor.crm}</p>
        <p><strong>Telefone:</strong> {doctor.telefone}</p>
        <p><strong>Clínica:</strong> {doctor.clinica}</p>
        <div className="profile-observacao">
          <label htmlFor="observacao"><strong>Observação:</strong></label>
          <textarea
            id="observacao"
            value={doctor.observacao}
            onChange={handleObservacaoChange}
            placeholder="Digite uma observação sobre você..."
            rows={3}
          />
        </div>
      </div>
      <nav className="doctor-nav">
        <Link to="/doctor/dashboard">Dashboard</Link> {" "}
      </nav>
    </div>
  );
}

export default DoctorProfile; 