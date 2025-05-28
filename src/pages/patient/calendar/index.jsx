import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeartbeat,
  FaUserMd,
  FaCalendarAlt,
  FaArrowLeft,
  FaCheck,
} from "react-icons/fa";
import Header from "../../../components/header";
import Button from "../../../components/Button";
import Modal from "../../../components/modalConfirmation";
import "./style.css";

const ESPECIALIDADES = [
  { id: 1, nome: "Cardiologia", icon: <FaHeartbeat /> },
  { id: 2, nome: "Dermatologia", icon: <FaUserMd /> },
  { id: 3, nome: "Ortopedia", icon: <FaUserMd /> },
];

const MEDICOS = [
  { id: 1, nome: "Dr. João Silva", especialidade: 1, local: "Clínica Central" },
  { id: 2, nome: "Dra. Maria Souza", especialidade: 2, local: "Clínica Sul" },
  { id: 3, nome: "Dr. Pedro Lima", especialidade: 1, local: "Clínica Norte" },
];

const SLOTS = {
  "2025-05-23": ["09:00", "10:00", "11:00"],
  "2025-05-24": ["09:30", "10:30"],
};

function PatientCalendar() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [especialidade, setEspecialidade] = useState(null);
  const [loadingMedicos, setLoadingMedicos] = useState(false);
  const [medicos, setMedicos] = useState([]);
  const [medico, setMedico] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [erro, setErro] = useState("");

  // Gera datas do mês atual (simples, só para exemplo)
  const diasDoMes = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(2025, 4, 23 + i); // Maio 2025
    return d.toISOString().slice(0, 10);
  });

  // Passo 1: Selecionar especialidade
  const handleEscolherEspecialidade = (esp) => {
    setEspecialidade(esp);
    setLoadingMedicos(true);
    setTimeout(() => {
      setMedicos(MEDICOS.filter((m) => m.especialidade === esp.id));
      setLoadingMedicos(false);
      setStep(2);
    }, 700);
  };

  // Passo 2: Selecionar médico
  const handleEscolherMedico = (m) => {
    setMedico(m);
    setStep(3);
  };

  // Passo 3: Selecionar data e horário
  const handleEscolherData = (data) => {
    setDataSelecionada(data);
    setHorarioSelecionado("");
    setErro("");
  };

  const handleEscolherHorario = (hora) => {
    setHorarioSelecionado(hora);
    setErro("");
  };

  const handleConfirmar = () => {
    // Simula erro se horário for 09:00
    if (horarioSelecionado === "09:00") {
      setErro(
        "Desculpe, esse horário acabou de ser reservado. Por favor, escolha outro."
      );
      setHorarioSelecionado("");
      return;
    }
    setShowSuccess(true);
  };

  const handleVoltar = () => {
    if (step === 3) {
      setStep(2);
      setDataSelecionada("");
      setHorarioSelecionado("");
      setErro("");
    } else if (step === 2) {
      setStep(1);
      setMedico(null);
      setErro("");
    }
  };

  return (
    <div className="calendar-bg">
      <Header />
      <main className="calendar-container">
        <h2 className="calendar-title">Agendar Consulta</h2>
        <p className="calendar-desc">
          Selecione a especialidade e o médico, depois escolha um horário.
        </p>

        {/* Etapa 1 */}
        {step === 1 && (
          <section className="calendar-step">
            <h3>1. Selecione a especialidade desejada</h3>
            <div className="calendar-especialidades">
              {ESPECIALIDADES.map((esp) => (
                <button
                  key={esp.id}
                  className={`calendar-chip${
                    especialidade?.id === esp.id ? " selected" : ""
                  }`}
                  onClick={() => handleEscolherEspecialidade(esp)}
                  disabled={loadingMedicos}
                  aria-label={esp.nome}
                >
                  {esp.icon} {esp.nome}
                  {especialidade?.id === esp.id && loadingMedicos && (
                    <span className="calendar-loading">
                      Carregando médicos...
                    </span>
                  )}
                  {especialidade?.id === esp.id &&
                    !loadingMedicos &&
                    step > 1 && <FaCheck className="calendar-check" />}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Botão voltar para dashboard na etapa 1 */}
        {step === 1 && (
          <Button
            background="#fff"
            color="#2c7a7b"
            fontWeight={600}
            hoverBackground="#f0f8f8"
            height="50px"
            width="50%"
            border="2px solid #2c7a7b"
            onClick={() => navigate("/dashboard")}
            style={{ marginTop: "16px" }}
          >
            <FaArrowLeft /> Voltar para Dashboard
          </Button>
        )}

        {/* Etapa 2 */}
        {step === 2 && (
          <section className="calendar-step">
            <h3>2. Agora, selecione o médico</h3>
            <div className="calendar-medicos">
              {loadingMedicos && <span>Carregando médicos...</span>}
              {!loadingMedicos && medicos.length === 0 && (
                <span>Nenhum médico disponível para esta especialidade.</span>
              )}
              {!loadingMedicos &&
                medicos.map((m) => (
                  <button
                    key={m.id}
                    className={`calendar-medico-card${
                      medico?.id === m.id ? " selected" : ""
                    }`}
                    onClick={() => handleEscolherMedico(m)}
                    disabled={loadingMedicos}
                    aria-label={m.nome}
                  >
                    <FaUserMd className="calendar-medico-avatar" />
                    <div>
                      <div className="calendar-medico-nome">{m.nome}</div>
                      <div className="calendar-medico-info">
                        {
                          ESPECIALIDADES.find((e) => e.id === m.especialidade)
                            ?.nome
                        }{" "}
                        • {m.local}
                      </div>
                    </div>
                    {medico?.id === m.id && step > 2 && (
                      <FaCheck className="calendar-check" />
                    )}
                  </button>
                ))}
            </div>
          </section>
        )}

        {/* Etapa 3 */}
        {step === 3 && (
          <section className="calendar-step">
            <h3>3. Escolha data e horário disponíveis</h3>
            <div className="calendar-dias">
              {diasDoMes.map((data) => (
                <button
                  key={data}
                  className={`calendar-dia-btn${
                    dataSelecionada === data ? " selected" : ""
                  }`}
                  onClick={() => handleEscolherData(data)}
                  disabled={!SLOTS[data]}
                >
                  <FaCalendarAlt /> {new Date(data).toLocaleDateString()}
                </button>
              ))}
            </div>
            {dataSelecionada && (
              <div className="calendar-horarios">
                {SLOTS[dataSelecionada] && SLOTS[dataSelecionada].length > 0 ? (
                  SLOTS[dataSelecionada].map((hora) => (
                    <button
                      key={hora}
                      className={`calendar-horario-btn${
                        horarioSelecionado === hora ? " selected" : ""
                      }`}
                      onClick={() => handleEscolherHorario(hora)}
                    >
                      {hora}
                    </button>
                  ))
                ) : (
                  <div className="calendar-sem-horario">
                    Nenhum horário disponível neste dia. Escolha outra data.
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* Mensagem de erro */}
        {erro && <div className="calendar-erro">{erro}</div>}

        {/* Botões de ação */}
        <div className="calendar-actions">
          {step > 1 && (
            <Button
              background="#fff"
              color="#2c7a7b"
              fontWeight={600}
              hoverBackground="#f0f8f8"
              height="45px"
              width="25%"
              border="2px solid #2c7a7b"
              onClick={handleVoltar}
            >
              <FaArrowLeft /> Voltar
            </Button>
          )}
          {step === 3 && (
            <Button
              fontWeight={600}
              height="45px"
              width="50%"
              onClick={handleConfirmar}
              disabled={!horarioSelecionado}
            >
              Confirmar Agendamento
            </Button>
          )}
        </div>

        {showSuccess && medico && (
          <Modal
            open={showSuccess}
            title="Consulta Agendada!"
            onClose={() => navigate("/dashboard")}
            buttonText="Voltar ao Dashboard"
          >
            <p>
              Sua consulta foi marcada para{" "}
              <b>{new Date(dataSelecionada).toLocaleDateString()}</b> às{" "}
              <b>{horarioSelecionado}</b> com <b>{medico.nome}</b>.<br />
              Um e-mail de confirmação foi enviado.
            </p>
          </Modal>
        )}
        
      </main>
    </div>
  );
}

export default PatientCalendar;
