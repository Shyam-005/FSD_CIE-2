import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function SignIn() {
  const { loginUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: true
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Email regex
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Field validation
  const validateField = (name, value) => {
    let error = '';
    if (name === 'email') {
      if (!value.trim()) {
        error = 'Email is required';
      } else if (!validateEmail(value)) {
        error = 'Please enter a valid email address (e.g. name@example.com)';
      }
    } else if (name === 'password') {
      if (!value) {
        error = 'Password is required';
      } else if (value.length < 6) {
        error = 'Password must be at least 6 characters long';
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData(prev => ({ ...prev, [name]: val }));
    setSubmitError('');

    if (touched[name]) {
      const err = validateField(name, val);
      setErrors(prev => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailErr = validateField('email', formData.email);
    const passErr = validateField('password', formData.password);

    setTouched({ email: true, password: true });
    setErrors({ email: emailErr, password: passErr });

    if (emailErr || passErr) {
      return;
    }

    const res = loginUser(formData.email, formData.password);
    if (res.success) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } else {
      setSubmitError(res.error);
    }
  };

  // Demo Login Helper
  const handleQuickDemo = (email) => {
    setFormData({
      email,
      password: 'password123',
      rememberMe: true
    });
    setErrors({});
    const res = loginUser(email, 'password123');
    if (res.success) {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="container py-5 my-3" style={{ maxWidth: '480px' }}>
      <div className="card shadow-sm border rounded-4 p-4 p-sm-5 bg-white">
        
        {/* Brand Logo & Title */}
        <div className="text-center mb-4">
          <Link to="/" className="d-inline-block text-decoration-none mb-2">
            <svg width="60" height="40" viewBox="0 0 1024 1024" fill="#002f34">
              <path d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z" />
            </svg>
          </Link>
          <h2 className="fw-bold fs-4 text-dark mb-1">Sign in to OLX</h2>
          <p className="text-muted small mb-0">Enter your credentials to access your account</p>
        </div>

        {/* Global Submit Error */}
        {submitError && (
          <div className="alert alert-danger py-2 small mb-3 d-flex align-items-center gap-2">
            <i className="bi bi-exclamation-triangle-fill"></i>
            <div>{submitError}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          
          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-dark">Email Address *</label>
            <div className="input-group">
              <span className="input-group-text bg-light text-muted">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                className={`form-control ${touched.email && errors.email ? 'is-invalid' : touched.email && !errors.email ? 'is-valid' : ''}`}
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {touched.email && errors.email && (
                <div className="invalid-feedback d-block small mt-1">
                  {errors.email}
                </div>
              )}
            </div>
          </div>

          {/* Password Field (at least 6 characters) */}
          <div className="mb-3">
            <div className="d-flex align-items-center justify-content-between mb-1">
              <label className="form-label small fw-bold text-dark mb-0">Password *</label>
              <span className="text-muted" style={{ fontSize: '11px' }}>Min 6 characters</span>
            </div>
            <div className="input-group">
              <span className="input-group-text bg-light text-muted">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter password (min 6 characters)"
                className={`form-control ${touched.password && errors.password ? 'is-invalid' : touched.password && !errors.password ? 'is-valid' : ''}`}
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </button>
              {touched.password && errors.password && (
                <div className="invalid-feedback d-block small mt-1">
                  {errors.password}
                </div>
              )}
            </div>
          </div>

          {/* Remember me */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label className="form-check-label small text-secondary" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <span className="small text-muted cursor-pointer" title="Demo password is password123">
              Forgot password?
            </span>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold py-2 mb-3 shadow-sm"
            style={{ backgroundColor: '#002f34', borderColor: '#002f34' }}
          >
            Sign In
          </button>

          {/* Demo 1-Click logins */}
          <div className="bg-light p-3 rounded-3 mb-3 border text-center">
            <div className="small text-muted fw-bold mb-2">QUICK 1-CLICK DEMO LOGIN</div>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-dark flex-fill"
                onClick={() => handleQuickDemo('shyam@example.com')}
              >
                👤 Shyam Sundar
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-dark flex-fill"
                onClick={() => handleQuickDemo('ananya@example.com')}
              >
                👩 Ananya Verma
              </button>
            </div>
          </div>

          {/* Link to Sign Up */}
          <div className="text-center pt-2 border-top">
            <span className="small text-muted">Don't have an account? </span>
            <Link to="/signup" className="small fw-bold text-decoration-none" style={{ color: '#002f34' }}>
              Sign Up here
            </Link>
          </div>

        </form>

      </div>
    </div>
  );
}
