import React, { useState } from 'react';
import UseModal from './UseModal';
import { signupUser } from "../Redux/UserSlice";
import { useDispatch } from "react-redux";

function Signup({ onClose }) {
  const dispatch = useDispatch();

  const {
    username, email, password, setUsername, setEmail, setPassword
  } = UseModal();
  const [errors, setErrors] = useState({});
    const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const validateForm = () => {
    let validationErrors = {};
    if (!username) validationErrors.username = "Username is required";
    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email is invalid";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(signupUser({ username, email, password }))
      .unwrap()
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          setUsername("");
          setEmail("");
          setPassword("");
        }
        onClose ();
      })
      .catch((err) => {
        console.log("User signup error:", err);
      });
  };

  return (
    <div style={modalOverlayStyle} onClick={handleOverlayClick}>
      <div style={modalContentStyle}>
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label htmlFor="signup-username">Username</label>
            <input type="text" id="signup-username" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} value={username} style={inputStyle}/>
            {errors.username && <p style={errorTextStyle}>{errors.username}</p>}
          </div>
          <div style={formGroupStyle}>
            <label htmlFor="signup-email">Email</label>
            <input type="email" id="signup-email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} style={inputStyle}/>
            {errors.email && <p style={errorTextStyle}>{errors.email}</p>}
          </div>
          <div style={formGroupStyle}>
            <label htmlFor="signup-password">Password</label>
            <input type="password" id="signup-password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} style={inputStyle}/>
            {errors.password && <p style={errorTextStyle}>{errors.password}</p>}
          </div>
          <div style={buttonContainerStyle}>
            <button type="button" onClick={onClose} style={buttonStyle}> Cancel </button>
            <button type="submit" style={buttonStyle}> Sign Up </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,};

const modalContentStyle = { backgroundColor: '#fff', padding: '30px', borderRadius: '10px', width: '350px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', textAlign: 'center',};

const formGroupStyle = { marginBottom: '15px', textAlign: 'left',};

const inputStyle = { width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none', boxSizing: 'border-box',};

const errorTextStyle = { color: 'red', fontSize: '12px', marginTop: '5px',};

const buttonContainerStyle = { display: 'flex', justifyContent: 'space-between', marginTop: '20px',};

const buttonStyle = { padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#007BFF', color: '#fff', border: 'none', outline: 'none',};

export default Signup;
