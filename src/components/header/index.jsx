import Button from "../Button";
import { useAuth } from "../../context/AuthContext";
import "./style.css";

function Header() {
  // const navigate = useNavigate();

  const { isAuthenticated, user, logout, isLoading } = useAuth(); // Usar o contexto

  const handleLogout = async () => {
    await logout(); // Chamar a função logout do contexto
    // O redirecionamento é feito dentro da função logout do AuthContext
  };

  if (isLoading) {
    return null; // Ou um spinner/placeholder enquanto o auth carrega
  }

  return (
    <header className="main-header">
      <div className="main-logo" aria-label="Saúde+">
        Saúde<span>+</span>
      </div>
      {isAuthenticated &&
        user && ( // Mostrar botão de sair e nome do usuário se autenticado
          <div className="header-user-info">
            {/* Você pode querer exibir o nome do usuário aqui, ex: user.email ou user.nome se tiver */}
            {/* <span>Olá, {user.sub || user.email}</span>  */}
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
      {/* Se não autenticado, você pode querer mostrar botões de Login/Cadastro aqui,
          mas como este header parece ser para páginas internas, o botão Sair é o principal.
          Se este header também aparecer em /signin, você precisará de lógica condicional
          para não mostrar o botão Sair ali. */}
    </header>
  );
}

export default Header;
