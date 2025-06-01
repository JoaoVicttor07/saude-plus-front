import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import Button from "../../../components/Button";
import "./PatientDetail.css";

// Mock de dados do paciente
const pacienteMock = {
  id: 1,
  nome: "Ana Paula Souza",
  cpf: "123.456.789-00",
  email: "ana@email.com",
  telefone: "(11) 91234-5678",
  endereco: "Rua das Flores, 123, Centro, 12345-678, São Paulo, SP",
  sexo: "Feminino",
  dataCadastro: "2023-04-15",
  status: "Ativo",
};

// Mock de consultas
const consultasPendentes = [
  {
    id: 1,
    data: "10/06/2025",
    horario: "14:00",
    medico: "Dr. João Almeida",
    especialidade: "Cardiologia",
    local: "Clínica Central - Sala 2",
  },
];
const consultasRealizadas = [
  {
    id: 2,
    data: "01/05/2025",
    horario: "09:30",
    medico: "Dra. Maria Oliveira",
    especialidade: "Dermatologia",
    local: "Clínica Central - Sala 1",
  },
  {
    id: 3,
    data: "15/03/2025",
    horario: "11:00",
    medico: "Dr. Pedro Santos",
    especialidade: "Clínico Geral",
    local: "Clínica Central - Sala 3",
  },
];
const consultasCanceladas = [
  {
    id: 4,
    data: "20/04/2025",
    horario: "16:00",
    medico: "Dr. João Almeida",
    especialidade: "Cardiologia",
    local: "Clínica Central - Sala 2",
    motivo: "Paciente indisposto",
    quemCancelou: "Paciente",
  },
];

function mascararCPF(cpf) {
  return cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})-(\d{2})$/, "$1.$2.$3-$4");
}

function formatarData(dataISO) {
  if (!dataISO) return "";
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

function PatientDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [aba, setAba] = useState("pendentes");

  // Aqui você buscaria os dados reais pelo id

  // Abas de histórico
  const abas = [
    { key: "pendentes", label: "Pendentes", total: consultasPendentes.length },
    { key: "realizadas", label: "Realizadas", total: consultasRealizadas.length },
    { key: "canceladas", label: "Canceladas", total: consultasCanceladas.length },
  ];

  return (
    <div className="admin-patient-detail-bg">
      <Header />
      <main className="admin-patient-detail-main">
        {/* Cabeçalho */}
        <div className="admin-patient-detail-header">
          <div>
            <h2 className="admin-patient-detail-title">Detalhes do Paciente</h2>
            <div className="admin-patient-detail-nome">{pacienteMock.nome}</div>
          </div>
          <div className="admin-patient-detail-actions">
            <Button
              background="#fff"
              color="#2c7a7b"
              border="2px solid #2c7a7b"
              borderRadius="7px"
              fontWeight={600}
              hoverBackground="#e6f4f1"
              onClick={() => navigate("/admin/patients")}
            >
              Voltar à lista de pacientes
            </Button>
            {/* <Button
              background="#fff"
              color="#2c7a7b"
              border="2px solid #2c7a7b"
              borderRadius="7px"
              fontWeight={600}
              hoverBackground="#e6f4f1"
              onClick={() => alert("Agendar Consulta")}
            >
              Agendar Consulta
            </Button> */}
          </div>
        </div>

        {/* Card de dados pessoais */}
        <div className="admin-patient-detail-card">
          <div className="admin-patient-detail-card-row">
            <div>
              <span className="label">Nome:</span>
              <span className="label-text">{pacienteMock.nome}</span>
            </div>
            <div>
              <span className="label">CPF:</span>
              <span className="label-text">{mascararCPF(pacienteMock.cpf)}</span>
            </div>
          </div>
          <div className="admin-patient-detail-card-row">
            <div>
              <span className="label">E-mail:</span>
              <span className="label-text">{pacienteMock.email}</span>
            </div>
            <div>
              <span className="label">Telefone:</span>
              <span className="label-text">{pacienteMock.telefone}</span>
            </div>
          </div>
          <div className="admin-patient-detail-card-row">
            <div>
              <span className="label">Sexo:</span>
              <span className="label-text">{pacienteMock.sexo}</span>
            </div>
            <div>
              <span className="label">Status:</span>
              <span className="label-text">{pacienteMock.status}</span>
            </div>
          </div>
          <div className="admin-patient-detail-card-row">
            <div style={{ flex: 1 }}>
              <span className="label">Endereço:</span>
              <span className="label-text">{pacienteMock.endereco}</span>
            </div>
          </div>
          {/* {pacienteMock.alergias && (
            <div className="admin-patient-detail-card-row">
              <div style={{ flex: 1 }}>
                <span className="label">Alergias/Condições:</span>
                <span>{pacienteMock.alergias}</span>
              </div>
            </div>
          )} */}
          <div className="admin-patient-detail-cadastro">
            Paciente cadastrado em: {formatarData(pacienteMock.dataCadastro)}
          </div>
        </div>

        {/* Abas de histórico */}
        <div className="admin-patient-detail-tabs">
          {abas.map((tab) => (
            <button
              key={tab.key}
              className={`tab-btn${aba === tab.key ? " active" : ""}`}
              onClick={() => setAba(tab.key)}
            >
              {tab.label}
              <span className="tab-count">{tab.total}</span>
            </button>
          ))}
        </div>

        {/* Conteúdo das abas */}
        <div className="admin-patient-detail-tab-content">
          {aba === "pendentes" && (
            <div className="admin-patient-detail-table-block">
              <div className="table-title">Consultas Pendentes</div>
              {consultasPendentes.length === 0 ? (
                <div className="table-empty">Este paciente não possui consultas agendadas.</div>
              ) : (
                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Data</th>
                        <th>Horário</th>
                        <th>Médico</th>
                        <th>Especialidade</th>
                        <th>Local</th>
                        <th>Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {consultasPendentes.map((c, idx) => (
                        <tr key={c.id} className={idx % 2 === 0 ? "linha-par" : "linha-impar"}>
                          <td>{c.data}</td>
                          <td>{c.horario}</td>
                          <td>{c.medico}</td>
                          <td>{c.especialidade}</td>
                          <td>{c.local}</td>
                          <td>
                            <Button
                              background="#fff"
                              color="#2c7a7b"
                              border="1.5px solid #2c7a7b"
                              fontWeight={600}
                              fontSize="14px"
                              height="30px"
                              borderRadius="7px"
                              hoverBackground="#2c7a7b"
                              hoverColor="#fff"
                              onClick={() => navigate(`/admin/appointments/${c.id}`)}
                            >
                              Ver Detalhes
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          {aba === "realizadas" && (
            <div className="admin-patient-detail-table-block">
              <div className="table-title">Consultas Realizadas</div>
              {consultasRealizadas.length === 0 ? (
                <div className="table-empty">Nenhuma consulta realizada.</div>
              ) : (
                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Data</th>
                        <th>Horário</th>
                        <th>Médico</th>
                        <th>Especialidade</th>
                        <th>Local</th>
                        <th>Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {consultasRealizadas.map((c, idx) => (
                        <tr key={c.id} className={idx % 2 === 0 ? "linha-par" : "linha-impar"}>
                          <td>{c.data}</td>
                          <td>{c.horario}</td>
                          <td>{c.medico}</td>
                          <td>{c.especialidade}</td>
                          <td>{c.local}</td>
                          <td>
                            <Button
                              background="#fff"
                              color="#2c7a7b"
                              border="1.5px solid #2c7a7b"
                              fontWeight={600}
                              fontSize="14px"
                              height="30px"
                              borderRadius="7px"
                              hoverBackground="#2c7a7b"
                              hoverColor="#fff"
                              onClick={() => navigate(`/admin/appointments/${c.id}`)}
                            >
                              Ver Detalhes
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          {aba === "canceladas" && (
            <div className="admin-patient-detail-table-block">
              <div className="table-title">Consultas Canceladas</div>
              {consultasCanceladas.length === 0 ? (
                <div className="table-empty">Nenhuma consulta cancelada.</div>
              ) : (
                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Data</th>
                        <th>Horário</th>
                        <th>Médico</th>
                        <th>Especialidade</th>
                        <th>Local</th>
                        <th>Motivo</th>
                        <th>Cancelador</th>
                        <th>Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {consultasCanceladas.map((c, idx) => (
                        <tr key={c.id} className={idx % 2 === 0 ? "linha-par" : "linha-impar"}>
                          <td>{c.data}</td>
                          <td>{c.horario}</td>
                          <td>{c.medico}</td>
                          <td>{c.especialidade}</td>
                          <td>{c.local}</td>
                          <td>{c.motivo || "Cancelada"}</td>
                          <td>{c.quemCancelou}</td>
                          <td>
                            <Button
                              background="#fff"
                              color="#2c7a7b"
                              border="1.5px solid #2c7a7b"
                              fontWeight={600}
                              fontSize="14px"
                              height="30px"
                              borderRadius="7px"
                              hoverBackground="#2c7a7b"
                              hoverColor="#fff"
                              onClick={() => navigate(`/admin/appointments/${c.id}`)}
                            >
                              Ver Detalhes
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Ações rápidas */}
        <div className="admin-patient-detail-actions-quick">
          <Button
            background="#fff"
            color="#2c7a7b"
            border="2px solid #2c7a7b"
            borderRadius="7px"
            fontWeight={600}
            hoverBackground="#e6f4f1"
            onClick={() => alert("Agendar Nova Consulta")}
          >
            Agendar Nova Consulta
          </Button>
          <Button
            background="#fff"
            color="#2c7a7b"
            border="2px solid #2c7a7b"
            borderRadius="7px"
            fontWeight={600}
            hoverBackground="#e6f4f1"
            disabled={consultasPendentes.length === 0}
            onClick={() => alert("Cancelar Consulta Pendente")}
          >
            Cancelar Consulta Pendente
          </Button>
          <Button
            background="#fff"
            color="#2c7a7b"
            border="2px solid #2c7a7b"
            borderRadius="7px"
            fontWeight={600}
            hoverBackground="#e6f4f1"
            disabled={consultasPendentes.length === 0}
            onClick={() => alert("Remarcar Consulta")}
          >
            Remarcar Consulta
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PatientDetail;