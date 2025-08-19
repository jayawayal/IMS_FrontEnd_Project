import React from "react";
import { Navbar, Container, Image } from "react-bootstrap";
import styles from "./AdminHeader.module.css";

function AdminHeader() {
  return (
    <Navbar className={styles.adminHeaderNavbar}>
      <Container fluid className={styles.adminHeaderContainer}>
        <Navbar.Brand className={styles.adminHeaderBrand}>
          <Image
            src="/dropbox_9769969.png"
            roundedCircle
            className={styles.adminHeaderLogo}
            alt="Logo"
          />
          <span className={styles.adminHeaderTitle}>
            Inventory Management
          </span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default AdminHeader;
