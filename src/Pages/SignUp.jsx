import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function SignUp() {
  const { registerUser } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Email format regex
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Field validation logic
  const validateField = (name, value, allValues = formData) => {
    let error = '';

    if (name === 'name') {
      if (!value.trim()) {
        error = 'Full name is required';
      } else if (value.trim().length < 2) {
        error = 'Name must be at least 2 characters';
      }
    } else if (name === 'email') {
      if (!value.trim()) {
        error = 'Email address is required';
      } else if (!validateEmail(value)) {
        error = 'Please enter a valid email address (e.g. name@example.com)';
      }
    } else if (name === 'password') {
      if (!value) {
        error = 'Password is required';
      } else if (value.length < 6) {
        error = 'Password must be at least 6 characters long';
      }
    } else if (name === 'confirmPassword') {
      if (!value) {
        error = 'Please confirm your password';
      } else if (value !== allValues.password) {
        error = 'Passwords do not match';
      }
    } else if (name === 'agreeTerms') {
      if (!value) {
        error = 'You must agree to the Terms & Privacy Policy';
      }
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    const updated = { ...formData, [name]: val };
    setFormData(updated);
    setSubmitError('');

    if (touched[name]) {
      const err = validateField(name, val, updated);
      setErrors(prev => ({ ...prev, [name]: err }));
    }

    // If changing password, also re-validate confirmPassword if touched
    if (name === 'password' && touched.confirmPassword) {
      const confirmErr = validateField('confirmPassword', updated.confirmPassword, updated);
      setErrors(prev => ({ ...prev, confirmPassword: confirmErr }));
    }
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setTouched(prev => ({ ...prev, [name]: true }));
    const err = validateField(name, val, formData);
    setErrors(prev => ({ ...prev, [name]: err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameErr = validateField('name', formData.name);
    const emailErr = validateField('email', formData.email);
    const passErr = validateField('password', formData.password);
    const confirmErr = validateField('confirmPassword', formData.confirmPassword);
    const termsErr = validateField('agreeTerms', formData.agreeTerms);

    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
      agreeTerms: true
    });

    setErrors({
      name: nameErr,
      email: emailErr,
      password: passErr,
      confirmPassword: confirmErr,
      agreeTerms: termsErr
    });

    if (nameErr || emailErr || passErr || confirmErr || termsErr) {
      return;
    }

    const res = registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone
    });

    if (res.success) {
      navigate('/', { replace: true });
    } else {
      setSubmitError(res.error);
    }
  };

  // Password strength gauge
  const getPasswordStrength = (pass) => {
    if (!pass) return { label: '', color: '' };
    if (pass.length < 6) return { label: 'Too short (min 6 chars)', color: 'bg-danger', width: '25%' };
    if (pass.length < 8) return { label: 'Fair (6+ chars)', color: 'bg-warning', width: '50%' };
    if (/[0-9]/.test(pass) && /[a-zA-Z]/.test(pass) && pass.length >= 8) {
      return { label: 'Strong', color: 'bg-success', width: '100%' };
    }
    return { label: 'Good', color: 'bg-info', width: '75%' };
  };

  const strength = getPasswordStrength(formData.password);

  return (
    <div className="container py-5 my-3" style={{ maxWidth: '520px' }}>
      <div className="card shadow-sm border rounded-4 p-4 p-sm-5 bg-white">
        
        {/* Brand Logo & Header */}
        <div className="text-center mb-4">
          <Link to="/" className="d-inline-block text-decoration-none mb-2">
            <svg width="60" height="40" viewBox="0 0 1024 1024" fill="#002f34">
              <path d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z" />
            </svg>
          </Link>
          <h2 className="fw-bold fs-4 text-dark mb-1">Create an OLX Account</h2>
          <p className="text-muted small mb-0">Join millions of buyers and sellers today</p>
        </div>

        {/* Global Error Banner */}
        {submitError && (
          <div className="alert alert-danger py-2 small mb-3 d-flex align-items-center gap-2">
            <i className="bi bi-exclamation-triangle-fill"></i>
            <div>{submitError}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          
          {/* Full Name Field */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-dark">Full Name *</label>
            <div className="input-group">
              <span className="input-group-text bg-light text-muted">
                <i className="bi bi-person"></i>
              </span>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className={`form-control ${touched.name && errors.name ? 'is-invalid' : touched.name && !errors.name ? 'is-valid' : ''}`}
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {touched.name && errors.name && (
                <div className="invalid-feedback d-block small mt-1">
                  {errors.name}
                </div>
              )}
            </div>
          </div>

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

          {/* Phone Field (Optional) */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-dark">Phone Number (Optional)</label>
            <div className="input-group">
              <span className="input-group-text bg-light text-muted">
                <i className="bi bi-telephone"></i>
              </span>
              <input
                type="tel"
                name="phone"
                placeholder="+91 98765 43210"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password Field (min 6 characters) */}
          <div className="mb-2">
            <div className="d-flex align-items-center justify-content-between mb-1">
              <label className="form-label small fw-bold text-dark mb-0">Password *</label>
              <span className="text-muted" style={{ fontSize: '11px' }}>Minimum 6 characters</span>
            </div>
            <div className="input-group">
              <span className="input-group-text bg-light text-muted">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Create password (at least 6 characters)"
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

            {/* Password strength bar */}
            {formData.password && (
              <div className="mt-2">
                <div className="progress" style={{ height: '4px' }}>
                  <div
                    className={`progress-bar ${strength.color}`}
                    role="progressbar"
                    style={{ width: strength.width }}
                  ></div>
                </div>
                <div className="small text-muted mt-1" style={{ fontSize: '11px' }}>
                  Strength: {strength.label}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-dark">Confirm Password *</label>
            <div className="input-group">
              <span className="input-group-text bg-light text-muted">
                <i className="bi bi-shield-lock"></i>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Re-enter your password"
                className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : touched.confirmPassword && !errors.confirmPassword ? 'is-valid' : ''}`}
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <div className="invalid-feedback d-block small mt-1">
                  {errors.confirmPassword}
                </div>
              )}
            </div>
          </div>

          {/* Terms Agreement Checkbox */}
          <div className="mb-4">
            <div className="form-check">
              <input
                className={`form-check-input ${touched.agreeTerms && errors.agreeTerms ? 'is-invalid' : ''}`}
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label className="form-check-label small text-secondary" htmlFor="agreeTerms">
                I agree to the <span className="text-dark fw-semibold">Terms of Use</span> and <span className="text-dark fw-semibold">Privacy Policy</span>
              </label>
              {touched.agreeTerms && errors.agreeTerms && (
                <div className="invalid-feedback d-block small mt-1">
                  {errors.agreeTerms}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-warning w-100 fw-bold py-2 mb-3 text-dark shadow-sm"
          >
            Create Free Account
          </button>

          {/* Link to Sign In */}
          <div className="text-center pt-2 border-top">
            <span className="small text-muted">Already have an account? </span>
            <Link to="/signin" className="small fw-bold text-decoration-none" style={{ color: '#002f34' }}>
              Sign In here
            </Link>
          </div>

        </form>

      </div>
    </div>
  );
}
