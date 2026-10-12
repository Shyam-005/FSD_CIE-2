import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, user, setUser, showToast } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Shyam Sundar',
    email: 'shyam@example.com',
    phone: '+91 98765 43210'
  });

  if (!isAuthModalOpen) return null;

  const handleDemoLogin = (role) => {
    if (role === 'shyam') {
      setUser({
        id: 'user-demo-1',
        name: 'Shyam Sundar',
        email: 'shyam@example.com',
        phone: '+91 98765 43210',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        memberSince: 'Oct 2023'
      });
    } else if (role === 'ananya') {
      setUser({
        id: 'user-demo-2',
        name: 'Ananya Verma',
        email: 'ananya@example.com',
        phone: '+91 97412 88390',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        memberSince: 'Jan 2022'
      });
    }
    showToast('Logged in successfully!');
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Logged out successfully', 'info');
    setIsAuthModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({
      id: `user-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      memberSince: 'Oct 2026'
    });
    showToast(`Welcome, ${formData.name}!`);
    setIsAuthModalOpen(false);
  };

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex="-1" 
      style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(3px)', zIndex: 1065 }}
      onClick={() => setIsAuthModalOpen(false)}
    >
      <div 
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: '440px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 shadow-lg">
          
          <div className="modal-header border-0 pb-0">
            <button 
              type="button" 
              className="btn-close ms-auto" 
              onClick={() => setIsAuthModalOpen(false)}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body px-4 pt-0 pb-4 text-center">
            
            {/* Logo */}
            <div className="mb-3">
              <svg width="60" height="40" viewBox="0 0 1024 1024" fill="#002f34">
                <path d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z" />
              </svg>
            </div>

            <h4 className="fw-bold mb-1">
              {user ? 'Account Settings' : (isSignUp ? 'Create your account' : 'Welcome to OLX')}
            </h4>
            <p className="text-muted small mb-4">
              {user 
                ? `Currently signed in as ${user.name}` 
                : 'Enter your details or choose a 1-click demo profile'}
            </p>

            {user ? (
              <div className="text-start bg-light p-3 rounded mb-3">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <img src={user.avatar} alt="avatar" className="rounded-circle" style={{ width: '48px', height: '48px' }} />
                  <div>
                    <div className="fw-bold">{user.name}</div>
                    <div className="text-muted small">{user.phone}</div>
                    <div className="text-muted small">{user.email}</div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-danger w-100 fw-bold"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i> Log Out
                </button>
              </div>
            ) : (
              <>
                {/* 1-Click Demo Profiles */}
                <div className="mb-3">
                  <div className="small text-muted fw-bold mb-2">QUICK 1-CLICK DEMO LOGIN</div>
                  <div className="d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-dark d-flex align-items-center justify-content-center gap-2 py-2"
                      onClick={() => handleDemoLogin('shyam')}
                    >
                      <i className="bi bi-person-check-fill text-primary"></i>
                      <span>Sign in as <strong>Shyam Sundar</strong> (Buyer/Seller)</span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-dark d-flex align-items-center justify-content-center gap-2 py-2"
                      onClick={() => handleDemoLogin('ananya')}
                    >
                      <i className="bi bi-person-heart text-danger"></i>
                      <span>Sign in as <strong>Ananya Verma</strong></span>
                    </button>
                  </div>
                </div>

                <div className="d-flex align-items-center my-3">
                  <hr className="flex-grow-1" />
                  <span className="px-2 text-muted small">OR ENTER CUSTOM DETAILS</span>
                  <hr className="flex-grow-1" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="text-start">
                  <div className="mb-2">
                    <label className="form-label small fw-bold mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label small fw-bold mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      className="form-control"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100 fw-bold py-2 mb-2">
                    {isSignUp ? 'Create Account' : 'Continue'}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-link text-decoration-none small text-muted p-0"
                      onClick={() => setIsSignUp(!isSignUp)}
                    >
                      {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
                    </button>
                  </div>
                </form>
              </>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
