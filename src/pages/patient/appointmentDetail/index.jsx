import { useNavigate } from 'react-router-dom';

function AppointmentForm() {
  // TODO: Buscar médicos do backend
  const medicos = [
    { id: 1, nome: 'Dr. João Silva' },
    { id: 2, nome: 'Dra. Maria Souza' },
  ];
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: Enviar agendamento para o backend
    alert('Consulta agendada (simulação)');
    navigate('/patient/appointmentsList');
  };

  return (
    <div>
      <h2>Agendar Consulta</h2>
      <form onSubmit={handleSubmit}>
        <label>Médico</label>
        <select required>
          <option value="">Selecione</option>
          {medicos.map(m => (
            <option key={m.id} value={m.id}>{m.nome}</option>
          ))}
        </select>
        <label>Data/Hora</label>
        <input type="datetime-local" required />
        <button type="submit">Confirmar</button>
      </form>
    </div>
  );
}

export default AppointmentForm;