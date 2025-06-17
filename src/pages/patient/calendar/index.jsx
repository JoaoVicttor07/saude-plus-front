import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeartbeat,
  FaUserMd,
  FaCalendarAlt,
  FaArrowLeft,
  FaCheck,
  FaSpinner,
} from "react-icons/fa";
import Header from "../../../components/header";
import Button from "../../../components/Button";
import Modal from "../../../components/modalConfirmation";
import Footer from "../../../components/footer";
import {} from "../../../context/AuthContext";
import AppointmentService from "../../../services/AppointmentService";
import MedicoService from "../../../services/MedicoService";
import { useAuth } from "../../../context/AuthContext";
import "./style.css";

// const ESPECIALIDADES = [
//   { id: 1, nome: "Cardiologia", icon: <FaHeartbeat /> },
//   { id: 2, nome: "Dermatologia", icon: <FaUserMd /> },
//   { id: 3, nome: "Ortopedia", icon: <FaUserMd /> },
// ];

// const MEDICOS = [
//   { id: 1, nome: "Dr. João Silva", especialidade: 1, local: "Clínica Central" },
//   { id: 2, nome: "Dra. Maria Souza", especialidade: 2, local: "Clínica Sul" },
//   { id: 3, nome: "Dr. Pedro Lima", especialidade: 1, local: "Clínica Norte" },
// ];

// Helper para mapear ícones com base no nome da especialidade (case-insensitive)
const getEspecialidadeIcon = (nomeEspecialidade) => {
  if (!nomeEspecialidade) return <FaUserMd />;
  const lowerNome = nomeEspecialidade.toLowerCase();
  if (lowerNome.includes("cardiologia")) return <FaHeartbeat />;
  if (lowerNome.includes("dermatologia")) return <FaUserMd />;
  if (lowerNome.includes("pediatria")) return <FaUserMd />;
  if (lowerNome.includes("ortopedia")) return <FaUserMd />;
  return <FaUserMd />;
};

// const SLOTS = {
//   "2025-06-20": ["09:00", "10:00", "11:00"],
//   "2025-06-21": ["09:30", "10:30"],
//   // Adicione mais datas e horários mockados conforme necessário para teste
//   // Lembre-se que a data atual é June 15, 2025, então use datas futuras.
//   "2025-06-16": ["07:00", "08:00", "14:00", "15:00"],
//   "2025-06-17": ["07:30", "08:30", "14:30", "15:30"],
// };

// Função para gerar horários padrão para um dia
const generateTimeSlots = (dateISO) => {
  const slots = [];
  const startHour = 8;
  const numberOfSlots = 8;
  const consultationDurationHours = 1;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDateParts = dateISO.split("-");
  const selectedDateObj = new Date(
    parseInt(selectedDateParts[0]),
    parseInt(selectedDateParts[1]) - 1,
    parseInt(selectedDateParts[2])
  );
  selectedDateObj.setHours(0, 0, 0, 0);

  if (selectedDateObj < today) {
    return [];
  }

  for (let i = 0; i < numberOfSlots; i++) {
    const hour = startHour + i * consultationDurationHours;
    if (hour >= 17) {
    }

    const time = `${String(hour).padStart(2, "0")}:00`;

    // Não mostrar horários que já passaram no dia atual
    if (selectedDateObj.getTime() === today.getTime()) {
      const now = new Date();
      const currentHour = now.getHours();
      if (hour <= currentHour) {
        continue;
      }
    }
    slots.push(time);
  }
  return slots;
};

function PatientCalendar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [step, setStep] = useState(1);

  const [apiEspecialidades, setApiEspecialidades] = useState([]);
  const [selectedEspecialidade, setSelectedEspecialidade] = useState(null);
  const [loadingEspecialidades, setLoadingEspecialidades] = useState(true);
  const [errorEspecialidades, setErrorEspecialidades] = useState("");

  const [apiMedicos, setApiMedicos] = useState([]);
  const [selectedMedico, setSelectedMedico] = useState(null);
  const [loadingMedicos, setLoadingMedicos] = useState(false);
  const [errorMedicos, setErrorMedicos] = useState("");

  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [erroGeral, setErroGeral] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

  const diasDoMes = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().slice(0, 10);
  });

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        setLoadingEspecialidades(true);
        setErrorEspecialidades("");
        const data = await AppointmentService.getSpecialties();
        setApiEspecialidades(data || []);
      } catch (err) {
        setErrorEspecialidades(
          "Não foi possível carregar as especialidades. Tente novamente mais tarde."
        );
        console.error("Erro ao buscar especialidades:", err);
        setApiEspecialidades([]);
      } finally {
        setLoadingEspecialidades(false);
      }
    };
    fetchEspecialidades();
  }, []);

  const handleEscolherEspecialidade = async (esp) => {
    setSelectedEspecialidade(esp);
    setSelectedMedico(null);
    setApiMedicos([]);
    setErrorMedicos("");
    setLoadingMedicos(true);
    setStep(2);
    setDataSelecionada("");
    setHorarioSelecionado("");
    setAvailableSlots([]);

    try {
      const data = await MedicoService.buscarPorEspecialidade(esp.nome);
      setApiMedicos(data || []);
      if (!data || data.length === 0) {
        setErrorMedicos(`Nenhum médico encontrado para ${esp.nome}.`);
      }
    } catch (err) {
      setErrorMedicos(
        `Erro ao carregar médicos para ${esp.nome}. Verifique o console.`
      );
      console.error(`Erro ao buscar médicos para ${esp.nome}:`, err);
      setApiMedicos([]);
    } finally {
      setLoadingMedicos(false);
    }
  };

  const handleEscolherMedico = (m) => {
    setSelectedMedico(m);
    setDataSelecionada("");
    setHorarioSelecionado("");
    setAvailableSlots([]);
    setStep(3);
  };

  const handleEscolherData = (dataISO) => {
    setDataSelecionada(dataISO);
    setHorarioSelecionado("");
    setErroGeral("");

    const slotsForDate = generateTimeSlots(dataISO);
    setAvailableSlots(slotsForDate);

    if (slotsForDate.length === 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDateParts = dataISO.split("-");
      const selectedDateObj = new Date(
        parseInt(selectedDateParts[0]),
        parseInt(selectedDateParts[1]) - 1,
        parseInt(selectedDateParts[2])
      );
      selectedDateObj.setHours(0, 0, 0, 0);

      if (selectedDateObj < today) {
        setErroGeral("Não é possível agendar para datas passadas.");
      } else {
        setErroGeral(
          "Nenhum horário padrão disponível para esta data ou todos os horários já passaram."
        );
      }
    }
  };

  const handleEscolherHorario = (hora) => {
    setHorarioSelecionado(hora);
    setErroGeral("");
  };

  const handleConfirmar = async () => {
    if (!selectedMedico || !dataSelecionada || !horarioSelecionado) {
      setErroGeral("Por favor, selecione médico, data e horário.");
      return;
    }
    if (!user || !user.id) {
      setErroGeral("Paciente não identificado. Faça login novamente.");
      return;
    }
    setErroGeral("");
    setIsConfirming(true);

    const inicioConsulta = `${dataSelecionada}T${horarioSelecionado}:00`;
    const consultaData = {
      inicio: inicioConsulta,
      valor: null,
      medico: { id: selectedMedico.id },
      paciente: { id: user.id },
    };

    try {
      const response = await AppointmentService.createAppointment(consultaData);
      console.log("Consulta agendada:", response);
      setShowSuccess(true);
    } catch (error) {
      console.error("Erro ao confirmar agendamento:", error.response || error);
      const apiErrorMessage =
        error.response?.data?.message || error.response?.data?.error;
      setErroGeral(
        apiErrorMessage ||
          "Falha ao agendar. O horário pode já estar ocupado ou houve um erro no servidor."
      );
    } finally {
      setIsConfirming(false);
    }
  };

  const handleVoltar = () => {
    setErroGeral("");
    setErrorMedicos("");
    setErrorEspecialidades("");
    if (step === 3) {
      setStep(2);
      setDataSelecionada("");
      setHorarioSelecionado("");
      setAvailableSlots([]);
    } else if (step === 2) {
      setStep(1);
      setSelectedMedico(null);
      setApiMedicos([]);
    }
  };

  return (
    <div className="calendar-bg">
      <Header />
      <main className="calendar----container">
        <h2 className="calendar-title">Agendar Consulta</h2>
        <p className="calendar-desc">
          Selecione a especialidade e o médico, depois escolha um horário.
        </p>

        {/**/}
        {step === 1 && (
          <section className="calendar-step">
            <h3>1. Selecione a especialidade desejada</h3>
            {loadingEspecialidades && (
              <p>
                <FaSpinner className="fa-spin" /> Carregando especialidades...
              </p>
            )}
            {errorEspecialidades && (
              <p className="calendar-erro">{errorEspecialidades}</p>
            )}
            {!loadingEspecialidades &&
              !errorEspecialidades &&
              apiEspecialidades.length === 0 && (
                <p>Nenhuma especialidade encontrada.</p>
              )}
            {!loadingEspecialidades &&
              !errorEspecialidades &&
              apiEspecialidades.length > 0 && (
                <div className="calendar-especialidades">
                  {apiEspecialidades.map((esp) => (
                    <button
                      key={esp.id}
                      className={`calendar-chip${
                        selectedEspecialidade?.id === esp.id ? " selected" : ""
                      }`}
                      onClick={() => handleEscolherEspecialidade(esp)}
                      disabled={
                        loadingMedicos && selectedEspecialidade?.id === esp.id
                      }
                      aria-label={esp.nome}
                    >
                      {getEspecialidadeIcon(esp.nome)} {esp.nome}
                      {selectedEspecialidade?.id === esp.id &&
                        loadingMedicos && (
                          <FaSpinner className="fa-spin calendar-loading-inline" />
                        )}
                      {selectedEspecialidade?.id === esp.id &&
                        !loadingMedicos &&
                        apiMedicos.length > 0 && (
                          <FaCheck className="calendar-check" />
                        )}
                    </button>
                  ))}
                </div>
              )}
          </section>
        )}

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

        {/**/}
        {step === 2 && selectedEspecialidade && (
          <section className="calendar-step">
            <h3>
              2. Agora, selecione o médico para {selectedEspecialidade.nome}
            </h3>
            {loadingMedicos && (
              <p>
                <FaSpinner className="fa-spin" /> Carregando médicos...
              </p>
            )}
            {errorMedicos && <p className="calendar-erro">{errorMedicos}</p>}
            {!loadingMedicos && !errorMedicos && apiMedicos.length === 0 && (
              <p>
                Nenhum médico disponível para {selectedEspecialidade.nome} no
                momento.
              </p>
            )}
            {!loadingMedicos && !errorMedicos && apiMedicos.length > 0 && (
              <div className="calendar-medicos">
                {apiMedicos.map((m) => (
                  <button
                    key={m.id}
                    className={`calendar-medico-card${
                      selectedMedico?.id === m.id ? " selected" : ""
                    }`}
                    onClick={() => handleEscolherMedico(m)}
                    aria-label={m.nome}
                  >
                    <FaUserMd className="calendar-medico-avatar" />
                    <div>
                      <div className="calendar-medico-nome">{m.nome}</div>
                      <div className="calendar-medico-info">
                        {/**/}
                        {m.especialidade?.nome || selectedEspecialidade.nome}
                        {/**/}
                        {m.clinica?.nomeFantasia &&
                          ` • ${m.clinica.nomeFantasia}`}
                      </div>
                    </div>
                    {selectedMedico?.id === m.id && (
                      <FaCheck className="calendar-check" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        {/**/}
        {step === 3 && selectedMedico && (
          <section className="calendar-step">
            <h3>
              3. Escolha data e horário disponíveis para {selectedMedico.nome}
            </h3>
            <div className="calendar-dias">
              {diasDoMes.map((dataISO) => (
                <button
                  key={dataISO}
                  className={`calendar-dia-btn${
                    dataSelecionada === dataISO ? " selected" : ""
                  }`}
                  onClick={() => handleEscolherData(dataISO)}
                >
                  <FaCalendarAlt />{" "}
                  {new Date(dataISO + "T00:00:00Z").toLocaleDateString(
                    "pt-BR",
                    { day: "2-digit", month: "short", timeZone: "UTC" }
                  )}
                </button>
              ))}
            </div>
            {dataSelecionada && (
              <div className="calendar-horarios">
                {availableSlots.length > 0 ? (
                  availableSlots.map((hora) => (
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
                    {erroGeral ||
                      "Nenhum horário disponível para esta data. Escolha outra data ou verifique se todos os horários já passaram."}
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/**/}
        {erroGeral && <div className="calendar-erro">{erroGeral}</div>}

        {/**/}
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
              disabled={isConfirming}
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
              disabled={!horarioSelecionado || isConfirming}
            >
              {isConfirming ? (
                <FaSpinner className="fa-spin" />
              ) : (
                "Confirmar Agendamento"
              )}
            </Button>
          )}
        </div>

        {showSuccess && selectedMedico && (
          <Modal
            open={showSuccess}
            title="Consulta Agendada!"
            onClose={() => {
              setShowSuccess(false);
              setStep(1);
              setSelectedEspecialidade(null);
              setSelectedMedico(null);
              setDataSelecionada("");
              setHorarioSelecionado("");
              setAvailableSlots([]);
              navigate("/dashboard");
            }}
            buttonText="Voltar ao Dashboard"
          >
            <p>
              Sua consulta com <b>{selectedMedico.nome}</b> foi marcada para{" "}
              <b>
                {new Date(dataSelecionada + "T00:00:00Z").toLocaleDateString(
                  "pt-BR",
                  { timeZone: "UTC" }
                )}
              </b>{" "}
              às <b>{horarioSelecionado}</b>.<br />
            </p>
          </Modal>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default PatientCalendar;
