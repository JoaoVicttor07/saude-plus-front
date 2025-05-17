import { useState } from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Link from '../../components/Link/Link';
import '../Signin/style.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aqui você faz a requisição para o endpoint POST /forgot
    // Exemplo:
    // await fetch('/forgot', { method: 'POST', body: JSON.stringify({ email }) })
    setMessage('Se o e-mail existir, você receberá um link para redefinir sua senha.');
  };

  return (
    <div className="signin-container">
      <h1>Esqueci minha senha</h1>
      <p>Informe seu e-mail para receber o link de recuperação.</p>
      <form className="signin-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          placeholder="Digite seu email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Button type="submit">Enviar</Button>
      </form>
      {message && <p>{message}</p>}
      <p className="register-link">
        Lembrou a senha? <Link href="/signin">Entrar</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;