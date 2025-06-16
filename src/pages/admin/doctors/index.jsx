import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header";
import Button from "../../../components/Button";
import Footer from "../../../components/footer";
import MedicoService from "../../../services/MedicoService";
import "./style.css";
import { ArrowLeft, Eye } from "lucide-react";

function AdminDoctors() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("");
  const [medicos, setMedicos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMedicos() {
      setIsLoading(true);
      try {
        const data = await MedicoService.listarTodos();
        setMedicos(Array.isArray(data) ? data : []);
      } catch (error) {
        setMedicos([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMedicos();
  }, []);

  const medicosFiltrados = medicos.filter((m) => {
    const termo = busca.toLowerCase();
    const statusOk = filtro ? (m.ativo ? "ativo" : "inativo") === filtro : true;
    const nomeOk = m.nome?.toLowerCase().includes(termo);
    const crmOk = m.crm?.toLowerCase().includes(termo);
    const especialidadeOk = m.especialidade?.nome
      ?.toLowerCase()
      .includes(termo);
    const telefoneOk = m.telefone?.toLowerCase().includes(termo);
    return statusOk && (nomeOk || crmOk || especialidadeOk || telefoneOk);
  });

  return (
    <div className="admin-patients-bg">
      <Header />
      <main className="admin-patients-main">
        <div className="admin-patients-header">
          <h2 className="admin-patient-header-title">Médicos Cadastrados</h2>
          <Button
            background="#fff"
            color="#374151"
            height="35px"
            width="180px"
            hoverBackground="#f8f9fa"
            borderRadius="0.375rem"
            fontWeight="600"
            icon={<ArrowLeft size={15} />}
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
          <table className="admin-patients-table">
            <thead>
              <tr>
                <th>Nome Completo</th>
                <th>CRM</th>
                <th>Especialidade</th>
                <th>Telefone</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    style={{ textAlign: "center", color: "#888" }}
                  >
                    Carregando...
                  </td>
                </tr>
              ) : medicosFiltrados.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    style={{ textAlign: "center", color: "#888" }}
                  >
                    Nenhum médico encontrado.
                  </td>
                </tr>
              ) : (
                medicosFiltrados.map((m, idx) => (
                  <tr
                    key={m.id}
                    className={idx % 2 === 0 ? "linha-par" : "linha-impar"}
                  >
                    <td>{m.nome}</td>
                    <td>{m.crm}</td>
                    <td>{m.especialidade?.nome || "-"}</td>
                    <td>{m.telefone || "-"}</td>
                    <td>{m.ativo ? "Ativo" : "Inativo"}</td>
                    <td>
                      <Button
                        background="#fff"
                        color="#4ecdc4"
                        fontSize="0.90rem"
                        border="1px solid #4ecdc4"
                        width="100%"
                        borderRadius="7px"
                        hoverBackground="#e6f9f8"
                        icon={<Eye size={15} />}
                        style={{ padding: "0.4rem 0" }}
                        onClick={() => navigate(`/admin/doctors/${m.id}`)}
                      >
                        Ver Detalhes
                      </Button>
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

export default AdminDoctors;
