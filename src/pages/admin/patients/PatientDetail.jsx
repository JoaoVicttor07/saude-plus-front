import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header";
import Button from "../../../components/Button";
import Footer from "../../../components/footer";
import "./PatientDetail.css";

// Mock de dados do paciente
const paciente = {
  id: 1,
  nome: "Ana Paula Souza",
  cpf: "123.456.789-00",
  email: "ana@email.com",
  telefone: "(11) 91234-5678",
  status: "Ativo",
  dataCadastro: "2023-04-15",
  totalConsultas: 3,
};

// Mock de consultas
const consultas = [
  {
    id: 1,
    data: "10/06/2025",
    horario: "14:00",
    medico: "Dr. João Almeida",
    status: "Agendada",
  },
  {
    id: 2,
    data: "01/05/2025",
    horario: "09:30",
    medico: "Dra. Maria Oliveira",
    status: "Cancelada",
  },
  {
    id: 3,
    data: "15/03/2025",
    horario: "11:00",
    medico: "Dr. Pedro Santos",
    status: "Realizada",
  },
];

const statusAbas = [
  { key: "Agendada", label: "Agendadas" },
  { key: "Realizada", label: "Realizadas" },
  { key: "Cancelada", label: "Canceladas" },
];

function mascararCPF(cpf) {
  return cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})-(\d{2})$/, "$1.$2.$3-$4");
}

function formatarData(dataISO) {
  if (!dataISO) return "";
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

export default function PatientDetail() {
  const navigate = useNavigate();
  const [aba, setAba] = useState("Agendada");

  const consultasFiltradas = consultas.filter((c) => c.status === aba);

  return (
    <div className="patient-detail-wf-bg">
      <Header />
      <main className="patient-detail-wf-main">
        {/* Cabeçalho */}
        <div className="patient-detail-wf-header">
          <h1 className="patient-detail-wf-title">Detalhes do Paciente</h1>
          <Button
            background="#fff"
            color="#247575"
            border="2px solid #247575"
            borderRadius="7px"
            fontWeight={600}
            fontSize="1rem"
            hoverBackground="#e6f4f1"
            onClick={() => navigate(-1)}
            style={{ marginRight: 16 }}
          >
            Voltar à lista de pacientes
          </Button>
        </div>

        {/* Identificação */}
        <div className="patient-detail-wf-identificacao">
          <span className="patient-detail-wf-nome">{paciente.nome}</span>
          <span
            className={`patient-detail-wf-status ${
              paciente.status === "Ativo" ? "ativo" : "inativo"
            }`}
          >
            {paciente.status}
          </span>
        </div>
        <div className="patient-detail-wf-cadastrado">
          Cadastrado desde: {formatarData(paciente.dataCadastro)}
        </div>

        {/* Card de informações básicas */}
        <div className="patient-detail-wf-card">
          <div className="patient-detail-wf-avatar">
            <span
              className="material-icons"
              style={{ fontSize: 48, color: "#b2b2b2" }}
            >
              person
            </span>
          </div>
          <div className="patient-detail-wf-info-list">
            <div>
              <span className="label">Nome:</span> {paciente.nome}
            </div>
            <div>
              <span className="label">CPF:</span> {mascararCPF(paciente.cpf)}
            </div>
            <div>
              <span className="label">E-mail:</span> {paciente.email}
            </div>
            <div>
              <span className="label">Telefone:</span> {paciente.telefone}
            </div>
          </div>
        </div>

        {/* Blocos de resumo e ações */}
        <div className="patient-detail-wf-resumo-acoes">
          <div className="patient-detail-wf-resumo">
            <div className="patient-detail-wf-resumo-bloco">
              <div className="resumo-label">Status</div>
              <div className="resumo-valor">{paciente.status}</div>
            </div>
            <div className="patient-detail-wf-resumo-bloco">
              <div className="resumo-label">Data de Cadastro</div>
              <div className="resumo-valor">
                {formatarData(paciente.dataCadastro)}
              </div>
            </div>
            {/* <div className="patient-detail-wf-resumo-bloco">
              <div className="resumo-label">Total de Consultas</div>
              <div className="resumo-valor">{paciente.totalConsultas}</div>
            </div> */}
          </div>
          <div className="patient-detail-wf-acoes">
            <Button
              background="#fff"
              color="#247575"
              border="2px solid #247575"
              borderRadius="7px"
              fontWeight={600}
              hoverBackground="#e6f4f1"
              onClick={() => alert("Agendar Nova Consulta")}
            >
              Agendar Nova Consulta
            </Button>
            <Button
              background="#fff"
              color="#247575"
              border="2px solid #247575"
              borderRadius="7px"
              fontWeight={600}
              fontSize="1rem"
              hoverBackground="#e6f4f1"
              onClick={() => alert("Desativar/Ativar Paciente")}
            >
              {paciente.status === "Ativo"
                ? "Desativar Paciente"
                : "Ativar Paciente"}
            </Button>
          </div>
        </div>

        {/* Histórico de Consultas */}
        <div className="patient-detail-wf-historico">
          <h2 className="patient-detail-wf-historico-title">
            Histórico de Consultas
          </h2>
          <div className="patient-detail-wf-abas">
            {statusAbas.map((tab) => (
              <button
                key={tab.key}
                className={`patient-detail-wf-aba${
                  aba === tab.key ? " active" : ""
                }`}
                onClick={() => setAba(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="patient-detail-wf-tabela-container">
            <table className="patient-detail-wf-tabela">
              <thead>
                <tr>
                  <th>Data da Consulta</th>
                  <th>Horário</th>
                  <th>Médico</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Ação</th>
                </tr>
              </thead>
              <tbody>
                {consultasFiltradas.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="patient-detail-wf-tabela-vazia">
                      Nenhuma consulta encontrada.
                    </td>
                  </tr>
                ) : (
                  consultasFiltradas.map((c, idx) => (
                    <tr
                      key={c.id}
                      className={idx % 2 === 0 ? "linha-par" : "linha-impar"}
                    >
                      <td>{c.data}</td>
                      <td>{c.horario}</td>
                      <td>{c.medico}</td>
                      <td>
                        <span
                          className={`patient-detail-wf-status-badge ${c.status.toLowerCase()}`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        {c.status === "Agendada" && (
                          <Button
                            background="#fff"
                            color="#247575"
                            border="2px solid #247575"
                            borderRadius="7px"
                            fontWeight={600}
                            fontSize="1rem"
                            hoverBackground="#fbe9e7"
                            hoverColor="#d32f2f"
                            onClick={() => alert("Cancelar consulta")}
                          >
                            Cancelar
                          </Button>
                        )}
                        {c.status === "Realizada" && (
                          <Button
                            background="#fff"
                            color="#247575"
                            border="2px solid #247575"
                            borderRadius="7px"
                            fontWeight={600}
                            fontSize="1rem"
                            hoverBackground="#e6f4f4"
                            onClick={() => alert("Ver detalhes da consulta")}
                          >
                            Ver Detalhes
                          </Button>
                        )}
                        {c.status === "Cancelada" && (
                          <Button
                            background="#fff"
                            color="#247575"
                            border="2px solid #247575"
                            borderRadius="7px"
                            fontWeight={600}
                            fontSize="1rem"
                            hoverBackground="#e6f4f4"
                            onClick={() => alert("Ver detalhes da consulta")}
                          >
                            Ver Detalhes
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
      </main>
      <Footer />
    </div>
  );
}
