import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import AdminLayout from "../pages/AdminLayout";
import styles from "./SupplierCss/AddSupplier.module.css";
import axios from "axios";

const AddSupplier = () => {
  const [formData, setFormData] = useState({
    supplier_name: "",
    sup_email: "",
    sup_contact: "",
    sup_address: "",
    sup_gst_no: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token"); // get JWT
      if (!token) {
        setError("You are not logged in!");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/suppliers/addSupliers",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccess("Supplier added successfully!");
        setFormData({
          supplier_name: "",
          sup_email: "",
          sup_contact: "",
          sup_address: "",
          sup_gst_no: "",
        });
      }
    } catch (err) {
  console.error(err);

  if (err.response && err.response.data && err.response.data.message) {
    // Show the real backend message
    setError(err.response.data.message);
  } else {
    setError("Failed to add supplier. Please try again.");
  }
}

  };

  return (
    <AdminLayout>
      <Container className={styles.adminContainer}>
        <Card className={styles.adminCard}>
          <Card.Body>
            <Card.Title className={styles.cardTitle}>Add Supplier</Card.Title>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <Form onSubmit={handleSubmit} className={styles.adminForm}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="supplier_name"
                      placeholder="Enter supplier name"
                      value={formData.supplier_name}
                      onChange={handleChange}
                      required
                      className={styles.formInput}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="sup_email"
                      placeholder="Enter supplier email"
                      value={formData.sup_email}
                      onChange={handleChange}
                      required
                      className={styles.formInput}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>Contact</Form.Label>
                    <Form.Control
                      type="text"
                      name="sup_contact"
                      placeholder="Enter contact number"
                      value={formData.sup_contact}
                      onChange={handleChange}
                      required
                      className={styles.formInput}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>GST Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="sup_gst_no"
                      placeholder="Enter GST number"
                      value={formData.sup_gst_no}
                      onChange={handleChange}
                      required
                      className={styles.formInput}
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="sup_address"
                      placeholder="Enter supplier address"
                      value={formData.sup_address}
                      onChange={handleChange}
                      required
                      className={styles.formInput}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Supplier"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </AdminLayout>
  );
};

export default AddSupplier;
