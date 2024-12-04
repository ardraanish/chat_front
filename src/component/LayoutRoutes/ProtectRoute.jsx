
import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Remove the curly braces, as jwt-decode is a default export

function getCookie(name) {
  const value = `; ${document.cookie}`;
  console.log("Document Cookies:", document.cookie);

  const parts = value.split(`; ${name}=`); 
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

const ProtectedRoute = ({ children }) => {
  const accesstoken = getCookie("accesstoken");

  console.log(accesstoken, "accesstoken");

  if (accesstoken) {
    try {
      const decoded = jwtDecode(accesstoken); // Decode the token
      console.log(decoded, "Decoded accesstoken");

      if (decoded) {
        return children; // Render protected content if token is valid
      } else {
        console.log("Token expired");
      }
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;
