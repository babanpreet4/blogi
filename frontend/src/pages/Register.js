import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import api from "../api";

// --- Styles Object for a Modern, Two-Column Registration Page ---
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
  registerBox: {
    display: 'flex',
    maxWidth: '960px',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
    overflow: 'hidden', // Important for keeping border-radius on child elements
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
    flex: 1.2, // Make the form pane slightly larger
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
    boxSizing: 'border-box', // Ensure padding doesn't affect width
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
  loginLinkContainer: {
    textAlign: 'center',
    marginTop: '24px',
    fontSize: '0.9rem',
    color: '#718096',
  },
  loginLink: {
    color: '#667eea',
    fontWeight: 600,
    textDecoration: 'none',
  },
};

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null); // 'username' or 'password'
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", { username, password });
      setMessage("Registration successful! Redirecting to login...");
      setIsSuccess(true);
      setUsername("");
      setPassword("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.detail || "Registration failed. Please try a different username.");
      setIsSuccess(false);
    }
  };

  const messageStyle = message 
    ? { ...styles.message, ...(isSuccess ? styles.messageSuccess : styles.messageError) } 
    : { display: 'none' };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.registerBox}>
        {/* Left Decorative Pane */}
        <div style={styles.leftPane}>
          <span style={styles.leftPaneIcon} role="img" aria-label="pen">✒️</span>
          <h2 style={styles.leftPaneTitle}>Join Blogi</h2>
          <p style={styles.leftPaneText}>
            Unlock your creativity and share your stories with a vibrant community of writers and readers.
          </p>
        </div>

        {/* Right Form Pane */}
        <div style={styles.rightPane}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Let's get you started!</p>
          
          <div style={messageStyle}>{message}</div>

          <form onSubmit={handleRegister} style={styles.form}>
            <div style={styles.inputGroup}>
              <label htmlFor="username" style={styles.label}>Username</label>
              <input
                id="username"
                type="text"
                placeholder="e.g., jane_doe"
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
                onChange={(e) => setPassword(e.target.value)}
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
              Register
            </button>
          </form>

          <div style={styles.loginLinkContainer}>
            Already have an account?{" "}
            <RouterLink to="/login" style={styles.loginLink}>
              Log In
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  );
}