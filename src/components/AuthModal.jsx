import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, User } from 'lucide-react';

export const AuthModal = () => {
  const {
    isAuthOpen,
    setIsAuthOpen,
    authTab,
    setAuthTab,
    loginUser,
    registerUser
  } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authTab === 'login') {
      loginUser(email, password);
    } else {
      registerUser(name, email, password);
    }
    // reset form fields
    setName('');
    setEmail('');
    setPassword('');
  };

  const prefillTestAccount = () => {
    setEmail('buyer@luxecart.com');
    setPassword('luxepass123');
    setName('Elite Buyer');
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsAuthOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={() => setIsAuthOpen(false)} aria-label="Close Modal">
          <X size={20} />
        </button>

        {/* Auth Tabs */}
        <div className="modal-tabs">
          <button
            className={`modal-tab ${authTab === 'login' ? 'active' : ''}`}
            onClick={() => setAuthTab('login')}
          >
            Sign In
          </button>
          <button
            className={`modal-tab ${authTab === 'register' ? 'active' : ''}`}
            onClick={() => setAuthTab('register')}
          >
            Create Account
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            {authTab === 'register' && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    className="form-input"
                    style={{ paddingLeft: '40px' }}
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  className="form-input"
                  style={{ paddingLeft: '40px' }}
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
                <input
                  type="password"
                  className="form-input"
                  style={{ paddingLeft: '40px' }}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="form-submit-btn">
              {authTab === 'login' ? 'Sign In' : 'Register'}
            </button>
          </form>

          {/* Quick Demo Autofill Option */}
          <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '16px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Want to skip typing? Autofill valid sandbox credentials:
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ padding: '6px 14px', fontSize: '12px', width: '100%', borderRadius: '8px' }}
              onClick={prefillTestAccount}
            >
              Autofill Demo Credentials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
