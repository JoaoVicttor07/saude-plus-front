import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Link from '../../components/Link/Link';
import '../Signin/style.css';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage('As senhas não coincidem.');
      return;
    }
    // Aqui você faz a requisição para o endpoint POST /reset
    // Exemplo:
    // await fetch('/reset', { method: 'POST', body: JSON.stringify({ token, newPassword: password }) })
    setMessage('Senha redefinida com sucesso!');
  };

  if (!token) {
    return (
      <div className="signin-container">
        <h1>Link inválido</h1>
        <p>O link de redefinição é inválido ou expirou.</p>
        <p className="register-link">
          <Link href="/forgot-password">Solicitar novo link</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="signin-container">
      <h1>Redefinir senha</h1>
      <form className="signin-form" onSubmit={handleSubmit}>
        <label htmlFor="password">Nova senha</label>
        <Input
          type="password"
          id="password"
          placeholder="Digite a nova senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <label htmlFor="confirm">Confirmar nova senha</label>
        <Input
          type="password"
          id="confirm"
          placeholder="Confirme a nova senha"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />
        <Button type="submit">Redefinir</Button>
      </form>
      {message && <p>{message}</p>}
      <p className="register-link">
        <Link href="/signin">Voltar ao login</Link>
      </p>
    </div>
  );
}

export default ResetPassword;