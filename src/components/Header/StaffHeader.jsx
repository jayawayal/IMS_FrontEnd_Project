import React from "react";
import { Navbar, Container, Nav, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./StaffHeader.module.css";

export default function StaffHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("staffToken");
    navigate("/staff-login");
  };

  return (
    <Navbar expand="lg" collapseOnSelect className={styles.staffNavbar}>
      <Container fluid className={styles.staffNavbarContainer}>
        {/* Brand with logo */}
        <Navbar.Brand href="/staff-dashboard" className={styles.staffNavbarBrand}>
          <Image
            src="/dropbox_9769969.png"
            roundedCircle
            className={styles.staffNavbarLogo}
            alt="Logo"
          />
          Inventory Management
        </Navbar.Brand>

        {/* Hamburger menu for mobile */}
        <Navbar.Toggle aria-controls="staff-navbar-nav" />

        <Navbar.Collapse id="staff-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link onClick={handleLogout} className={styles.staffNavbarLogout}>
              🚪 Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
