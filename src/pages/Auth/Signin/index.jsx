import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Link from "../../../components/Link";
import Footer from "../../../components/footer";
import "./style.css"; // Importa o CSS exclusivo da página de login

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Autenticação estática enquanto a api é desenvolvida
    if (email === "paciente@paciente.com") {
      navigate("/dashboard");
    } else if (email === "admin@admin.com" && password === "1") {
      navigate("/admin/dashboard");
    } else if (email === "doctor@doctor.com" && password === "1") {
      navigate("/doctor/dashboard");
    } else {
      setErro("Usuário ou senha inválidos");
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
            <label htmlFor="email" className="form-label">Email</label>
            <Input
              type="email"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Senha</label>
            <Input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <Button className="btn-primary" style={{ marginTop: '10px' }}>
            Entrar
          </Button>
        </form>
        {erro && <p className="error-message" style={{ textAlign: "center" }}>{erro}</p>}
        <div className="login-link">
          Não tem uma conta? <Link href="/signup">Cadastre-se</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signin;