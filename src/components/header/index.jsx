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
      <Button
      background="#fff"
      color="#374151"
      fontWeight="600"
      hoverBackground="#f8f9fa"
      onClick={handleLogout}
      borderRadius="0.375rem"
      width = "7rem"
      >
        Sair
      </Button>
    </header>
  );
}

export default Header;