// src/components/layout/MainLayout.jsx - SIMPLIFIED VERSION
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
      <SideNav 
        collapsed={sidenavCollapsed}
        onToggle={toggleSidenav}
      />
      
      <div 
        className="main-content sidebar-transition"
        style={{
          flex: 1,
          marginLeft: (!sidenavCollapsed && !isMobile) ? '260px' : (isMobile ? '0' : '70px'),
          backgroundColor: theme.colors.background,
          minHeight: '100vh',
          overflow: 'auto'
        }}
      >
        {/* Outlet renders the matched child route component */}
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;