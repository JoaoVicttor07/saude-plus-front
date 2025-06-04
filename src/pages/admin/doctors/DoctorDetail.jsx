import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import Button from "../../../components/Button";
import "./DoctorDetail.css";

// Mock de médicos
const medicosMock = [
  {
    id: 1,
    nome: "Dr. João Almeida",
    crm: "123456-SP",
    especialidade: "Cardiologia",
    telefone: "(11) 91234-5678",
    endereco: "Rua das Flores, 123 - São Paulo/SP",
    status: "Ativo",
    dataCadastro: "10/01/2024",
  },
  {
    id: 2,
    nome: "Dra. Maria Oliveira",
    crm: "654321-RJ",
    especialidade: "Pediatria",
    telefone: "(21) 99876-5432",
    endereco: "Av. Brasil, 456 - Rio de Janeiro/RJ",
    status: "Ativo",
    dataCadastro: "15/02/2024",
  },
  {
    id: 3,
    nome: "Dr. Pedro Santos",
    crm: "789123-MG",
    especialidade: "Ortopedia",
    telefone: "(31) 98888-1234",
    endereco: "Rua Minas, 789 - Belo Horizonte/MG",
    status: "Inativo",
    dataCadastro: "20/03/2024",
  },
];

// Mock de consultas
const consultasMock = [
  {
    id: 1,
    medicoId: 1,
    data: "12/06/2025",
    horario: "14:00",
    paciente: "Ana Paula Souza",
    localidade: "Clínica Central",
    status: "Pendente",
  },
  {
    id: 2,
    medicoId: 1,
    data: "10/06/2025",
    horario: "09:00",
    paciente: "Carlos Silva",
    localidade: "Clínica Central",
    status: "Realizada",
  },
  {
    id: 3,
    medicoId: 1,
    data: "09/06/2025",
    horario: "11:00",
    paciente: "Maria Clara",
    localidade: "Clínica Central",
    status: "Cancelada",
  },
  {
    id: 4,
    medicoId: 2,
    data: "15/06/2025",
    horario: "10:00",
    paciente: "João Pedro",
    localidade: "Clínica Zona Sul",
    status: "Pendente",
  },
];

export default function DoctorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Pendentes");

  const medico = medicosMock.find((m) => m.id === Number(id));
  if (!medico) {
    return (
      <div className="doctor-detail-bg">
        <Header />
        <main className="doctor-detail-main">
          <h2>Médico não encontrado.</h2>
          <Button onClick={() => navigate(-1)}>Voltar</Button>
        </main>
        <Footer />
      </div>
    );
  }

  // Filtra consultas deste médico e da aba ativa
  const consultasFiltradas = consultasMock.filter(
    (c) =>
      c.medicoId === medico.id &&
      ((activeTab === "Pendentes" && c.status === "Pendente") ||
        (activeTab === "Realizadas" && c.status === "Realizada") ||
        (activeTab === "Canceladas" && c.status === "Cancelada"))
  );

  // Badge de status do médico
  const statusBadgeClass =
    "doctor-status-badge " +
    (medico.status === "Ativo" ? "doctor-status-active" : "doctor-status-inactive");

  // Handlers de ação (exemplo)
  const handleAgendarConsulta = () => alert("Agendar nova consulta para " + medico.nome);
  const handleCancelarConsulta = (id) => alert("Cancelar consulta " + id);
  const handleRemarcarConsulta = (id) => alert("Remarcar consulta " + id);
  const handleVerDetalhesConsulta = (id) => alert("Ver detalhes da consulta " + id);

  return (
    <div className="doctor-detail-bg">
      <Header />
      <main className="doctor-detail-main">
        {/* Cabeçalho */}
        <div className="doctor-detail-header">
          <div>
            <h2>Detalhes do Médico</h2>
            <span className="doctor-detail-nome">{medico.nome}</span>
          </div>
          <div className="doctor-detail-header-actions">
            <Button
              background="#fff"
              color="#374151"
              fontWeight={600}
              height="32px"
              width="160px"
              hoverBackground="#e6f4f1"
              onClick={() => navigate(-1)}
            >
              Voltar à Lista
            </Button>
            <Button
              background="#14b8a6"
              color="#fff"
              fontWeight={600}
              height="32px"
              width="180px"
              hoverBackground="#0e9488"
              onClick={handleAgendarConsulta}
            >
              Agendar Consulta
            </Button>
          </div>
        </div>

        {/* Card de Dados do Médico */}
        <div className="doctor-detail-card">
          <div className="doctor-detail-grid">
            <div className="doctor-detail-item">
              <span className="doctor-detail-label">Nome:</span>
              <span className="doctor-detail-value">{medico.nome}</span>
            </div>
            <div className="doctor-detail-item">
              <span className="doctor-detail-label">CRM:</span>
              <span className="doctor-detail-value">{medico.crm}</span>
            </div>
            <div className="doctor-detail-item">
              <span className="doctor-detail-label">Especialidade:</span>
              <span className="doctor-detail-value">{medico.especialidade}</span>
            </div>
            <div className="doctor-detail-item">
              <span className="doctor-detail-label">Telefone:</span>
              <span className="doctor-detail-value">{medico.telefone}</span>
            </div>
            <div className="doctor-detail-item">
              <span className="doctor-detail-label">Endereço:</span>
              <span className="doctor-detail-value">{medico.endereco}</span>
            </div>
            <div className="doctor-detail-item">
              <span className="doctor-detail-label">Status:</span>
              <span className={statusBadgeClass}>{medico.status}</span>
            </div>
            <div className="doctor-detail-item">
              <span className="doctor-detail-label">Data de Cadastro:</span>
              <span className="doctor-detail-value">{medico.dataCadastro}</span>
            </div>
          </div>
        </div>

        {/* Abas de Consultas */}
        <div className="doctor-detail-tabs-container">
          <div className="doctor-detail-tabs">
            <button
              className={`doctor-detail-tab ${activeTab === "Pendentes" ? "doctor-detail-tab-active" : ""}`}
              onClick={() => setActiveTab("Pendentes")}
            >
              Pendentes
            </button>
            <button
              className={`doctor-detail-tab ${activeTab === "Realizadas" ? "doctor-detail-tab-active" : ""}`}
              onClick={() => setActiveTab("Realizadas")}
            >
              Realizadas
            </button>
            <button
              className={`doctor-detail-tab ${activeTab === "Canceladas" ? "doctor-detail-tab-active" : ""}`}
              onClick={() => setActiveTab("Canceladas")}
            >
              Canceladas
            </button>
          </div>

          {/* Tabela de Consultas */}
          <div className="doctor-detail-table-container">
            <table className="doctor-detail-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Horário</th>
                  <th>Paciente</th>
                  <th>Localidade</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {consultasFiltradas.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", color: "#888" }}>
                      Nenhuma consulta encontrada.
                    </td>
                  </tr>
                ) : (
                  consultasFiltradas.map((c) => (
                    <tr key={c.id}>
                      <td>{c.data}</td>
                      <td>{c.horario}</td>
                      <td>{c.paciente}</td>
                      <td>{c.localidade}</td>
                      <td>
                        <Button
                          background="#fff"
                          color="#247575"
                          fontWeight={600}
                          border="2px solid #247575"
                          fontSize="14px"
                          height="33px"
                          width="110px"
                          borderRadius="7px"
                          hoverBackground="#247575"
                          hoverColor="#fff"
                          onClick={() => handleVerDetalhesConsulta(c.id)}
                        >
                          Ver Detalhes
                        </Button>
                        {activeTab === "Pendentes" && (
                          <>
                            <Button
                              background="#fff"
                              color="#eab308"
                              border="2px solid #eab308"
                              fontWeight={600}
                              fontSize="14px"
                              height="33px"
                              width="110px"
                              borderRadius="7px"
                              hoverBackground="#eab308"
                              hoverColor="#fff"
                              style={{ marginLeft: 8 }}
                              onClick={() => handleRemarcarConsulta(c.id)}
                            >
                              Remarcar
                            </Button>
                            <Button
                              background="#fff"
                              color="#ef4444"
                              border="2px solid #ef4444"
                              fontWeight={600}
                              fontSize="14px"
                              height="33px"
                              width="110px"
                              borderRadius="7px"
                              hoverBackground="#ef4444"
                              hoverColor="#fff"
                              style={{ marginLeft: 8 }}
                              onClick={() => handleCancelarConsulta(c.id)}
                            >
                              Cancelar
                            </Button>
                          </>
                        )}
                        {activeTab === "Canceladas" && (
                          <Button
                            background="#fff"
                            color="#14b8a6"
                            border="2px solid #14b8a6"
                            fontWeight={600}
                            fontSize="14px"
                            height="33px"
                            width="110px"
                            borderRadius="7px"
                            hoverBackground="#14b8a6"
                            hoverColor="#fff"
                            style={{ marginLeft: 8 }}
                            onClick={() => handleRemarcarConsulta(c.id)}
                          >
                            Reagendar
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Botão fixo de agendar nova consulta */}
        <div className="doctor-detail-bottom-action">
          <Button
            background="#14b8a6"
            color="#fff"
            fontWeight={600}
            height="38px"
            width="220px"
            hoverBackground="#0e9488"
            onClick={handleAgendarConsulta}
          >
            Agendar Nova Consulta
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}