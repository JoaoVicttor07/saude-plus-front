import Button from "../Button";
import { useAuth } from "../../context/AuthContext";
import "./style.css";

function Header() {
  // const navigate = useNavigate();

  const { isAuthenticated, user, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  if (isLoading) {
    return null;
  }

  return (
    <header className="main-header">
      <div className="main-logo" aria-label="Saúde+">
        Saúde<span>+</span>
      </div>
      {isAuthenticated &&
        user && (
          <div className="header-user-info">
            {/**/}
            {/**/}
            <Button
              background="#fff"
              color="#374151"
              fontWeight="600"
              hoverBackground="#f8f9fa"
              onClick={handleLogout}
              borderRadius="0.375rem"
              style={{padding: '0.7rem 2.5rem'}}
            >
              Sair
            </Button>
          </div>
        )}
      {/**/}
    </header>
  );
}

export default Header;
