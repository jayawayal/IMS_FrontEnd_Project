// src/pages/ViewAdmin.jsx
import React, { useEffect, useState } from "react";
import { Container, Card, Table } from "react-bootstrap";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import AdminLayout from "../pages/AdminLayout"; 
import layoutStyles from "../Style/AdminLayout.module.css"; // Layout CSS
import styles from "../AdminCss/ViewAdmin.module.css"; // Page-specific CSS

const ViewAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Fetch all admins
  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/viewAdmin");
      setAdmins(response.data);
      setErrorMessage("");
    } catch (error) {
      console.error("Fetch Admins Error:", error);
      setErrorMessage("Failed to load admins.");
    }
  };

  // Delete admin
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/deleteUser/${id}`);
      setAdmins(admins.filter((admin) => admin.id !== id));
      setSuccessMessage("Admin deleted successfully.");
      setErrorMessage("");
    } catch (error) {
      console.error("Delete Error:", error);
      setErrorMessage("Failed to delete admin.");
      setSuccessMessage("");
    }
  };

  // Redirect to update page
  const handleUpdate = (id) => {
    window.location.href = `/update-admin/${id}`;
  };

  return (
    <AdminLayout>
      <Container className={layoutStyles.adminContainer}>
        <Card className={styles.adminCard}>
          <Card.Body>
            <Card.Title className={styles.cardTitle}>All Admins</Card.Title>

            {/* Error / Success messages */}
            {errorMessage && <p className={styles.adminError}>{errorMessage}</p>}
            {successMessage && (
              <p className={styles.adminSuccess}>{successMessage}</p>
            )}

            {/* Admins Table */}
            <Table striped bordered hover responsive className={styles.adminTable}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Username</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.length > 0 ? (
                  admins.map((admin, index) => (
                    <tr key={admin.id}>
                      <td>{index + 1}</td>
                      <td>{admin.name}</td>
                      <td>{admin.user_email}</td>
                      <td>{admin.user_contact}</td>
                      <td>{admin.address}</td>
                      <td>{admin.username}</td>
                      <td>
                        <span
                          className={`${styles.adminActionBtn} ${styles.adminEditBtn}`}
                          onClick={() => handleUpdate(admin.id)}
                        >
                          <FaEdit /> Update
                        </span>
                        <span
                          className={`${styles.adminActionBtn} ${styles.adminDeleteBtn}`}
                          onClick={() => handleDelete(admin.id)}
                        >
                          <FaTrash /> Delete
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No admins found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </AdminLayout>
  );
};

export default ViewAdmin;
