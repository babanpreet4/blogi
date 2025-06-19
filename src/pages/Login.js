import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import api from "../api";

// --- Styles Object (Mirrors the Register component for consistency) ---
const styles = {
  // --- Main Layout & Container ---
  pageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 4rem)', // Adjust for navbar height
    padding: '2rem',
    background: '#f8f9fa',
  },
  loginBox: {
    display: 'flex',
    maxWidth: '960px',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
    overflow: 'hidden',
  },

  // --- Left Decorative Pane ---
  leftPane: {
    flex: 1,
    padding: '48px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
  },
  leftPaneIcon: {
    fontSize: '64px',
    marginBottom: '24px',
  },
  leftPaneTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '12px',
    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  leftPaneText: {
    fontSize: '1rem',
    maxWidth: '300px',
    opacity: 0.9,
  },

  // --- Right Form Pane ---
  rightPane: {
    flex: 1.2,
    padding: '48px 64px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#718096',
    marginBottom: '32px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#4a5568',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '1rem',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  },
  inputFocus: {
    borderColor: '#667eea',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.2)',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '14px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    color: 'white',
    backgroundColor: '#667eea',
    transition: 'all 0.2s ease-in-out',
  },
  buttonHover: {
    backgroundColor: '#5a67d8',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
  },
  message: {
    padding: '12px 16px',
    marginBottom: '20px',
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    fontSize: '0.9rem',
    textAlign: 'center',
  },
  messageSuccess: {
    backgroundColor: '#f0fff4',
    borderColor: '#9ae6b4',
    color: '#2f855a',
  },
  messageError: {
    backgroundColor: '#fff5f5',
    borderColor: '#feb2b2',
    color: '#c53030',
  },
  registerLinkContainer: {
    textAlign: 'center',
    marginTop: '24px',
    fontSize: '0.9rem',
    color: '#718096',
  },
  registerLink: {
    color: '#667eea',
    fontWeight: 600,
    textDecoration: 'none',
  },
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", { username, password });
      localStorage.setItem("token", response.data.access_token);
      setMessage("Login successful! Redirecting...");
      setIsSuccess(true);
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.detail || "Invalid username or password.");
      setIsSuccess(false);
    }
  };

  const messageStyle = message 
    ? { ...styles.message, ...(isSuccess ? styles.messageSuccess : styles.messageError) } 
    : { display: 'none' };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.loginBox}>
        {/* Left Decorative Pane */}
        <div style={styles.leftPane}>
          <span style={styles.leftPaneIcon} role="img" aria-label="key">🔑</span>
          <h2 style={styles.leftPaneTitle}>Welcome Back!</h2>
          <p style={styles.leftPaneText}>
            Sign in to continue your journey, manage your posts, and connect with the community.
          </p>
        </div>

        {/* Right Form Pane */}
        <div style={styles.rightPane}>
          <h2 style={styles.title}>Login</h2>
          <p style={styles.subtitle}>Please enter your details to sign in.</p>
          
          <div style={messageStyle}>{message}</div>

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label htmlFor="username" style={styles.label}>Username</label>
              <input
                id="username"
                type="text"
                placeholder="Your username"
                style={focusedInput === 'username' ? { ...styles.input, ...styles.inputFocus } : styles.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setFocusedInput('username')}
                onBlur={() => setFocusedInput(null)}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                style={focusedInput === 'password' ? { ...styles.input, ...styles.inputFocus } : styles.input}
                value={password}
                // --- THIS IS THE FIX ---
                onChange={(e) => setPassword(e.target.value)}
                // -----------------------
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                required
              />
            </div>
            <button
              type="submit"
              style={isButtonHovered ? { ...styles.button, ...styles.buttonHover } : styles.button}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              Sign In
            </button>
          </form>

          <div style={styles.registerLinkContainer}>
            Don't have an account?{" "}
            <RouterLink to="/register" style={styles.registerLink}>
              Sign Up
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  );
}