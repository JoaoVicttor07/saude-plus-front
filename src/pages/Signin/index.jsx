import React from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Link from '../../components/Link/Link';
import './style.css';

function Signin() {
  return (
    <div className="signin-container">
      <h1>Bem-vindo ao Saúde+</h1>
      <p>Faça login para acessar sua conta</p>
      <form className="signin-form">
        <label htmlFor="email">Email</label>
        <Input type="email" id="email" placeholder="Digite seu email" required />

        <label htmlFor="password">Senha</label>
        <Input type="password" id="password" placeholder="Digite sua senha" required />

        <Button type="submit">Entrar</Button>
      </form>
      <p className="register-link">
        Não tem uma conta? <Link href="/register">Cadastre-se</Link>
      </p>
    </div>
  );
}

export default Signin;