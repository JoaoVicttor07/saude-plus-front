import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Link from '../../components/Link/Link';
import './style.css';

function Signup() {
  return (
    <div className="signin-container">
      <h1>Crie sua conta</h1>
      <p>Preencha os dados para se cadastrar</p>
      <form className="signin-form">
        <label htmlFor="name">Nome</label>
        <Input type="text" id="name" placeholder="Digite seu nome" required />

        <label htmlFor="email">Email</label>
        <Input type="email" id="email" placeholder="Digite seu email" required />

        <label htmlFor="password">Senha</label>
        <Input type="password" id="password" placeholder="Digite sua senha" required />

        <label htmlFor="confirmPassword">Confirmar Senha</label>
        <Input type="password" id="confirmPassword" placeholder="Confirme sua senha" required />

        <Button type="submit">Cadastrar</Button>
      </form>
      <p className="register-link">
        Já tem uma conta? <Link href="/signin">Entrar</Link>
      </p>
    </div>
  );
}

export default Signup;