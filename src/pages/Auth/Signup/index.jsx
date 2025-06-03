import { useState } from "react"
import Footer from "../../../components/footer"
import "./style.css"

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const formatCPF = (value) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    }
    return value
  }

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    }
    return value
  }

  const handleCPFChange = (e) => {
    const formatted = formatCPF(e.target.value)
    setFormData((prev) => ({ ...prev, cpf: formatted }))
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value)
    setFormData((prev) => ({ ...prev, phone: formatted }))
  }

  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Nome completo é obrigatório"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres"
    }

    // CPF validation
    if (!formData.cpf.trim()) {
      newErrors.cpf = "CPF é obrigatório"
    } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf) && !/^\d{11}$/.test(formData.cpf)) {
      newErrors.cpf = "CPF deve ter formato válido"
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório"
    } else if (
      !/^$$\d{2}$$\s\d{5}-\d{4}$/.test(formData.phone) &&
      !/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ""))
    ) {
      newErrors.phone = "Telefone deve ter formato válido"
    }

    // Date of birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Data de nascimento é obrigatória"
    } else {
      const birthDate = new Date(formData.dateOfBirth)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      if (age < 13 || age > 120) {
        newErrors.dateOfBirth = "Idade deve estar entre 13 e 120 anos"
      }
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Endereço é obrigatório"
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Endereço deve ser mais detalhado"
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Gênero é obrigatório"
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email deve ter formato válido"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória"
    } else if (formData.password.length < 8) {
      newErrors.password = "Senha deve ter pelo menos 8 caracteres"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Senha deve conter ao menos: 1 letra minúscula, 1 maiúscula e 1 número"
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Form submitted:", formData)
      alert("Cadastro realizado com sucesso!")

      // Reset form
      setFormData({
        name: "",
        cpf: "",
        phone: "",
        dateOfBirth: "",
        address: "",
        gender: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Erro ao realizar cadastro. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getPasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z\d]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(formData.password)

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
                aria-describedby={errors.dateOfBirth ? "dateOfBirth-error" : undefined}
              />
              {errors.dateOfBirth && (
                <span id="dateOfBirth-error" className="error-message" role="alert">
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
                <option value="outro">Outro</option>
                <option value="prefiro-nao-informar">Prefiro não informar</option>
              </select>
              {errors.gender && (
                <span id="gender-error" className="error-message" role="alert">
                  {errors.gender}
                </span>
              )}
            </div>

            {/* Address Field */}
            <div className="form-group full-width">
              <label htmlFor="address" className="form-label">
                Endereço Completo *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Rua, número, bairro, cidade, estado"
                className={`form-input ${errors.address ? "error" : ""}`}
                aria-describedby={errors.address ? "address-error" : undefined}
              />
              {errors.address && (
                <span id="address-error" className="error-message" role="alert">
                  {errors.address}
                </span>
              )}
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
                  aria-describedby={errors.password ? "password-error" : "password-help"}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
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
                <span id="password-error" className="error-message" role="alert">
                  {errors.password}
                </span>
              )}
              <small id="password-help" className="form-help">
                Mínimo 8 caracteres, incluindo maiúscula, minúscula e número
              </small>
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
                  className={`form-input ${errors.confirmPassword ? "error" : ""}`}
                  aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.confirmPassword && (
                <span id="confirmPassword-error" className="error-message" role="alert">
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

          {/* <small id="submit-help" className="form-help center">
            Ao criar sua conta, você concorda com nossos termos de uso
          </small> */}
        </form>

        <div className="login-link">
          <span>Já tem uma conta? </span>
          <a href="/signin">Fazer login</a>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default RegistrationForm
