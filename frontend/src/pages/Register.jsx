import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authAPI } from '../services/api'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    organizationName: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'EMPLOYEE',
    acceptTerms: false
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  })
  const navigate = useNavigate()
  const { login } = useAuth()

  const validatePassword = (password) => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[@#$%^&+=!]/.test(password)
    }
    setPasswordCriteria(criteria)
    return criteria
  }

  const isPasswordValid = () => {
    return Object.values(passwordCriteria).every(Boolean)
  }

  const validateForm = () => {
    const errors = {}
    
    if (!formData.organizationName.trim()) errors.organizationName = 'Organization name is required'
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email'
    }
    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (!isPasswordValid()) {
      errors.password = 'Password does not meet requirements'
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }
    if (!formData.firstName.trim()) errors.firstName = 'First name is required'
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required'
    
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    if (!formData.acceptTerms) {
      setError('Please accept the terms and conditions')
      return
    }

    setError('')
    setLoading(true)

    try {
      const { confirmPassword, acceptTerms, ...registerData } = formData
      const response = await authAPI.register(registerData)
      login(response.data.token, response.data)
      navigate('/')
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Registration failed. Please try again.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: null }))
    }
    if (field === 'password') {
      validatePassword(value)
    }
  }

  return (
    <div className="register-page-v2">
      <div className="register-left">
        <div className="register-left-inner">
          <div className="register-illustration">
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="40" y="60" width="320" height="200" rx="8" fill="#1e293b" opacity="0.05"/>
              <rect x="60" y="80" width="280" height="40" rx="4" fill="#1e293b" opacity="0.08"/>
              <rect x="60" y="140" width="130" height="100" rx="4" fill="#1e293b" opacity="0.06"/>
              <rect x="210" y="140" width="130" height="100" rx="4" fill="#1e293b" opacity="0.06"/>
              <circle cx="125" cy="180" r="20" fill="#1e293b" opacity="0.1"/>
              <rect x="155" y="165" width="20" height="4" rx="2" fill="#1e293b" opacity="0.12"/>
              <rect x="155" y="175" width="14" height="3" rx="1.5" fill="#1e293b" opacity="0.08"/>
              <circle cx="275" cy="180" r="20" fill="#1e293b" opacity="0.1"/>
              <rect x="305" y="165" width="20" height="4" rx="2" fill="#1e293b" opacity="0.12"/>
              <rect x="305" y="175" width="14" height="3" rx="1.5" fill="#1e293b" opacity="0.08"/>
              <rect x="60" y="280" width="280" height="60" rx="4" fill="#1e293b" opacity="0.04"/>
              <rect x="80" y="300" width="80" height="8" rx="4" fill="#1e293b" opacity="0.1"/>
              <rect x="80" y="316" width="120" height="6" rx="3" fill="#1e293b" opacity="0.06"/>
              <circle cx="360" cy="100" r="30" fill="#1e293b" opacity="0.03"/>
              <circle cx="40" y="320" r="20" fill="#1e293b" opacity="0.03"/>
            </svg>
          </div>
          
          <h2>Project Management</h2>
          <p className="tagline">Collaborate. Organize. Deliver.</p>
          
          <div className="feature-list">
            <div className="feature">
              <span className="feature-bullet">•</span>
              <span>Organize projects with clarity</span>
            </div>
            <div className="feature">
              <span className="feature-bullet">•</span>
              <span>Track progress in real-time</span>
            </div>
            <div className="feature">
              <span className="feature-bullet">•</span>
              <span>Collaborate with your team</span>
            </div>
          </div>
        </div>
      </div>

      <div className="register-right">
        <div className="register-form-container-v2">
          <div className="form-header-v2">
            <div className="brand-mark">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1>Create your account</h1>
            <p>Get started with your team in minutes</p>
          </div>

          {error && (
            <div className="error-banner">
              <span>{error}</span>
              <button onClick={() => setError('')} className="error-dismiss">✕</button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="clean-form">
            <div className="form-section">
              <h3>Organization</h3>
              <div className={`form-field ${fieldErrors.organizationName ? 'has-error' : ''}`}>
                <label htmlFor="organizationName">Organization name</label>
                <input
                  id="organizationName"
                  type="text"
                  placeholder="Your company or team name"
                  value={formData.organizationName}
                  onChange={(e) => handleInputChange('organizationName', e.target.value)}
                  autoComplete="organization"
                />
                {fieldErrors.organizationName && (
                  <span className="field-error">{fieldErrors.organizationName}</span>
                )}
              </div>
            </div>

            <div className="form-section">
              <h3>Personal details</h3>
              <div className="form-row-v2">
                <div className={`form-field ${fieldErrors.firstName ? 'has-error' : ''}`}>
                  <label htmlFor="firstName">First name</label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    autoComplete="given-name"
                  />
                  {fieldErrors.firstName && (
                    <span className="field-error">{fieldErrors.firstName}</span>
                  )}
                </div>
                <div className={`form-field ${fieldErrors.lastName ? 'has-error' : ''}`}>
                  <label htmlFor="lastName">Last name</label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    autoComplete="family-name"
                  />
                  {fieldErrors.lastName && (
                    <span className="field-error">{fieldErrors.lastName}</span>
                  )}
                </div>
              </div>

              <div className={`form-field ${fieldErrors.email ? 'has-error' : ''}`}>
                <label htmlFor="email">Work email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  autoComplete="email"
                />
                {fieldErrors.email && (
                  <span className="field-error">{fieldErrors.email}</span>
                )}
              </div>
            </div>

            <div className="form-section">
              <h3>Security</h3>
              <div className={`form-field ${fieldErrors.password ? 'has-error' : ''}`}>
                <label htmlFor="password">Password</label>
                <div className="password-wrapper">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="password-visibility-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.348 12 19.348c4.756 0 8.773-3.01 10.066-7.347.943-3.171-.977-6.215-3.184-7.772M7.5 7.5A4.5 4.5 0 0112 3m0 0a4.5 4.5 0 014.5 4.5M7.5 7.5H12m-4.5 0v4.5" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
                {fieldErrors.password && (
                  <span className="field-error">{fieldErrors.password}</span>
                )}
              </div>

              <div className={`form-field ${fieldErrors.confirmPassword ? 'has-error' : ''}`}>
                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  autoComplete="new-password"
                />
                {fieldErrors.confirmPassword && (
                  <span className="field-error">{fieldErrors.confirmPassword}</span>
                )}
              </div>

              <div className="password-requirements-v2">
                <span className="requirements-header">Password requirements:</span>
                <div className="requirements-items">
                  <span className={`req ${passwordCriteria.length ? 'met' : ''}`}>8+ characters</span>
                  <span className={`req ${passwordCriteria.uppercase ? 'met' : ''}`}>Uppercase</span>
                  <span className={`req ${passwordCriteria.lowercase ? 'met' : ''}`}>Lowercase</span>
                  <span className={`req ${passwordCriteria.number ? 'met' : ''}`}>Number</span>
                  <span className={`req ${passwordCriteria.special ? 'met' : ''}`}>Special char</span>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Role</h3>
              <div className="role-selector">
                {[
                  { value: 'OWNER', label: 'Owner', desc: 'Full administrative access' },
                  { value: 'MANAGER', label: 'Manager', desc: 'Manage projects and teams' },
                  { value: 'EMPLOYEE', label: 'Member', desc: 'View and complete tasks' }
                ].map((role) => (
                  <label key={role.value} className={`role-option ${formData.role === role.value ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={formData.role === role.value}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                    />
                    <span className="role-radio"></span>
                    <span className="role-content">
                      <span className="role-label">{role.label}</span>
                      <span className="role-desc">{role.desc}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="terms-section-v2">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                />
                <span className="custom-checkbox">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className="checkbox-text">
                  I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                </span>
              </label>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="form-footer-v2">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}