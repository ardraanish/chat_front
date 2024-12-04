// Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  const styles = {
    layout: {
      display: 'flex',
    },
    main: {
      flex: 1,
      padding: '20px',
    },
  };

  return (
    <div style={styles.layout}>
      <Sidebar />
      <div style={styles.main}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
