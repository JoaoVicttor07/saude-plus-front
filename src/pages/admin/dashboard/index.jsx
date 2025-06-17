import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRound, Stethoscope, Calendar, Plus } from "lucide-react";
import Button from "../../../components/Button";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import PacienteService from "../../../services/PacienteService";
import MedicoService from "../../../services/MedicoService";
import EspecialidadeService from "../../../services/EspecialidadeService";
import ConsultaService from "../../../services/ConsultaService";
import "./style.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [totalPacientes, setTotalPacientes] = useState(0);
  const [totalMedicos, setTotalMedicos] = useState(0);
  const [totalConsultas, setTotalConsultas] = useState(0);
  const [pendentes, setPendentes] = useState(0);
  const [realizadas, setRealizadas] = useState(0);
  const [canceladas, setCanceladas] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [especialidades, setEspecialidades] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    sexo: "",
    telefone: "",
    dataNascimento: "",
    ativo: true,
    crm: "",
    especialidade: "",
    endereco: {
      logradouro: "",
      numero: "",
      bairro: "",
      cep: "",
      cidade: "",
      estado: "",
    },
  });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  useEffect(() => {
    if (showModal) {
      EspecialidadeService.listarTodos()
        .then(setEspecialidades)
        .catch(() => setEspecialidades([]));
    }
  }, [showModal]);

  const openModal = () => {
    setForm({
      nome: "",
      cpf: "",
      email: "",
      senha: "",
      sexo: "",
      telefone: "",
      dataNascimento: "",
      ativo: true,
      crm: "",
      especialidade: "",
      endereco: {
        logradouro: "",
        numero: "",
        bairro: "",
        cep: "",
        cidade: "",
        estado: "",
      },
    });
    setFormError(null);
    setFormSuccess(null);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("endereco.")) {
      const field = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        endereco: { ...prev.endereco, [field]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    setFormSuccess(null);
    try {
      const payload = {
        ...form,
        especialidade: { id: Number(form.especialidade) },
      };
      await MedicoService.cadastrar(payload);
      setFormSuccess("Médico cadastrado com sucesso!");
      setTimeout(() => {
        setShowModal(false);
        setFormSuccess(null);
      }, 1200);
    } catch (err) {
      setFormError("Erro ao cadastrar médico. Verifique os dados.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    PacienteService.listarTodos()
      .then((data) => setTotalPacientes(Array.isArray(data) ? data.length : 0))
      .catch(() => setTotalPacientes(0));

    MedicoService.listarTodos()
      .then((data) => setTotalMedicos(Array.isArray(data) ? data.length : 0))
      .catch(() => setTotalMedicos(0));

    ConsultaService.listarTodas()
      .then((data) => {
        if (Array.isArray(data)) {
          setTotalConsultas(data.length);
          setPendentes(data.filter((c) => c.status === "AGENDADA").length);
          setRealizadas(data.filter((c) => c.status === "REALIZADA").length);
          setCanceladas(data.filter((c) => c.status === "DESMARCADA").length);
        }
      })
      .catch(() => {
        setTotalConsultas(0);
        setPendentes(0);
        setRealizadas(0);
        setCanceladas(0);
      });
  }, []);

  return (
    <div className="admin-container">
      {/* Header */}
      <Header />

      <div className="main---content">
        {/* Page Title */}
        <div className="page-title">
          <h2 className="admin-title">Painel do Administrador</h2>
        </div>

        {/* Dashboard Cards */}
        <div className="dashboard-grid">
          {/* Patients Card */}
          <div className="dashboard--card">
            <div className="card-icon patient-icon">
              <UserRound size={32} />
            </div>
            <div className="cardContent">
              <h3 className="card-value">{totalPacientes}</h3>
              <p className="card-label">Pacientes</p>
            </div>
            <Button
              width="100%"
              background="#3b9b96"
              hoverBackground="#2d7a75"
              borderRadius="0.375rem"
              onClick={() => navigate("/admin/patients")}
              style={{ padding: "1rem" }}
            >
              Ver pacientes
            </Button>
          </div>

          {/* Doctors Card */}
          <div className="dashboard--card">
            <div className="card-icon doctor-icon">
              <Stethoscope size={32} />
            </div>
            <div className="cardContent">
              <h3 className="card-value">{totalMedicos}</h3>
              <p className="card-label">Médicos</p>
            </div>
            <Button
              width="100%"
              background="#3b9b96"
              hoverBackground="#2d7a75"
              borderRadius="0.375rem"
              onClick={() => navigate("/admin/doctors")}
              style={{ padding: "1rem" }}
            >
              Ver médicos
            </Button>
          </div>

          {/* Appointments Card */}
          <div className="dashboard--card appointments-card">
            <div className="card-icon appointment-icon">
              <Calendar size={32} />
            </div>
            <div className="cardContent">
              <h3 className="card-value">{totalConsultas}</h3>
              <p className="card-label">Consultas</p>
              <div className="appointment-stats">
                <div className="stat-item">
                  <span className="stat-badge pending"></span>
                  <span className="stat-label">{pendentes} Pendentes</span>
                </div>
                <div className="stat-item">
                  <span className="stat-badge completed"></span>
                  <span className="stat-label">{realizadas} Realizadas</span>
                </div>
                <div className="stat-item">
                  <span className="stat-badge cancelled"></span>
                  <span className="stat-label">{canceladas} Canceladas</span>
                </div>
              </div>
            </div>
            <Button
              width="100%"
              background="#3b9b96"
              hoverBackground="#2d7a75"
              borderRadius="0.375rem"
              style={{ padding: "1rem" }}
              onClick={() => navigate("/admin/appointments")}
            >
              Ver consultas
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-container">
          <div className="quick-actions-card">
            <h3 className="sectionTitle">Ações rápidas</h3>
            <div className="quick-actions">
              <Button
                background="#3b9b96"
                hoverBackground="#2d7a75"
                fontSize="0.875rem"
                icon={<Plus size={15} />}
                style={{ padding: "0.80rem 1.5rem" }}
                onClick={openModal}
                disabled
              >
                Novo Médico
              </Button>

              {/* <Button
                background="#3b9b96"
                hoverBackground="#2d7a75"
                fontSize="0.875rem"
                icon={<Plus size={15} />}
                style={{ padding: "0.80rem 1.5rem" }}
                onClick={() => navigate("/admin/appointments/create")}
                disabled
              >
                Nova Consulta
              </Button> */}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
      </div>

      {showModal && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.25)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 32,
              minWidth: 340,
              maxWidth: 420,
              width: "100%",
              boxShadow: "0 4px 24px #0002",
            }}
          >
            <h2 style={{ marginBottom: 18, color: "#0d9488" }}>
              Cadastrar Médico
            </h2>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              <input
                name="nome"
                placeholder="Nome completo"
                value={form.nome}
                onChange={handleFormChange}
                required
              />
              <input
                name="cpf"
                placeholder="CPF"
                value={form.cpf}
                onChange={handleFormChange}
                required
              />
              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleFormChange}
                required
              />
              <input
                name="senha"
                placeholder="Senha"
                type="password"
                value={form.senha}
                onChange={handleFormChange}
                required
              />
              <select
                name="sexo"
                value={form.sexo}
                onChange={handleFormChange}
                required
              >
                <option value="">Selecione o sexo</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
              <input
                name="telefone"
                placeholder="Telefone"
                value={form.telefone}
                onChange={handleFormChange}
                required
              />
              <input
                name="dataNascimento"
                type="date"
                placeholder="Data de Nascimento"
                value={form.dataNascimento}
                onChange={handleFormChange}
                required
              />
              <input
                name="crm"
                placeholder="CRM"
                value={form.crm}
                onChange={handleFormChange}
                required
              />
              <select
                name="especialidade"
                value={form.especialidade}
                onChange={handleFormChange}
                required
              >
                <option value="">Selecione a especialidade</option>
                {especialidades.map((esp) => (
                  <option key={esp.id} value={esp.id}>
                    {esp.nome}
                  </option>
                ))}
              </select>
              <input
                name="endereco.logradouro"
                placeholder="Logradouro"
                value={form.endereco.logradouro}
                onChange={handleFormChange}
                required
              />
              <input
                name="endereco.numero"
                placeholder="Número"
                value={form.endereco.numero}
                onChange={handleFormChange}
                required
              />
              <input
                name="endereco.bairro"
                placeholder="Bairro"
                value={form.endereco.bairro}
                onChange={handleFormChange}
                required
              />
              <input
                name="endereco.cep"
                placeholder="CEP"
                value={form.endereco.cep}
                onChange={handleFormChange}
                required
              />
              <input
                name="endereco.cidade"
                placeholder="Cidade"
                value={form.endereco.cidade}
                onChange={handleFormChange}
                required
              />
              <input
                name="endereco.estado"
                placeholder="Estado"
                value={form.endereco.estado}
                onChange={handleFormChange}
                required
              />
              {formError && (
                <div style={{ color: "#c00", marginTop: 4 }}>{formError}</div>
              )}
              {formSuccess && (
                <div style={{ color: "#218838", marginTop: 4 }}>
                  {formSuccess}
                </div>
              )}
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    flex: 1,
                    background: "#eee",
                    border: "none",
                    borderRadius: 6,
                    padding: 10,
                    fontWeight: 600,
                    color: "#444",
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    flex: 1,
                    background: "#10a39b",
                    border: "none",
                    borderRadius: 6,
                    padding: 10,
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  {saving ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
