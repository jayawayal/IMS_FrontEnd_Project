// src/pages/ViewStaff.jsx
import React, { useEffect, useState } from "react";
import { Container, Card, Table } from "react-bootstrap";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import AdminLayout from "../pages/AdminLayout"; 
import layoutStyles from "../Style/AdminLayout.module.css"; // shared layout css
import styles from "../AdminCss/ViewStaff.module.css"; // page specific css

const ViewStaff = () => {
  const [staff, setStaff] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/viewstaff");
      setStaff(response.data);
      setErrorMessage("");
    } catch (error) {
      console.error("Fetch Staff Error:", error);
      setErrorMessage("Failed to load staff.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/deleteUser/${id}`);
      setStaff(staff.filter((member) => member.id !== id));
      setSuccessMessage("Staff deleted successfully.");
      setErrorMessage("");
    } catch (error) {
      console.error("Delete Error:", error);
      setErrorMessage("Failed to delete staff.");
      setSuccessMessage("");
    }
  };

  const handleUpdate = (id) => {
    window.location.href = `/update-staff/${id}`;
  };

  return (
    <AdminLayout>
      <Container className={layoutStyles.adminContainer}>
        <Card className={styles.staffCard}>
          <Card.Body>
            <Card.Title className={styles.cardTitle}>All Staff</Card.Title>

            {errorMessage && <p className={styles.staffError}>{errorMessage}</p>}
            {successMessage && <p className={styles.staffSuccess}>{successMessage}</p>}

            <Table striped bordered hover responsive className={styles.staffTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Username</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.length > 0 ? (
                  staff.map((member, index) => (
                    <tr key={member.id}>
                      <td>{index + 1}</td>
                      <td>{member.name}</td>
                      <td>{member.user_email}</td>
                      <td>{member.user_contact}</td>
                      <td>{member.address}</td>
                      <td>{member.username}</td>
                      <td>
                        <span
                          className={`${styles.staffActionBtn} ${styles.staffEditBtn}`}
                          onClick={() => handleUpdate(member.id)}
                        >
                          <FaEdit /> Update
                        </span>
                        <span
                          className={`${styles.staffActionBtn} ${styles.staffDeleteBtn}`}
                          onClick={() => handleDelete(member.id)}
                        >
                          <FaTrash /> Delete
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No staff found.
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

export default ViewStaff;
