import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";
import axios from "axios";
import AdminLayout from "../pages/AdminLayout";
import styles from "./SupplierCss/AddSupplier.module.css";

const EditSupplier = () => {
  const { id } = useParams(); // get supplier_id from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    supplier_name: "",
    sup_contact: "",
    sup_email: "",
    sup_address: "",
    sup_gst_no: "",
  });

  // Fetch supplier details
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/suppliers/${id}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/suppliers/${id}`, formData)
      .then(() => {
        alert("Supplier updated successfully");
        navigate("/viewsupplier");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update supplier");
      });
  };

  return (
    <AdminLayout>
      <Container className={styles.adminContainer}>
        <Card className={styles.adminCard}>
          <Card.Body>
            <h4 className="mb-4 text-center">Edit Supplier</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="supplier_name"
                  value={formData.supplier_name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="text"
                  name="sup_contact"
                  value={formData.sup_contact}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="sup_email"
                  value={formData.sup_email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="sup_address"
                  value={formData.sup_address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>GST No</Form.Label>
                <Form.Control
                  type="text"
                  name="sup_gst_no"
                  value={formData.sup_gst_no}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Update Supplier
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </AdminLayout>
  );
};

export default EditSupplier;
