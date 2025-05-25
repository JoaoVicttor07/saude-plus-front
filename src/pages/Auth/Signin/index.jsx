import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Link from "../../../components/Link";
import "./style.css";

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
    } else if (email === "medico@medico.com") {
      navigate("/medico");
    } else if (email === "doctor@doctor.com" && password === "1") {
      navigate("/doctor/dashboard"); // Redireciona para o dashboard do médico
    } else {
      setErro("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="signin-container">
      <h1>Bem-vindo ao Saúde+</h1>
      <p>Faça login para acessar sua conta</p>
      <form className="signin-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Senha</label>
        <Input
          type="password"
          id="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button>Entrar</Button>
      </form>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <p className="register-link">
        Não tem uma conta? <Link href="/signup">Cadastre-se</Link>
      </p>
    </div>
  );
}

export default Signin;