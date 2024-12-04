import React from 'react';
import Sidebar from './Sidebar';

import ChatIntro from './ChatIntro';
import { useLocation } from 'react-router-dom';
import Chatpage from './Chatpage';


function HomePage() {

  const location = useLocation()
  return (
    <div style={styles.chattingPage}>
      <Sidebar />
      {location.pathname === "/home" ? <ChatIntro/> : <Chatpage/>}
      
    </div>
  );
}

const styles = {
    chattingPage: {    display: 'grid',    height: '100vh',    gridTemplateColumns: '2fr 5fr',  },
};

export default HomePage;