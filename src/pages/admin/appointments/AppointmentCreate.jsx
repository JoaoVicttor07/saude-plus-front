import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Calendar,
  User,
  Stethoscope,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Plus,
  Check,
} from "lucide-react";
import "./AppointmentCreate.css";
import Button from "../../../components/Button";
import Header from "../../../components/header";
import Footer from "../../../components/footer";

const mockPatients = [
  {
    id: "1",
    name: "Ana Paula Souza",
    phone: "(11) 98765-4321",
    email: "ana.souza@email.com",
    birthDate: "1985-03-15",
  },
  {
    id: "2",
    name: "Carlos Mendes Silva",
    phone: "(11) 99876-5432",
    email: "carlos.mendes@email.com",
    birthDate: "1978-07-22",
  },
  {
    id: "3",
    name: "Maria Lucia Oliveira",
    phone: "(11) 97654-3210",
    email: "maria.oliveira@email.com",
    birthDate: "1992-11-08",
  },
  {
    id: "4",
    name: "Roberto Silva Santos",
    phone: "(11) 96543-2109",
    email: "roberto.santos@email.com",
    birthDate: "1965-12-03",
  },
  {
    id: "5",
    name: "Fernanda Costa Lima",
    phone: "(11) 95432-1098",
    email: "fernanda.lima@email.com",
    birthDate: "1990-05-18",
  },
];

const mockDoctors = [
  {
    id: "1",
    name: "Dr. João Silva",
    specialty: "Cardiologia",
    location: "Clínica Central",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Dra. Maria Santos",
    specialty: "Dermatologia",
    location: "Clínica Norte",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Dr. Pedro Costa",
    specialty: "Ortopedia",
    location: "Clínica Sul",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Dra. Ana Lima",
    specialty: "Neurologia",
    location: "Clínica Central",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const mockAvailability = {
  1: {
    "2025-06-16": ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
    "2025-06-17": ["08:30", "09:30", "10:30", "14:30", "15:30", "16:30"],
    "2025-06-18": ["08:00", "09:00", "11:00", "14:00", "15:00", "17:00"],
    "2025-06-19": ["08:30", "10:00", "10:30", "14:30", "16:00", "16:30"],
    "2025-06-20": ["09:00", "09:30", "11:00", "14:00", "15:30", "17:00"],
  },
  2: {
    "2025-06-16": ["08:30", "09:30", "10:30", "14:30", "15:30", "17:30"],
    "2025-06-17": ["08:00", "09:00", "10:00", "14:00", "16:00", "17:00"],
    "2025-06-18": ["08:30", "10:30", "11:00", "14:30", "15:30", "16:30"],
    "2025-06-19": ["08:00", "09:30", "10:00", "15:00", "16:00", "17:30"],
    "2025-06-20": ["09:00", "10:30", "11:00", "14:00", "15:30", "16:30"],
  },
};

// Funções utilitárias movidas para o escopo do módulo
const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }
  return days;
};

const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

// Componentes de Etapa movidos para fora
const StepIndicator = ({ currentStep }) => (
  <div className="step-indicator">
    <div
      className={`step ${currentStep >= 1 ? "active" : ""} ${
        currentStep > 1 ? "completed" : ""
      }`}
    >
      <div className="step-number">1</div>
      <span>Paciente</span>
    </div>
    <div className="step-line"></div>
    <div
      className={`step ${currentStep >= 2 ? "active" : ""} ${
        currentStep > 2 ? "completed" : ""
      }`}
    >
      <div className="step-number">2</div>
      <span>Médico</span>
    </div>
    <div className="step-line"></div>
    <div
      className={`step ${currentStep >= 3 ? "active" : ""} ${
        currentStep > 3 ? "completed" : ""
      }`}
    >
      <div className="step-number">3</div>
      <span>Data & Hora</span>
    </div>
    <div className="step-line"></div>
    <div className={`step ${currentStep >= 4 ? "active" : ""}`}>
      <div className="step-number">4</div>
      <span>Confirmação</span>
    </div>
  </div>
);

const PatientSelection = ({
  patientSearch,
  setPatientSearch,
  filteredPatients,
  selectedPatient,
  setSelectedPatient,
}) => (
  <div className="selection-container">
    <h3 className="section-title">Selecionar Paciente</h3>
    <div className="search-bar">
      <Search className="search-icon" />
      <input
        type="text"
        placeholder="Buscar paciente por nome ou telefone..."
        value={patientSearch}
        onChange={(e) => setPatientSearch(e.target.value)}
        className="search-input"
      />
    </div>
    <div className="selection-list">
      {filteredPatients.map((patient) => (
        <div
          key={patient.id}
          className={`selection-item ${
            selectedPatient?.id === patient.id ? "selected" : ""
          }`}
          onClick={() => setSelectedPatient(patient)}
        >
          <div className="item-avatar">
            <User />
          </div>
          <div className="item-info">
            <h4>{patient.name}</h4>
            <p>{patient.phone}</p>
            <p className="item-detail">{patient.email}</p>
          </div>
          {selectedPatient?.id === patient.id && (
            <div className="selection-check">
              <Check />
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const DoctorSelection = ({
  doctorSearch,
  setDoctorSearch,
  filteredDoctors,
  selectedDoctor,
  setSelectedDoctor,
}) => (
  <div className="selection-container">
    <h3 className="section-title">Selecionar Médico</h3>
    <div className="search-bar">
      <Search className="search-icon" />
      <input
        type="text"
        placeholder="Buscar médico por nome ou especialidade..."
        value={doctorSearch}
        onChange={(e) => setDoctorSearch(e.target.value)}
        className="search-input"
      />
    </div>
    <div className="selection-list">
      {filteredDoctors.map((doctor) => (
        <div
          key={doctor.id}
          className={`selection-item ${
            selectedDoctor?.id === doctor.id ? "selected" : ""
          }`}
          onClick={() => setSelectedDoctor(doctor)}
        >
          <div className="item-avatar">
            <Stethoscope />
          </div>
          <div className="item-info">
            <h4>{doctor.name}</h4>
            <p>{doctor.specialty}</p>
            <p className="item-detail">
              <MapPin className="detail-icon" />
              {doctor.location}
            </p>
          </div>
          {selectedDoctor?.id === doctor.id && (
            <div className="selection-check">
              <Check />
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const DateTimeSelection = ({
  currentMonth,
  setCurrentMonth,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  isDateAvailable,
  getAvailableSlots,
}) => {
  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <div className="datetime-container">
      <h3 className="section-title">Selecionar Data e Horário</h3>
      <div className="calendar---container">
        <div className="calendar-header">
          <button
            className="calendar-nav"
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() - 1
                )
              )
            }
          >
            <ChevronLeft />
          </button>
          <h4 className="calendar-title">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h4>
          <button
            className="calendar-nav"
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() + 1
                )
              )
            }
          >
            <ChevronRight />
          </button>
        </div>
        <div className="calendar-grid">
          {dayNames.map((day) => (
            <div key={day} className="calendar-day-header">
              {day}
            </div>
          ))}
          {days.map((day, index) => (
            <div
              key={index}
              className={`calendar-day ${day ? "valid" : "empty"} ${
                day && isDateAvailable(day) ? "available" : ""
              } ${
                day &&
                selectedDate &&
                formatDate(day) === formatDate(selectedDate)
                  ? "selected"
                  : ""
              }`}
              onClick={() => {
                if (day && isDateAvailable(day)) {
                  setSelectedDate(day);
                  setSelectedTime(null);
                }
              }}
            >
              {day ? day.getDate() : ""}
            </div>
          ))}
        </div>
      </div>
      {selectedDate && (
        <div className="time-slots-container">
          <h4 className="time-slots-title">
            Horários disponíveis para {selectedDate.toLocaleDateString("pt-BR")}
          </h4>
          <div className="time-slots-grid">
            {getAvailableSlots(selectedDate).map((time) => (
              <button
                key={time}
                className={`time-slot ${
                  selectedTime === time ? "selected" : ""
                }`}
                onClick={() => setSelectedTime(time)}
              >
                <Clock className="time-icon" />
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ConfirmationStep = ({
  selectedPatient,
  selectedDoctor,
  selectedDate,
  selectedTime,
}) => (
  <div className="confirmation-container">
    <h3 className="section-title">Confirmar Agendamento</h3>
    <div className="confirmation-details">
      <div className="confirmation-section">
        <h4>Paciente</h4>
        <div className="confirmation-item">
          <User className="confirmation-icon" />
          <div>
            <p className="confirmation-name">{selectedPatient?.name}</p>
            <p className="confirmation-detail">{selectedPatient?.phone}</p>
          </div>
        </div>
      </div>
      <div className="confirmation-section">
        <h4>Médico</h4>
        <div className="confirmation-item">
          <Stethoscope className="confirmation-icon" />
          <div>
            <p className="confirmation-name">{selectedDoctor?.name}</p>
            <p className="confirmation-detail">{selectedDoctor?.specialty}</p>
            <p className="confirmation-detail">
              <MapPin className="inline-icon" />
              {selectedDoctor?.location}
            </p>
          </div>
        </div>
      </div>
      <div className="confirmation-section">
        <h4>Data e Horário</h4>
        <div className="confirmation-item">
          <Calendar className="confirmation-icon" />
          <div>
            <p className="confirmation-name">
              {selectedDate?.toLocaleDateString("pt-BR")} às {selectedTime}
            </p>
          </div>
        </div>
      </div>
      {/* <div className="confirmation-section">
        <h4>Observações</h4>
        <textarea className="notes-textarea" placeholder="Adicione observações sobre a consulta (opcional)..." value={notes} onChange={(e) => setNotes(e.target.value)} rows={4}/>
      </div> */}
    </div>
  </div>
);

const ConfirmationModal = ({
  showConfirmation,
  setShowConfirmation,
  selectedPatient,
  selectedDoctor,
  selectedDate,
  selectedTime,
  confirmSchedule,
}) => {
  if (!showConfirmation) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content confirmation-modal">
        <div className="modal-header">
          <h3>Confirmar Agendamento</h3>
        </div>
        <div className="modal-body">
          <p>Tem certeza que deseja agendar esta consulta?</p>
          <div className="confirmation-summary">
            <p>
              <strong>Paciente:</strong> {selectedPatient?.name}
            </p>
            <p>
              <strong>Médico:</strong> {selectedDoctor?.name}
            </p>
            <p>
              <strong>Data:</strong> {selectedDate?.toLocaleDateString("pt-BR")}{" "}
              às {selectedTime}
            </p>
          </div>
        </div>
        <div className="modal-footer">
          <Button
            background="#fff"
            hoverBackground="#f0fdfc"
            color="#4ecdc4"
            borderRadius="0.375rem"
            border="1px solid #4ecdc4"
            fontWeight={600}
            style={{ padding: "0.90rem 1.5rem" }}
            onClick={() => setShowConfirmation(false)}
          >
            Cancelar
          </Button>
          <Button
            background="#3b9b96"
            hoverBackground="#2d7a75"
            fontWeight={600}
            icon={<Check size={15} />}
            borderRadius="0.375rem"
            style={{ padding: "0.90rem 1.5rem" }}
            onClick={confirmSchedule}
          >
            Confirmar agendamento
          </Button>
        </div>
      </div>
    </div>
  );
};

// NOVO MODAL DE SUCESSO
const SuccessModal = ({ show, onCloseAndRedirect }) => {
  if (!show) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content success-modal">
        {" "}
        {/* Adicione estilos para success-modal em AppointmentCreate.css se necessário */}
        <div className="modal-header">
          <h3>Agendamento Confirmado!</h3>
        </div>
        <div className="modal-body">
          <p>Sua consulta foi agendada com sucesso.</p>
        </div>
        <div className="modal-footer-sucess">
          <Button
            background="#3b9b96"
            color="#fff"
            hoverBackground="#2d7a75"
            fontWeight={600}
            borderRadius="0.375rem"
            style={{ padding: "0.90rem 4.5rem" }}
            onClick={onCloseAndRedirect}
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function ScheduleAppointment() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [patientSearch, setPatientSearch] = useState("");
  const [doctorSearch, setDoctorSearch] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5)); // June 2025
  // const [notes, setNotes] = useState(""); // Estado de 'notes' mantido, caso seja usado em outro lugar ou reativado
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
      patient.phone.includes(patientSearch)
  );

  const filteredDoctors = mockDoctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(doctorSearch.toLowerCase())
  );

  const isDateAvailable = (date) => {
    if (!selectedDoctor || !date) return false;
    const dateStr = formatDate(date);
    const availability = mockAvailability[selectedDoctor.id];
    return (
      availability && availability[dateStr] && availability[dateStr].length > 0
    );
  };

  const getAvailableSlots = (date) => {
    if (!selectedDoctor || !date) return [];
    const dateStr = formatDate(date);
    const availability = mockAvailability[selectedDoctor.id];
    return availability && availability[dateStr] ? availability[dateStr] : [];
  };

  const handleSchedule = () => {
    setShowConfirmation(true);
  };

  const confirmSchedule = () => {
    console.log("Scheduling appointment:", {
      patient: selectedPatient,
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      // notes: notes,
    });
    setShowConfirmation(false);
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModalAndRedirect = () => {
    setShowSuccessModal(false);
    navigate("/admin/dashboard");
  };

  return (
    <div className="schedule-container">
      <Header />
      <div className="main---content">
        <div className="page---header">
          <Button
            background="#fff"
            color="#222"
            borderRadius="0.375rem"
            fontWeight={600}
            icon={<ArrowLeft size={15} />}
            style={{ padding: "0.85rem 1.5rem" }}
            onClick={() => navigate(-1)}
          >
            Voltar ao Dashboard
          </Button>
          <h2 className="page-title">Agendar Nova Consulta</h2>
        </div>

        <StepIndicator currentStep={currentStep} />

        <div className="step-content">
          {currentStep === 1 && (
            <PatientSelection
              patientSearch={patientSearch}
              setPatientSearch={setPatientSearch}
              filteredPatients={filteredPatients}
              selectedPatient={selectedPatient}
              setSelectedPatient={setSelectedPatient}
            />
          )}
          {currentStep === 2 && (
            <DoctorSelection
              doctorSearch={doctorSearch}
              setDoctorSearch={setDoctorSearch}
              filteredDoctors={filteredDoctors}
              selectedDoctor={selectedDoctor}
              setSelectedDoctor={setSelectedDoctor}
            />
          )}
          {currentStep === 3 && (
            <DateTimeSelection
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              isDateAvailable={isDateAvailable}
              getAvailableSlots={getAvailableSlots}
            />
          )}
          {currentStep === 4 && (
            <ConfirmationStep
              selectedPatient={selectedPatient}
              selectedDoctor={selectedDoctor}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              
            />
          )}
        </div>

        <div className="step-navigation">
          {currentStep > 1 && (
            <Button
              background="#fff"
              color="#4ecdc4"
              hoverBackground="#f0fdfc"
              border="1px solid #4ecdc4"
              borderRadius="0.375rem"
              style={{ padding: "0.85rem 1.5rem" }}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Voltar
            </Button>
          )}
          <div className="nav-spacer"></div>
          {currentStep < 4 && (
            <Button
              background="#3b9b96"
              color="#fff"
              hoverBackground="#2d7a75"
              borderRadius="0.375rem"
              style={{ padding: "0.85rem 1.5rem" }}
              disabled={
                (currentStep === 1 && !selectedPatient) ||
                (currentStep === 2 && !selectedDoctor) ||
                (currentStep === 3 && (!selectedDate || !selectedTime))
              }
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Próximo
            </Button>
          )}
          {currentStep === 4 && (
            <Button
              background="#3b9b96"
              color="#fff"
              hoverBackground="#2d7a75"
              borderRadius="0.375rem"
              icon={<Plus size={15} />}
              style={{ padding: "0.85rem 1.5rem" }}
              onClick={handleSchedule}
            >
              Agendar Consulta
            </Button>
          )}
        </div>
      </div>
      <Footer />
      <ConfirmationModal
        showConfirmation={showConfirmation}
        setShowConfirmation={setShowConfirmation}
        selectedPatient={selectedPatient}
        selectedDoctor={selectedDoctor}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        confirmSchedule={confirmSchedule}
      />
      
      <SuccessModal
        show={showSuccessModal}
        onCloseAndRedirect={handleCloseSuccessModalAndRedirect}
      />
    </div>
  );
}
