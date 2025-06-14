import { useState } from "react";
import Footer from "../../../components/footer";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./style.css";
import AuthService from "../../../services/AuthService";

const RegistrationSuccessModal = ({ show, onCloseAndRedirect }) => {
  if (!show) return null;

  return (
    <div className="reg-success-modal-overlay">
      <div className="reg-success-modal-dialog">
        <div className="reg-success-modal-header">
          <h3>Cadastro Realizado!</h3>
        </div>
        <div className="reg-success-modal-body">
          <p>Sua conta foi criada com sucesso.</p>
        </div>
        <div className="reg-success-modal-footer">
          <button
            onClick={onCloseAndRedirect}
            className="btn-primary reg-success-modal-button"
          >
            Fazer Login
          </button>
        </div>
      </div>
    </div>
  );
};

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    phone: "",
    dateOfBirth: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cep: "",
    cidade: "",
    estado: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "cep") {
      processedValue = value.replace(/\D/g, "");
      if (processedValue.length > 5) {
        processedValue = processedValue.replace(/^(\d{5})(\d)/, "$1-$2");
      }
      if (processedValue.length > 9) {
        processedValue = processedValue.substring(0, 9);
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const formatCPF = (value) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    return value;
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return value;
  };

  const handleCPFChange = (e) => {
    const formatted = formatCPF(e.target.value);
    setFormData((prev) => ({ ...prev, cpf: formatted }));
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome completo é obrigatório";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres";
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = "CPF é obrigatório";
    } else if (
      !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf) &&
      !/^\d{11}$/.test(formData.cpf)
    ) {
      newErrors.cpf = "CPF deve ter formato válido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    } else if (
      !/^$$\d{2}$$\s\d{5}-\d{4}$/.test(formData.phone) &&
      !/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ""))
    ) {
      newErrors.phone = "Telefone deve ter formato válido";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Data de nascimento é obrigatória";
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 13 || age > 120) {
        newErrors.dateOfBirth = "Idade deve estar entre 13 e 120 anos";
      }
    }

    if (!formData.logradouro.trim()) {
      newErrors.logradouro = "Logradouro é obrigatório";
    }
    if (!formData.numero.trim()) {
      newErrors.numero = "Número é obrigatório";
    }
    if (!formData.bairro.trim()) {
      newErrors.bairro = "Bairro é obrigatório";
    }
    if (!formData.cep.trim()) {
      newErrors.cep = "CEP é obrigatório";
    } else if (!/^\d{5}-?\d{3}$/.test(formData.cep.replace(/\D/g, ""))) {
      newErrors.cep = "CEP inválido. Use o formato 00000-000.";
    }
    if (!formData.cidade.trim()) {
      newErrors.cidade = "Cidade é obrigatória";
    }
    if (!formData.estado.trim()) {
      newErrors.estado = "Estado é obrigatório";
    } else if (formData.estado.trim().length !== 2) {
      newErrors.estado = "Estado deve ser a sigla (ex: RN)";
    }

    if (!formData.gender) {
      newErrors.gender = "Gênero é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email deve ter formato válido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 8) {
      newErrors.password = "Senha deve ter pelo menos 8 caracteres";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Senha deve conter ao menos: 1 letra minúscula, 1 maiúscula e 1 número";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const apiData = {
      nome: formData.name,
      cpf: formData.cpf.replace(/\D/g, ""),
      email: formData.email,
      senha: formData.password,
      sexo: formData.gender ? formData.gender.charAt(0).toUpperCase() : "",
      telefone: formData.phone.replace(/\D/g, ""),
      dataNascimento: formData.dateOfBirth,
      endereco: {
        logradouro: formData.logradouro,
        numero: formData.numero,
        bairro: formData.bairro,
        cep: formData.cep.replace(/\D/g, ""),
        cidade: formData.cidade,
        estado: formData.estado.toUpperCase(),
      },
      descricao: "",
    };

    try {
      console.log("Enviando para API:", apiData);
      await AuthService.register(apiData);
      console.log("Form submitted successfully:");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error submitting form:", error.response || error);

      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (typeof errorData.message === "string") {
          alert(`Erro ao realizar cadastro: ${errorData.message}`);
        } else if (Array.isArray(errorData.errors)) {
          const messages = errorData.errors
            .map((err) => err.defaultMessage || err.msg)
            .join("\n");
          alert(`Erro ao realizar cadastro:\n${messages}`);
        } else if (typeof errorData === "string") {
          alert(`Erro ao realizar cadastro: ${errorData}`);
        } else {
          alert(
            "Erro ao realizar cadastro. Verifique os dados e tente novamente."
          );
        }
      } else {
        alert("Erro ao realizar cadastro. Tente novamente mais tarde.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccessModalAndRedirect = () => {
    setShowSuccessModal(false);
    navigate("/signin");
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="form-header">
          <h1 className="form-title">Criar Conta</h1>
          <p className="form-subtitle">Preencha seus dados para se cadastrar</p>
        </div>

        <form className="registration-form" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            {/* Name Field */}
            <div className="form-group full-width">
              <label htmlFor="name" className="form-label">
                Nome Completo *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Digite seu nome completo"
                className={`form-input ${errors.name ? "error" : ""}`}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <span id="name-error" className="error-message" role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            {/* CPF Field */}
            <div className="form-group">
              <label htmlFor="cpf" className="form-label">
                CPF *
              </label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={formData.cpf}
                onChange={handleCPFChange}
                placeholder="000.000.000-00"
                maxLength="14"
                className={`form-input ${errors.cpf ? "error" : ""}`}
                aria-describedby={errors.cpf ? "cpf-error" : undefined}
              />
              {errors.cpf && (
                <span id="cpf-error" className="error-message" role="alert">
                  {errors.cpf}
                </span>
              )}
            </div>

            {/* Phone Field */}
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Telefone *
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="(00) 00000-0000"
                maxLength="15"
                className={`form-input ${errors.phone ? "error" : ""}`}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <span id="phone-error" className="error-message" role="alert">
                  {errors.phone}
                </span>
              )}
            </div>

            {/* Date of Birth Field */}
            <div className="form-group">
              <label htmlFor="dateOfBirth" className="form-label">
                Data de Nascimento *
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={`form-input ${errors.dateOfBirth ? "error" : ""}`}
                aria-describedby={
                  errors.dateOfBirth ? "dateOfBirth-error" : undefined
                }
              />
              {errors.dateOfBirth && (
                <span
                  id="dateOfBirth-error"
                  className="error-message"
                  role="alert"
                >
                  {errors.dateOfBirth}
                </span>
              )}
            </div>

            {/* Gender Field */}
            <div className="form-group">
              <label htmlFor="gender" className="form-label">
                Gênero *
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={`form-input ${errors.gender ? "error" : ""}`}
                aria-describedby={errors.gender ? "gender-error" : undefined}
              >
                <option value="">Selecione</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
              {errors.gender && (
                <span id="gender-error" className="error-message" role="alert">
                  {errors.gender}
                </span>
              )}
            </div>

            {/* Logradouro Field */}
            <div className="form-group full-width">
              <label htmlFor="logradouro" className="form-label">
                Logradouro *
              </label>
              <input
                type="text"
                id="logradouro"
                name="logradouro"
                value={formData.logradouro}
                onChange={handleInputChange}
                placeholder="Ex: Rua das Palmeiras"
                className={`form-input ${errors.logradouro ? "error" : ""}`}
                aria-describedby={
                  errors.logradouro ? "logradouro-error" : undefined
                }
              />
              {errors.logradouro && (
                <span
                  id="logradouro-error"
                  className="error-message"
                  role="alert"
                >
                  {errors.logradouro}
                </span>
              )}
            </div>

            {/* Número Field */}
            <div className="form-group">
              <label htmlFor="numero" className="form-label">
                Número *
              </label>
              <input
                type="text"
                id="numero"
                name="numero"
                value={formData.numero}
                onChange={handleInputChange}
                placeholder="Ex: 123"
                className={`form-input ${errors.numero ? "error" : ""}`}
                aria-describedby={errors.numero ? "numero-error" : undefined}
              />
              {errors.numero && (
                <span id="numero-error" className="error-message" role="alert">
                  {errors.numero}
                </span>
              )}
            </div>

            {/* Bairro Field */}
            <div className="form-group">
              <label htmlFor="bairro" className="form-label">
                Bairro *
              </label>
              <input
                type="text"
                id="bairro"
                name="bairro"
                value={formData.bairro}
                onChange={handleInputChange}
                placeholder="Ex: Centro"
                className={`form-input ${errors.bairro ? "error" : ""}`}
                aria-describedby={errors.bairro ? "bairro-error" : undefined}
              />
              {errors.bairro && (
                <span id="bairro-error" className="error-message" role="alert">
                  {errors.bairro}
                </span>
              )}
            </div>

            {/* Wrapper para CEP, Cidade e Estado */}
            <div className="full-width multi-field-line">
              {" "}
              {/* CEP Field */}
              <div className="form-group">
                <label htmlFor="cep" className="form-label">
                  CEP *
                </label>
                <input
                  type="text"
                  id="cep"
                  name="cep"
                  value={formData.cep}
                  onChange={handleInputChange}
                  placeholder="00000-000"
                  maxLength="9"
                  className={`form-input ${errors.cep ? "error" : ""}`}
                  aria-describedby={errors.cep ? "cep-error" : undefined}
                />
                {errors.cep && (
                  <span id="cep-error" className="error-message" role="alert">
                    {errors.cep}
                  </span>
                )}
              </div>
              {/* Cidade Field */}
              <div className="form-group">
                <label htmlFor="cidade" className="form-label">
                  Cidade *
                </label>
                <input
                  type="text"
                  id="cidade"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleInputChange}
                  placeholder="Ex: Mossoró"
                  className={`form-input ${errors.cidade ? "error" : ""}`}
                  aria-describedby={errors.cidade ? "cidade-error" : undefined}
                />
                {errors.cidade && (
                  <span
                    id="cidade-error"
                    className="error-message"
                    role="alert"
                  >
                    {errors.cidade}
                  </span>
                )}
              </div>
              {/* Estado Field */}
              <div className="form-group form-group-short">
                {" "}
                <label htmlFor="estado" className="form-label">
                  Estado *
                </label>
                <input
                  type="text"
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                  placeholder="Ex: RN"
                  maxLength="2"
                  className={`form-input ${errors.estado ? "error" : ""}`}
                  aria-describedby={errors.estado ? "estado-error" : undefined}
                />
                {errors.estado && (
                  <span
                    id="estado-error"
                    className="error-message"
                    role="alert"
                  >
                    {errors.estado}
                  </span>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="form-group full-width">
              <label htmlFor="email" className="form-label">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="seu@email.com"
                className={`form-input ${errors.email ? "error" : ""}`}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <span id="email-error" className="error-message" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Senha *
              </label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Digite sua senha"
                  className={`form-input ${errors.password ? "error" : ""}`}
                  aria-describedby={
                    errors.password ? "password-error" : "password-help"
                  }
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  tabIndex={0}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div
                      className={`strength-fill strength-${passwordStrength}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="strength-text">
                    {passwordStrength < 2 && "Fraca"}
                    {passwordStrength === 2 && "Regular"}
                    {passwordStrength === 3 && "Boa"}
                    {passwordStrength >= 4 && "Forte"}
                  </span>
                </div>
              )}
              {errors.password && (
                <span
                  id="password-error"
                  className="error-message"
                  role="alert"
                >
                  {errors.password}
                </span>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmar Senha *
              </label>
              <div className="password-input-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirme sua senha"
                  className={`form-input ${
                    errors.confirmPassword ? "error" : ""
                  }`}
                  aria-describedby={
                    errors.confirmPassword ? "confirmPassword-error" : undefined
                  }
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? "Ocultar senha" : "Mostrar senha"
                  }
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span
                  id="confirmPassword-error"
                  className="error-message"
                  role="alert"
                >
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`btn-primary ${isSubmitting ? "loading" : ""}`}
            disabled={isSubmitting}
            aria-describedby="submit-help"
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Criando conta...
              </>
            ) : (
              "Criar Conta"
            )}
          </button>
        </form>

        <div className="login-link">
          <span>Já tem uma conta? </span>
          <a href="/signin">Fazer login</a>
        </div>
      </div>

      <Footer />
      <RegistrationSuccessModal
        show={showSuccessModal}
        onCloseAndRedirect={handleCloseSuccessModalAndRedirect}
      />
    </div>
  );
};

export default RegistrationForm;
