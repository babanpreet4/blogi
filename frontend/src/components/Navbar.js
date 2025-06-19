import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

// A styles object with an enhanced, modern, and interactive design
const styles = {
  nav: {
    background: "linear-gradient(90deg, #1a202c, #111827)",
    color: "white",
    padding: "0 1.5rem",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  flexContainer: {
    display: "flex",
    height: "4rem",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heading: {
    fontSize: "1.5rem",
    margin: 0,
  },
  logoLink: {
    // Using the same vibrant gradient from the Home component for consistency
    background: "linear-gradient(90deg, #a78bfa, #667eea)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "filter 0.3s ease",
    // --- ICON UPDATE ---
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logoLinkHover: {
    filter: "brightness(1.2)",
  },
  navLinksContainer: {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
  },
  link: {
    color: "#cbd5e1",
    textDecoration: "none",
    fontWeight: 500,
    transition: "color 0.2s ease-in-out",
    padding: '0.5rem 0',
    // --- ICON UPDATE ---
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  linkHover: {
    color: "white",
  },
  // --- Button Styles ---
  baseButton: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontFamily: "inherit",
    fontSize: "0.9rem",
    transition: "all 0.2s ease-in-out",
    // --- ICON UPDATE ---
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  // --- Login/Register Button (Primary Action) ---
  primaryButton: {
    backgroundColor: "#667eea",
    color: "white",
  },
  primaryButtonHover: {
    backgroundColor: "#5a67d8",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
  },
  // --- Logout Button (Secondary/Danger Action) ---
  logoutButton: {
    color: "#f56565",
    backgroundColor: "transparent",
    border: "2px solid #f56565",
  },
  logoutButtonHover: {
    backgroundColor: "#f56565",
    color: "white",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(245, 101, 101, 0.3)",
  },
};

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // State to manage hover effects for a more interactive UI
  const [hovered, setHovered] = useState({
    logo: false,
    register: false,
    login: false,
    dashboard: false,
    logout: false,
  });

  const handleMouseEnter = (key) => setHovered(prev => ({ ...prev, [key]: true }));
  const handleMouseLeave = (key) => setHovered(prev => ({ ...prev, [key]: false }));

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Combine styles dynamically based on hover state
  const logoStyle = hovered.logo ? { ...styles.logoLink, ...styles.logoLinkHover } : styles.logoLink;
  const registerStyle = hovered.register ? { ...styles.link, ...styles.linkHover } : styles.link;
  const loginButtonStyle = hovered.login ? { ...styles.baseButton, ...styles.primaryButton, ...styles.primaryButtonHover } : { ...styles.baseButton, ...styles.primaryButton };
  const dashboardStyle = hovered.dashboard ? { ...styles.link, ...styles.linkHover } : styles.link;
  const logoutButtonStyle = hovered.logout ? { ...styles.baseButton, ...styles.logoutButton, ...styles.logoutButtonHover } : { ...styles.baseButton, ...styles.logoutButton };

  return (
    <nav style={styles.nav}>
      <div style={styles.flexContainer}>
        {/* Website Name/Logo */}
        <h1 style={styles.heading}>
          <RouterLink
            to="/"
            style={logoStyle}
            onMouseEnter={() => handleMouseEnter('logo')}
            onMouseLeave={() => handleMouseLeave('logo')}
          >
            {/* ICON ADDED */}
            ✍️ Blogi
          </RouterLink>
        </h1>

        {/* Navigation Links */}
        <div style={styles.navLinksContainer}>
          {!token ? (
            <>
              <RouterLink
                to="/register"
                style={registerStyle}
                onMouseEnter={() => handleMouseEnter('register')}
                onMouseLeave={() => handleMouseLeave('register')}
              >
                {/* ICON ADDED */}
                👤 Register
              </RouterLink>
              <RouterLink to="/login" style={{ textDecoration: 'none' }}>
                <button
                  style={loginButtonStyle}
                  onMouseEnter={() => handleMouseEnter('login')}
                  onMouseLeave={() => handleMouseLeave('login')}
                >
                  {/* ICON ADDED */}
                  ➡️ Login
                </button>
              </RouterLink>
            </>
          ) : (
            <>
              <RouterLink
                to="/dashboard"
                style={dashboardStyle}
                onMouseEnter={() => handleMouseEnter('dashboard')}
                onMouseLeave={() => handleMouseLeave('dashboard')}
              >
                {/* ICON ADDED */}
                📊 Dashboard
              </RouterLink>
              <button
                onClick={logout}
                style={logoutButtonStyle}
                onMouseEnter={() => handleMouseEnter('logout')}
                onMouseLeave={() => handleMouseLeave('logout')}
              >
                {/* ICON ADDED */}
                ⬅️ Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}