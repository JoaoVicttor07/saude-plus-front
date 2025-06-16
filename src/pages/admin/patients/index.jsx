import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header";
import Button from "../../../components/Button";
import Footer from "../../../components/footer";
import { ArrowLeft, Eye } from "lucide-react";
import PacienteService from "../../../services/PacienteService";
import { mascararCPF, formatarTelefone } from "../../../utils/formatters";

import "./style.css";

function AdminPatients() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function fetchPacientes() {
      setLoading(true);
      setErro("");
      try {
        const data = await PacienteService.listarTodos();
        setPacientes(data);
      } catch (err) {
        setErro("Erro ao buscar pacientes.");
      } finally {
        setLoading(false);
      }
    }
    fetchPacientes();
  }, []);

  const pacientesFiltrados = pacientes.filter((p) => {
    const termo = busca.toLowerCase();
    const statusOK = filtro ? p.ativo === (filtro === "ativo") : true;
    return (
      statusOK &&
      (p.nome.toLowerCase().includes(termo) ||
        p.cpf?.includes(termo) ||
        p.email.toLowerCase().includes(termo) ||
        p.telefone?.includes(termo))
    );
  });

  return (
    <div className="admin-patients-bg">
      <Header />
      <main className="admin-patients-main">
        <div className="admin-patients-header">
          <h2 className="admin-patient-header-title">Pacientes Cadastrados</h2>
          <Button
            background="#fff"
            color="#374151"
            height="35px"
            width="180px"
            borderRadius="0.375rem"
            hoverBackground="#f8f9fa"
            fontWeight="600"
            icon={<ArrowLeft size={15}/>}
            onClick={() => navigate(-1)}
          >
            Voltar ao Dashboard
          </Button>
        </div>
        <div className="admin-patients-filters-row">
          <div className="admin-patients-search">
            <FaSearch color="#247575" />
            <input
              type="text"
              placeholder="Buscar"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <select
            className="admin-patients-filter"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </div>
        <div className="admin-patients-table-container">
          {loading ? (
            <div style={{ padding: 32, textAlign: "center" }}>Carregando...</div>
          ) : erro ? (
            <div style={{ padding: 32, color: "#b00", textAlign: "center" }}>{erro}</div>
          ) : (
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
                    <tr
                      key={p.id}
                      className={idx % 2 === 0 ? "linha-par" : "linha-impar"}
                    >
                      <td>{p.nome}</td>
                      <td>{mascararCPF(p.cpf)}</td>
                      <td>{p.email}</td>
                      <td>{formatarTelefone(p.telefone)}</td>
                      <td>{p.ativo ? "Ativo" : "Inativo"}</td>
                      <td>
                        <Button
                          background="#fff"
                          color="#4ecdc4"
                          fontSize="0.90rem"
                          border="1px solid #4ecdc4"
                          width="100%"
                          borderRadius="7px"
                          hoverBackground="#e6f9f8"
                          icon={<Eye size={15}/>}
                          style={{padding: "0.4rem 0"}}
                          onClick={() => navigate(`/admin/patients/${p.id}`)}
                        >
                          Ver Detalhes
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AdminPatients;
