import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="container">
        <p>© {new Date().getFullYear()} Inventory Management System. All rights reserved.</p>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
