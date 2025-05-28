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
      color="#2c7a7b"
      hoverBackground="#f0f8f8"
      fontWeight={600}
      onClick={handleLogout}
      width = '10%'
      >
        Sair
      </Button>
    </header>
  );
}

export default Header;