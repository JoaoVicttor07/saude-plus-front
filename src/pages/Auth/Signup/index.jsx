import { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Link from "../../../components/Link";
import Footer from "../../../components/footer"
import "./style.css";

function Signup() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    sexo: "",
    // alergia: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleNext = (e) => {
    e.preventDefault();
    // Validação simples dos campos da primeira etapa
    if (!form.nome || !form.cpf || !form.telefone || !form.sexo) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validação simples dos campos da segunda etapa
    if (!form.email || !form.password || !form.confirmPassword) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }
    // TODO: Enviar dados para o backend
    alert("Cadastro realizado com sucesso (simulação)");
  };

  return (
    <div className="mainContainer">

      <div className="signup-container">
        <h1>Cadastro de Paciente</h1>
        <form
          className="signup-form"
          onSubmit={step === 1 ? handleNext : handleSubmit}
        >
          {step === 1 && (
            <>
              <label htmlFor="nome">Nome completo</label>
              <Input
                type="text"
                id="nome"
                name="nome"
                placeholder="Digite seu nome completo"
                value={form.nome}
                onChange={handleChange}
                required
              />

              <label htmlFor="cpf">CPF</label>
              <Input
                type="text"
                id="cpf"
                name="cpf"
                placeholder="Digite seu CPF"
                value={form.cpf}
                onChange={handleChange}
                required
              />

              <label htmlFor="telefone">Telefone</label>
              <Input
                type="text"
                id="telefone"
                name="telefone"
                placeholder="Digite seu telefone"
                value={form.telefone}
                onChange={handleChange}
                required
              />

              <label htmlFor="sexo">Gênero</label>
              <select
                id="sexo"
                name="sexo"
                value={form.sexo}
                onChange={handleChange}
                required
              >
                <option value="">Selecione</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
              </select>

              {/* <label htmlFor="alergia">
              Alergia/Doença específica (opcional)
            </label>
            <Input
              type="text"
              id="alergia"
              name="alergia"
              placeholder="Descreva se houver"
              value={form.alergia}
              onChange={handleChange}
            /> */}

              <Button
                background="#2c7a7b"
                color="#fff"
                border="none"
                borderRadius="4px"
                height="40px"
                hoverBackground="#285e61"
                style={{
                  outline: "none",
                  boxShadow: "none",
                }}
              >
                Próxima etapa
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="password">Senha</label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Digite sua senha"
                value={form.password}
                onChange={handleChange}
                required
              />

              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirme sua senha"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <Button>Cadastrar</Button>

              <Button
                onClick={handleBack}
                background="grey"
                style={{
                  marginTop: "8px",
                }}
              >
                Voltar
              </Button>
            </>
          )}
        </form>
        <p className="register-link">
          Já tem uma conta? <Link href="/signin">Entrar</Link>
        </p>
      </div>
      <Footer/>
    </div>
  );
}

export default Signup;
