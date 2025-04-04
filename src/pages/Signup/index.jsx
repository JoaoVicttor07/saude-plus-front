import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Link from '../../components/Link/Link';
import './style.css';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [step, setStep] = useState(1); // Controla a etapa atual do formulário

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(step + 1); // Avança para a próxima etapa
  };

  const handlePreviousStep = (e) => {
    e.preventDefault();
    setStep(step - 1); // Volta para a etapa anterior
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    console.log('Dados enviados:', formData);
  };

  return (
    <div className="signup-container">
      <h1>Crie sua conta</h1>
      <p>Preencha os campos abaixo para se cadastrar</p>
      <form className="signup-form">
        {step === 1 && (
          <div className="form-step">
            <div className="form-group">
              <label htmlFor="firstName">Primeiro Nome</label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Digite seu primeiro nome"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Sobrenome</label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Digite seu sobrenome"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Telefone</label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                placeholder="(00) 0 0000-0000"
                value={formData.phone}
                onChange={handleChange}
                pattern="\(\d{2}\) \d \d{4}-\d{4}"
                title="Formato: (00) 0 0000-0000"
                mask="(99) 9 9999-9999"
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                required
              />
            </div>
            <Button onClick={handleNextStep}>Próximo</Button>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Repetir Senha</label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Repita sua senha"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-buttons">
              <Button onClick={handlePreviousStep}>Voltar</Button>
              <Button type="submit" onClick={handleSubmit}>Cadastrar</Button>
            </div>
          </div>
        )}
      </form>
      <p className="register-link">
        Já tem uma conta? <Link href="/">Faça login</Link>
      </p>
    </div>
  );
}

export default Signup;