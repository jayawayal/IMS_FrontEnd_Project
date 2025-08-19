import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "../Login/Login.jsx";
import "./Navbar.css";

export default function Navbar({ setToken, setRole }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const navigate = useNavigate();

  const toggleLoginForm = () => {
    setShowLoginForm((prev) => !prev);
  };

  const handleLoginSuccess = (role) => {
    if (role === "admin") {
      navigate("/admin-panel");
    } else if (role === "staff") {
      navigate("/staff-panel");
    }
  };

  return (
    <>
      <nav className="navbar-wrapper navbar navbar-expand-lg">
        <div className="container-fluid navbar-container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="/public/dropbox_9769969.png"  // <-- logo in public folder
              alt="Logo"
              className="navbar-logo"
            />
            <span className="navbar-title ms-2">Inventory Management System</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav nav-links align-items-lg-center">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/services">
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>

            <div className="navbar-buttons">
              <button
                className="btn btn-outline-primary ms-lg-3 mt-3 mt-lg-0"
                onClick={toggleLoginForm}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {showLoginForm && (
        <Login
          onClose={toggleLoginForm}
          onLoginSuccess={handleLoginSuccess}
          setToken={setToken}
          setRole={setRole}
        />
      )}
    </>
  );
}
