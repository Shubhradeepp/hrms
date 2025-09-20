import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { theme } from '../../theme/theme';
import { COMPANY_INFO } from '../../utils/constants';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await login(email, password);
    // The useEffect will handle the redirect when isAuthenticated becomes true
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.gray,
      padding: '20px'
    }}>
      <div className="fade-in" style={{
        backgroundColor: theme.colors.white,
        padding: '40px',
        borderRadius: theme.borderRadius.medium,
        boxShadow: theme.shadows.medium,
        width: '400px',
        maxWidth: '100%'
      }}>
        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '30px' 
        }}>
          <div style={{ 
            fontSize: '48px', 
            marginBottom: '10px' 
          }}>
            {COMPANY_INFO.logo}
          </div>
          <h1 style={{ 
            color: theme.colors.primary, 
            margin: '0 0 5px 0',
            fontSize: '28px',
            fontWeight: 'bold'
          }}>
            {COMPANY_INFO.name}
          </h1>
          <p style={{ 
            color: theme.colors.text.secondary, 
            margin: '0',
            fontSize: '16px'
          }}>
            Employee Dashboard
          </p>
        </div>

        {/* Login Form */}
        <div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: theme.colors.text.primary,
              fontWeight: '500'
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="input-field"
              placeholder="Enter your email"
              disabled={loading}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: theme.colors.text.primary,
              fontWeight: '500'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="input-field"
              placeholder="Enter your password"
              disabled={loading}
              required
            />
          </div>

          {error && (
            <div style={{ 
              color: theme.colors.error, 
              marginBottom: '20px', 
              fontSize: '14px',
              padding: '10px',
              backgroundColor: `${theme.colors.error}10`,
              borderRadius: theme.borderRadius.small,
              border: `1px solid ${theme.colors.error}30`
            }}>
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="btn-primary"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '16px',
              fontWeight: 'bold',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>

        {/* Demo Info */}
        <div style={{ 
          marginTop: '30px',
          padding: '15px',
          backgroundColor: theme.colors.background,
          borderRadius: theme.borderRadius.small,
          fontSize: '14px',
          color: theme.colors.text.secondary
        }}>
          <strong>Demo Login:</strong> Use any email and password to login
        </div>
      </div>
    </div>
  );
};

export default Login;