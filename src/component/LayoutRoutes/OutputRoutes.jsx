import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../../component/Login';
import HomePage from '../HomePage'; 
import Header from '../Header';
import ProtectedRoute from './ProtectRoute'; 

function OutputRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = `${document.cookie}`
      .split("; ")
      .find((row) => row.startsWith("accesstoken"))
      ?.split("=")[1];
      console.log("Initial accessToken:", token);
    return Boolean(token);
  });

  const handleLoginSuccess = (token) => {
    document.cookie = `accesstoken=${token}; path=;`;
    console.log(token,'ggxuycbcfdnvljnv')
    setIsAuthenticated(true);
     // Update state
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login handleLoginSuccess={handleLoginSuccess} />} />
        
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <HomePage />
             </ProtectedRoute>
          }
        />

        
        <Route path="/chat/:id" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default OutputRoutes;
