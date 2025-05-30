import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header";
import Footer from "../../../components/footer";

import "./style.css";

// Exemplo de dados mockados
const pacientesMock = [
  {
    id: 1,
    nome: "Ana Paula Souza",
    cpf: "123.456.789-00",
    email: "ana@email.com",
    telefone: "(11) 91234-5678",
    status: "Ativo",
  },
  {
    id: 2,
    nome: "Carlos Silva",
    cpf: "987.456.321-00",
    email: "carlos@email.com",
    telefone: "(21) 99876-5432",
    status: "Ativo",
  },

  {
    id: 3,
    nome: "Carlos Silva",
    cpf: "987.456.321-00",
    email: "carlos@email.com",
    telefone: "(21) 99876-5432",
    status: "Ativo",
  },
  
  // ...adicione mais pacientes se quiser
];

function mascararCPF(cpf) {
  // Exibe apenas os 3 do meio
  return cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})-(\d{2})$/, "***.$2.***");
}

function AdminPatients() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("");

  const pacientesFiltrados = pacientesMock.filter((p) => {
    const termo = busca.toLowerCase();
    return (
      p.nome.toLowerCase().includes(termo) ||
      p.cpf.includes(termo) ||
      p.email.toLowerCase().includes(termo) ||
      p.telefone.includes(termo)
    );
  });

  return (
    <div className="admin-patients-bg">
      <Header />
      <main className="admin-patients-main">
        <div className="admin-patients-header">
          <h2>Pacientes Cadastrados</h2>
          <button
            className="admin-patients-back-btn"
            onClick={() => navigate("/admin/dashboard")}
          >
            Voltar ao Dashboard
          </button>
        </div>
        <div className="admin-patients-filters-row">
          <div className="admin-patients-search">
            <FaSearch />
            <input
              type="text"
              placeholder="Buscar"
              value={busca}
              onChange={e => setBusca(e.target.value)}
            />
          </div>
          <select
            className="admin-patients-filter"
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
          >
            <option value="">Filtrar</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </div>
        <div className="admin-patients-table-container">
          <table className="admin-patients-table">
            <thead>
              <tr>
                <th>Nome Completo</th>
                <th>CPF</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pacientesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", color: "#888" }}>
                    Nenhum paciente encontrado.
                  </td>
                </tr>
              ) : (
                pacientesFiltrados.map((p, idx) => (
                  <tr key={p.id} className={idx % 2 === 0 ? "linha-par" : "linha-impar"}>
                    <td>{p.nome}</td>
                    <td>{mascararCPF(p.cpf)}</td>
                    <td>{p.email}</td>
                    <td>{p.telefone}</td>
                    <td>{p.status}</td>
                    <td>
                      <button
                        className="detalhes-btn"
                        onClick={() => navigate(`/admin/patients/${p.id}`)}
                      >
                        Ver Detalhes
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AdminPatients;