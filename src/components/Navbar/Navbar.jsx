import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "../Login/Login.jsx";
import "./Navbar.css";

export default function Navbar({ setToken, setRole }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [active, setActive] = useState("home");

  const toggleLoginForm = () => setShowLoginForm((prev) => !prev);

  // Auto-close mobile menu on link click
  const handleNavClick = () => {
    const collapseEl = document.getElementById("navbarNav");
    if (collapseEl && collapseEl.classList.contains("show")) {
      // bootstrap is available because you imported bootstrap.bundle
      const bsCollapse = new window.bootstrap.Collapse(collapseEl);
      bsCollapse.hide();
    }
  };

  // Highlight active section while scrolling
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { root: null, threshold: 0.5 }
    );

    sections.forEach((sec) => obs.observe(sec));
    return () => sections.forEach((sec) => obs.unobserve(sec));
  }, []);

  return (
    <>
      <nav className="navbar-wrapper navbar navbar-expand-lg fixed-top bg-white shadow-sm">
        <div className="container-fluid navbar-container">
          <a className="navbar-brand d-flex align-items-center" href="#home" onClick={handleNavClick}>
            <img src="/dropbox_9769969.png" alt="Logo" className="navbar-logo" />
            <span className="navbar-title ms-2">Inventory Management System</span>
          </a>

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
                <a
                  className={`nav-link ${active === "home" ? "active" : ""}`}
                  href="#home"
                  onClick={handleNavClick}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${active === "about" ? "active" : ""}`}
                  href="#about"
                  onClick={handleNavClick}
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${active === "services" ? "active" : ""}`}
                  href="#services"
                  onClick={handleNavClick}
                >
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${active === "contact" ? "active" : ""}`}
                  href="#contact"
                  onClick={handleNavClick}
                >
                  Contact
                </a>
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
          onLoginSuccess={() => {}}
          setToken={setToken}
          setRole={setRole}
        />
      )}
    </>
  );
}
