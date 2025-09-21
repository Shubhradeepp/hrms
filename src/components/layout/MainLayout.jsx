import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from './SideNav';
import { theme } from '../../theme/theme';
import { STORAGE_KEYS } from '../../utils/constants';

const MainLayout = () => {
  const [sidenavCollapsed, setSidenavCollapsed] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.SIDEBAR_COLLAPSED) === 'true';
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidenavCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidenav = () => {
    const newState = !sidenavCollapsed;
    setSidenavCollapsed(newState);
    localStorage.setItem(STORAGE_KEYS.SIDEBAR_COLLAPSED, newState.toString());
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh',
      backgroundColor: theme.colors.background
    }}>
      {/* Hamburger Menu for Mobile */}
      { sidenavCollapsed && (
        <button
          onClick={toggleSidenav}
          style={{
            position: 'fixed',
            top: theme.spacing.md,
            left: theme.spacing.md,
            zIndex: 1001,
            background: theme.colors.white,
            border: `1px solid ${theme.colors.lightGray}`,
            borderRadius: theme.borderRadius.small,
            padding: "2px",
            fontSize: isMobile ? '26px' : '20px',
            cursor: 'pointer',
            marginLeft: isMobile ? '0px' : '14px',
            boxShadow: theme.shadows.small,
          }}
        >
          ☰
        </button>
      )}

      <SideNav 
        collapsed={sidenavCollapsed}
        onToggle={toggleSidenav}
      />
      
      <div 
        className="main-content sidebar-transition"
        style={{
          flex: 1,
          marginLeft: (!sidenavCollapsed) ? '260px' : (isMobile ? '0' : '70px'),
          backgroundColor: theme.colors.background,
          minHeight: '100vh',
          overflow: 'auto',
          width: '100%',
          maxWidth: '100vw',
          paddingTop: isMobile ? theme.spacing.xl : 0,
        }}
        onClick={() => isMobile && !sidenavCollapsed && toggleSidenav()}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;