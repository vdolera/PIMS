import React, { useState, useEffect } from "react"; 
import { useNavigate, useLocation } from 'react-router-dom';
import './Layou.css';
import DateTimeDisplay from "./DateTimeDisplay";

export default function Layout({ children, username = "Admin", onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false); // Initialize as false

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("welcomeShown"); // Clear the flag on logout
    if (onLogout) onLogout();
    navigate("/"); // redirect to login
  };

  useEffect(() => {
    // Check if the welcome popup has already been shown
    const welcomeShown = localStorage.getItem("welcomeShown");

    if (!welcomeShown) {
      setShowWelcome(true);
      localStorage.setItem("welcomeShown", "true"); // Store flag in localStorage
    }

    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const isActive = (path) => location.pathname.toLowerCase() === path.toLowerCase();

  return (
    <div className="container">
      {/* ✅ Welcome Popup */}
      {showWelcome && (
        <div className="welcome-popup">
          Welcome back, {username}!
        </div>
      )}

      {showLogoutConfirm && (
        <div className="modal-overlay logout-overlay">
          <div className="logout-modal">
            <div className="GIF"></div>
            <h3 className="logout-title">Are you sure you want to leave?</h3>
            <div className="logout-buttons">
              <button onClick={confirmLogout} className="logout-leave">Leave</button>
              <button onClick={() => setShowLogoutConfirm(false)} className="logout-stay">Stay</button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className="sidebar">
        <div className="Logo-Sidebar"></div>
        <h2>Main</h2>
        <ul>
        <li
          onClick={() => navigate('/home')}
          className={`nav-item MainButtons ${isActive('/home') ? 'active' : ''}`}
        >
          Data
        </li>
        <li
          onClick={() => navigate('/profile')}
          className={`nav-item MainButtons ${isActive('/profile') ? 'active' : ''}`}
        >
          Profile
        </li>
      </ul>
        <h2>Messages</h2>
        <div className="Messages">
        </div>

      </div>

      {/* Main Content */}
      <div className="Right-content">
        <div className="Header">
          <div className="datetime"><DateTimeDisplay /></div>
          <div className="Profile-box">
            <div className="profile"></div>
            <div className="Profile-Logout">
              <button className="Logout" onClick={handleLogout}>Log out</button>
            </div>
          </div>
        </div>

        <div className="main-content">
          {children}
        </div>
      </div>
    </div>
  );
}