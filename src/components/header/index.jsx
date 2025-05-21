import { useNavigate } from "react-router-dom";
import Button from "../Button";
import "./style.css";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Limpar autenticação quando houver
    navigate("/signin");
  };

  return (
    <header className="main-header">
      <div className="main-logo" aria-label="Saúde+">
        Saúde<span>+</span>
      </div>
      <Button className="button-small" onClick={handleLogout} aria-label="Sair">
        Sair
      </Button>
    </header>
  );
}

export default Header;