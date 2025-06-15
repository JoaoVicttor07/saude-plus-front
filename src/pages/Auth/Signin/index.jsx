import { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Link from "../../../components/Link";
import Footer from "../../../components/footer";
import { useAuth } from "../../../context/AuthContext";
import "./style.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();

  // Apenas login e isLoading são usados ativamente no código abaixo
  const { login, isLoading } = useAuth();
  // const { login, isLoading, isAuthenticated, user } = useAuth(); // Linha original
  // const navigate = useNavigate();

  // Se o usuário já estiver autenticado, você pode querer redirecioná-lo
  // Esta lógica pode ser movida para um componente de Rota Protegida ou para o App.jsx
  // useEffect(() => {
  //   // Se for usar este useEffect, adicione isAuthenticated e user de volta à desestruturação acima
  //   // e importe useNavigate de 'react-router-dom' e inicialize-o.
  //   if (isAuthenticated && user) {
  //     // Lógica de redirecionamento baseada no papel, se necessário aqui
  //     // Exemplo:
  //     // const userRole = user.authorities && user.authorities.length > 0 ? user.authorities[0].authority.toUpperCase() : null;
  //     // if (userRole === "GERENTE") navigate("/admin/dashboard");
  //     // else if (userRole === "MEDICO") navigate("/doctor/dashboard");
  //     // else if (userRole === "PACIENTE") navigate("/dashboard");
  //     // else navigate("/dashboard"); // Fallback
  //   }
  // }, [isAuthenticated, user, navigate]); // Adicionar dependências corretas se descomentado

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(""); // Limpar erros anteriores

    if (!email || !password) {
      setErro("Email e senha são obrigatórios.");
      return;
    }

    try {
      // Chama a função login do AuthContext
      // A função login no AuthContext agora lida com a chamada ao AuthService,
      // armazena o usuário, define isAuthenticated e faz o redirecionamento.
      await login({ email, senha: password });
      // Se o login for bem-sucedido, o AuthContext cuidará do redirecionamento.
      // Não é mais necessário chamar navigate() aqui para o redirecionamento pós-login.
    } catch (error) {
      // A função login no AuthContext deve relançar o erro para que possamos tratá-lo aqui para a UI.
      console.error("Erro no componente Signin ao tentar logar:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErro(error.response.data.message);
      } else if (error.response && error.response.status === 401) {
        setErro("Email ou senha inválidos.");
      } else if (
        error.message &&
        error.message.includes("estáticos inválidos")
      ) {
        // Para o modo estático, se implementado no context
        setErro(error.message);
      } else {
        setErro(
          "Erro ao tentar fazer login. Verifique sua conexão ou tente mais tarde."
        );
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="form-header">
          <h1 className="form-title">Entrar</h1>
          <p className="form-subtitle">Faça login para acessar sua conta</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Senha
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            className="btn-primary"
            style={{ marginTop: "10px" }}
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
        {erro && (
          <p className="error-message" style={{ textAlign: "center" }}>
            {erro}
          </p>
        )}
        <div className="login-link">
          Não tem uma conta? <Link href="/signup">Cadastre-se</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signin;
