import React, { useState } from 'react';
import Signup from './Signup';
import { useDispatch, useSelector } from 'react-redux';
import { signinUser } from '../Redux/UserSlice';
import { useNavigate } from 'react-router-dom';
import useModal from './UseModal';
import { useSocket } from './SocketContext';

function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const { isOpen, open, close, email, setEmail, password, setPassword } = useModal();
  const navigate = useNavigate();
  const socket = useSocket()

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    if (!email) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }
    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    dispatch(signinUser({ email, password }))
      .unwrap()
      .then((response) => {
        console.log('Login successful:', response);
        socket.emit("create-room",response.user.id)
        navigate('/home');
      })
      .catch((err) => {
        console.log('Login error:', err);
        setEmailError('Invalid email or password.');
        setPasswordError('');
      });
  };

  const styles = {
    loginPage: { width: '100%', maxWidth: '400px', margin: '50px auto', padding: '30px 40px', borderRadius: '10px', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', transition: 'all 0.3s ease' },

    header: { textAlign: 'center', marginBottom: '25px', fontSize: '26px', color: '#333', fontWeight: 'bold' },

    form: { display: 'flex', flexDirection: 'column', gap: '20px' },

    label: { fontSize: '15px', fontWeight: '500', color: '#444', marginBottom: '6px' },

    input: { padding: '12px', fontSize: '16px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none', transition: 'border-color 0.3s ease, box-shadow 0.3s ease' },

    error: { color: 'red', fontSize: '14px', marginBottom: '10px' },

    button: { padding: '12px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', transition: 'background-color 0.3s ease, transform 0.2s ease' },

    buttonDisabled: { backgroundColor: '#999', cursor: 'not-allowed' },

    signupText: { textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#666' },

    signupLink: { color: '#007bff', cursor: 'pointer', textDecoration: 'none', fontWeight: '500', marginLeft: '5px', transition: 'color 0.2s ease' },
  };

  return (
    <div>
      <div style={styles.loginPage}>
        <h1 style={styles.header}>Login</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            {emailError && <div style={styles.error}>{emailError}</div>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            {passwordError && <div style={styles.error}>{passwordError}</div>}
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              style={{ ...styles.button, ...(loading ? styles.buttonDisabled : {}) }}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <h6 style={styles.signupText}>
          If you don't have an account,
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              open();
            }}
            style={styles.signupLink}>
            Signup
          </a>
        </h6>
      </div>
      {isOpen && <Signup onClose={close} />}
    </div>
  );
}

export default Login;
