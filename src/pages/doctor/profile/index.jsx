import "./style.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import MedicoService from "../../../services/MedicoService";
import Header from "../../../components/header";
import Footer from "../../../components/footer";

export default function DoctorProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    async function fetchDoctor() {
      if (!user?.id) return;
      setLoading(true);
      setError(null);
      try {
        const data = await MedicoService.buscarPorId(user.id);
        setDoctor(data);
      } catch (error) {
        setError("Não foi possível carregar os dados do médico.");
        setDoctor(null);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctor();
  }, [user]);

  function handleChange(e) {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  }

  function handleEdit() {
    setIsEditing(true);
    setSuccessMsg(null);
    setError(null);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const { nome, email, telefone, crm } = doctor;
      const updated = await MedicoService.atualizar(doctor.id, {
        nome,
        email,
        telefone,
        crm,
      });
      setDoctor(updated);
      setIsEditing(false);
      setSuccessMsg("Dados atualizados com sucesso!");
    } catch (err) {
      setError("Erro ao atualizar dados. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  function getInitials(nome) {
    if (!nome) return "";
    const nomes = nome.trim().split(" ");
    if (nomes.length === 1) return nomes[0][0].toUpperCase();
    return (nomes[0][0] + nomes[nomes.length - 1][0]).toUpperCase();
  }

  if (loading) {
    return (
      <div className="doctor-profile-bg">
        <Header />
        <main>
          <h2 className="doctor-profile-title">Perfil do Médico</h2>
          <div className="doctor-profile-loading">Carregando...</div>
        </main>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="doctor-profile-bg">
        <Header />
        <main>
          <h2 className="doctor-profile-title">Perfil do Médico</h2>
          <div className="doctor-profile-error">
            {error || "Não foi possível carregar os dados do médico."}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="doctor-profile-bg">
      <Header />
      <main>
        <div className="doctor-profile-modern-card">
          <div className="doctor-profile-avatar-block">
            <div className="doctor-profile-avatar">
              {getInitials(doctor.nome)}
            </div>
            <div className="doctor-profile-info">
              <span className="doctor-profile-name">{doctor.nome}</span>
              <span className="doctor-profile-specialty">
                {doctor.especialidade?.nome || doctor.especialidade || ""}
              </span>
              <span className="doctor-profile-crm">CRM: {doctor.crm}</span>
            </div>
          </div>
          <form
            className="doctor-profile-form"
            onSubmit={e => {
              e.preventDefault();
              if (isEditing) handleSave();
            }}
            autoComplete="off"
          >
            <div className="doctor-profile-fields">
              <div className="doctor-profile-field">
                <label>Nome</label>
                {isEditing ? (
                  <input
                    name="nome"
                    value={doctor.nome}
                    onChange={handleChange}
                    required
                    maxLength={80}
                  />
                ) : (
                  <span>{doctor.nome}</span>
                )}
              </div>
              <div className="doctor-profile-field">
                <label>Email</label>
                {isEditing ? (
                  <input
                    name="email"
                    type="email"
                    value={doctor.email}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  <span>{doctor.email}</span>
                )}
              </div>
              <div className="doctor-profile-field">
                <label>Telefone</label>
                {isEditing ? (
                  <input
                    name="telefone"
                    value={doctor.telefone}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  <span>{doctor.telefone}</span>
                )}
              </div>
              <div className="doctor-profile-field">
                <label>CRM</label>
                {isEditing ? (
                  <input
                    name="crm"
                    value={doctor.crm}
                    onChange={handleChange}
                    required
                    maxLength={30}
                  />
                ) : (
                  <span>{doctor.crm}</span>
                )}
              </div>
              <div className="doctor-profile-field">
                <label>CPF</label>
                <span>{doctor.cpf}</span>
              </div>
            </div>
            {error && (
              <div className="doctor-profile-error">{error}</div>
            )}
            {successMsg && (
              <div className="doctor-profile-success">{successMsg}</div>
            )}
            <div className="doctor-profile-btns">
              {!isEditing && (
                <button
                  type="button"
                  className="doctor-profile-btn edit"
                  onClick={handleEdit}
                >
                  Editar
                </button>
              )}
              <button
                type="submit"
                className="doctor-profile-btn save"
                disabled={!isEditing || saving}
              >
                {saving ? "Salvando..." : "Salvar"}
              </button>
              <button
                type="button"
                className="doctor-profile-btn back"
                onClick={() => navigate(-1)}
              >
                Voltar
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}