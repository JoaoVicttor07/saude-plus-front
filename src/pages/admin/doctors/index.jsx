import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header";
import Button from "../../../components/Button";
import Footer from "../../../components/footer";
import "./style.css";

// Exemplo de dados mockados
const medicosMock = [
  {
    id: 1,
    nome: "Dr. João Almeida",
    crm: "123456-SP",
    email: "joao.almeida@email.com",
    telefone: "(11) 91234-5678",
    status: "Ativo",
  },
  {
    id: 2,
    nome: "Dra. Maria Oliveira",
    crm: "654321-RJ",
    email: "maria.oliveira@email.com",
    telefone: "(21) 99876-5432",
    status: "Ativo",
  },
  {
    id: 3,
    nome: "Dr. Pedro Santos",
    crm: "789123-MG",
    email: "pedro.santos@email.com",
    telefone: "(31) 98888-1234",
    status: "Inativo",
  },
];

function AdminDoctors() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("");

  const medicosFiltrados = medicosMock.filter((m) => {
    const termo = busca.toLowerCase();
    const statusOk = filtro ? m.status.toLowerCase() === filtro : true;
    return (
      statusOk &&
      (
        m.nome.toLowerCase().includes(termo) ||
        m.crm.toLowerCase().includes(termo) ||
        m.email.toLowerCase().includes(termo) ||
        m.telefone.includes(termo)
      )
    );
  });

  return (
    <div className="admin-patients-bg">
      <Header />
      <main className="admin-patients-main">
        <div className="admin-patients-header">
          <h2>Médicos Cadastrados</h2>
          <Button
            background="#fff"
            color="#374151"
            height="30px"
            width="200px"
            hoverBackground="#e6f4f1"
            fontWeight={600}
            onClick={() => navigate(-1)}
          >
            Voltar ao Dashboard
          </Button>
        </div>
        <div className="admin-patients-filters-row">
          <div className="admin-patients-search">
            <FaSearch color="#247575"/>
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
                <th>CRM</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {medicosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", color: "#888" }}>
                    Nenhum médico encontrado.
                  </td>
                </tr>
              ) : (
                medicosFiltrados.map((m, idx) => (
                  <tr key={m.id} className={idx % 2 === 0 ? "linha-par" : "linha-impar"}>
                    <td>{m.nome}</td>
                    <td>{m.crm}</td>
                    <td>{m.email}</td>
                    <td>{m.telefone}</td>
                    <td>{m.status}</td>
                    <td>
                      <Button
                        background="#fff"
                        color="#247575"
                        fontWeight={600}
                        border="2px solid #247575"
                        fontSize="14px"
                        height="33px"
                        width="100%"
                        borderRadius="7px"
                        hoverBackground="#247575"
                        hoverColor="#fff"
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