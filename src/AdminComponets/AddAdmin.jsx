import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import AdminLayout from "../pages/AdminLayout"; 
import layoutStyles from "../Style/AdminLayout.module.css"; // Layout CSS
import formStyles from "../AdminCss/AddAdmin.module.css";   // Form CSS

const AddAdmin = () => {
  const [formData, setFormData] = useState({
    role: "admin",
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
      if (!response.ok) throw new Error(data || "Failed to add admin");

      setSuccessMessage("Admin added successfully!");
      setErrorMessage("");
      setTimeout(() => setSuccessMessage(""), 5000);

      setFormData({
        role: "admin",
        name: "",
        user_email: "",
        user_contact: "",
        address: "",
        username: "",
        password: "",
      });
    } catch (error) {
      console.error("Add Admin Error:", error);
      setErrorMessage("Error adding admin: " + error.message);
      setSuccessMessage("");
    }
  };

  return (
    <AdminLayout>
      <Container className={layoutStyles.adminContainer}>
        <Card className={formStyles.adminCard}>
          <Card.Body>
            <Card.Title className={formStyles.cardTitle}>Add New Admin</Card.Title>

            <Form onSubmit={handleSubmit} className={formStyles.adminForm}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label className={formStyles.formLabel}>Name</Form.Label>
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
                    <Form.Label className={formStyles.formLabel}>Email</Form.Label>
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
                    <Form.Label className={formStyles.formLabel}>Contact</Form.Label>
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
                <Form.Label className={formStyles.formLabel}>Address</Form.Label>
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
                    <Form.Label className={formStyles.formLabel}>Username</Form.Label>
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
                    <Form.Label className={formStyles.formLabel}>Password</Form.Label>
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

              <div className={formStyles.adminBtnWrapper}>
                <Button type="submit" className={formStyles.adminBtn}>
                  Add Admin
                </Button>
              </div>
            </Form>

            {successMessage && (
              <p className={formStyles.adminMessageSuccess}>{successMessage}</p>
            )}
            {errorMessage && (
              <p className={formStyles.adminMessageError}>{errorMessage}</p>
            )}
          </Card.Body>
        </Card>
      </Container>
    </AdminLayout>
  );
};

export default AddAdmin;
