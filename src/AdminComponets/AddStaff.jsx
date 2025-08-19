import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import AdminLayout from "../pages/AdminLayout"; 
import layoutStyles from "../Style/AdminLayout.module.css"; 
import styles from "../AdminCss/AddStaff.module.css";

const AddStaff = () => {
  const [formData, setFormData] = useState({
    role: "staff",
    name: "",
    user_email: "",
    user_contact: "",
    address: "",
    username: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/register/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.text();

      if (!response.ok) {
        throw new Error(data || "Failed to add staff");
      }

      setSuccessMessage("Staff added successfully!");
      setErrorMessage("");
      setTimeout(() => setSuccessMessage(""), 5000);

      setFormData({
        role: "staff",
        name: "",
        user_email: "",
        user_contact: "",
        address: "",
        username: "",
        password: "",
      });
    } catch (error) {
      console.error("Add Staff Error:", error);
      setErrorMessage("Error adding staff: " + error.message);
      setSuccessMessage("");
    }
  };

  return (
    <AdminLayout>
      <Container className={layoutStyles.adminContainer}>
        <Card className={styles.staffCard}>
          <Card.Body>
            <Card.Title className={styles.staffCardTitle}>
              Add New Staff
            </Card.Title>

            <Form onSubmit={handleSubmit} className={styles.staffForm}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label className={styles.formLabel}>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="user_email">
                    <Form.Label className={styles.formLabel}>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="user_email"
                      value={formData.user_email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="user_contact">
                    <Form.Label className={styles.formLabel}>Contact</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter contact"
                      name="user_contact"
                      value={formData.user_contact}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="address">
                <Form.Label className={styles.formLabel}>Address</Form.Label>
                <Form.Control
                  placeholder="Enter address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label className={styles.formLabel}>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label className={styles.formLabel}>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className={styles.staffBtnWrapper}>
                <Button type="submit" className={styles.staffBtn}>
                  Add Staff
                </Button>
              </div>
            </Form>

            {successMessage && (
              <p className={styles.staffMessageSuccess}>{successMessage}</p>
            )}
            {errorMessage && (
              <p className={styles.staffMessageError}>{errorMessage}</p>
            )}
          </Card.Body>
        </Card>
      </Container>
    </AdminLayout>
  );
};

export default AddStaff;
