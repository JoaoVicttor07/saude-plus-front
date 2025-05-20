import { useState } from 'react';
import { Link } from 'react-router-dom';

function PatientCalendar() {
  // Dados estáticos de slots
  const slots = [
    { id: 1, data: '23/05/2025', hora: '10:00' },
    { id: 2, data: '23/05/2025', hora: '11:00' },
  ];
  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <div>
      <h2>Calendário de Agendamento</h2>
      <ul>
        {slots.map(slot => (
          <li key={slot.id}>
            {slot.data} {slot.hora}{' '}
            <button onClick={() => setSelectedSlot(slot)}>Agendar</button>
          </li>
        ))}
      </ul>
      {selectedSlot && (
        <div className="modal">
          {/* TODO: Substituir por modal real se desejar */}
          <h3>Agendar Consulta</h3>
          <p>Data: {selectedSlot.data}</p>
          <p>Hora: {selectedSlot.hora}</p>
          <Link to="/patient/appointmentDetail/1">Confirmar (simulação)</Link>
          <button onClick={() => setSelectedSlot(null)}>Fechar</button>
        </div>
      )}
      <nav>
        <Link to="/patient/dashboard">Dashboard</Link> |{' '}
        <Link to="/patient/appointmentsList">Minhas Consultas</Link> |{' '}
        <Link to="/patient/profileView">Perfil</Link>
      </nav>
    </div>
  );
}

export default PatientCalendar;