import { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Link from "../../../components/Link";
import Footer from "../../../components/footer";
import { useAuth } from "../../../context/AuthContext";
import DOMPurify from "dompurify";
import "./style.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const { login, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (!email || !password) {
      setErro("Email e senha são obrigatórios.");
      return;
    }

     const sanitizedEmail = DOMPurify.sanitize(email);

    try {
      await login({ email: sanitizedEmail, senha: password });
    } catch (error) {
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
