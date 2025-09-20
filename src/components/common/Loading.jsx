import React from 'react';
import { theme } from '../../theme/theme';

const Loading = ({ message = 'Loading...', size = 'medium' }) => {
  const getSpinnerSize = () => {
    switch (size) {
      case 'small': return '24px';
      case 'large': return '60px';
      default: return '40px';
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg
    }}>
      {/* Spinner */}
      <div
        style={{
          width: getSpinnerSize(),
          height: getSpinnerSize(),
          border: `3px solid ${theme.colors.lightGray}`,
          borderTop: `3px solid ${theme.colors.primary}`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: theme.spacing.md
        }}
      />
      
      {/* Loading Text */}
      <p style={{
        color: theme.colors.text.secondary,
        fontSize: '16px',
        margin: 0,
        textAlign: 'center'
      }}>
        {message}
      </p>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loading;