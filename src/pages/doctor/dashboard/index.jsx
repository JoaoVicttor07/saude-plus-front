import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../../components/Modal'
import './style.css';

function DoctorDashboard() {
  const [consultas, setConsultas] = useState([
    { id: 1, data: '22/05/2025', hora: '14:00', paciente: 'João Silva', clinica: 'Clínica Central', sala: '101', status: 'Pendente' },
    { id: 2, data: '23/05/2025', hora: '10:00', paciente: 'Maria Souza', clinica: 'Clínica do Norte', sala: '102', status: 'Pendente' },
  ]);

  // Estados do modal
  const [showModal, setShowModal] = useState(false);
  const [cancelId, setCancelId] = useState(null);
  const [motivo, setMotivo] = useState("");

  // Abrir modal
  const abrirModal = (id) => {
    setCancelId(id);
    setMotivo("");
    setShowModal(true);
  };

  // Fechar modal
  const fecharModal = () => {
    setShowModal(false);
    setCancelId(null);
    setMotivo("");
  };

  // Confirmar cancelamento
  const confirmarCancelamento = () => {
    if (motivo.trim() !== "") {
      setConsultas(consultas.map((consulta) =>
        consulta.id === cancelId
          ? { ...consulta, status: `Cancelada (${motivo})` }
          : consulta
      ));
      setShowModal(false);
      setCancelId(null);
      setMotivo("");
      alert('Consulta cancelada com sucesso!');
    }
  };

  // Alternar status entre Pendente e Realizada
  const toggleStatus = (id) => {
    setConsultas(consultas.map((consulta) =>
      consulta.id === id
        ? { ...consulta, status: consulta.status === 'Realizada' ? 'Pendente' : 'Realizada' }
        : consulta
    ));
  };

  return (
    <div className="doctor-dashboard-container">
      <h2>Bem-vindo, Doutor!</h2>
      <h3>Consultas Agendadas</h3>
      <ul className="consultas-list">
        {consultas.map((consulta) => (
          <li key={consulta.id} className="consulta-item">
            <p>
              <strong>Data:</strong> {consulta.data} <br />
              <strong>Hora:</strong> {consulta.hora} <br />
              <strong>Paciente:</strong> {consulta.paciente} <br />
              <strong>Local:</strong> {consulta.clinica} - Sala {consulta.sala} <br />
              <strong>Status:</strong> {consulta.status}
            </p>
            <div className="consulta-actions">
              <button
                className="cancelar-button"
                onClick={() => abrirModal(consulta.id)}
                disabled={consulta.status.startsWith('Cancelada')}
              >
                Cancelar
              </button>
              <button
                className={`toggle-switch ${consulta.status === 'Realizada' ? 'on' : 'off'}`}
                onClick={() => toggleStatus(consulta.id)}
                disabled={consulta.status.startsWith('Cancelada')}
                aria-label="Alternar status"
              >
                <span className="switch-track">
                  <span className="switch-label">
                    {consulta.status === 'Realizada' ? 'Realizada' : 'Pendente'}
                  </span>
                  <span className="switch-knob"></span>
                </span>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <nav className="doctor-nav">
        <Link to="/doctor/profile">Perfil</Link>

      </nav>
      {/* Modal para motivo do cancelamento */}
      <Modal
        show={showModal}
        motivo={motivo}
        setMotivo={setMotivo}
        onConfirm={confirmarCancelamento}
        onClose={fecharModal}
      />
    </div>
  );
}

export default DoctorDashboard;