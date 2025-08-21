// EditSupplier.jsx
import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../pages/AdminLayout";
// import styles from "./SupplierCss/AddSupplier.module.css"; // ✅ reuse same CSS
import styles from "./SupplierCss/EditSupplier.module.css"

const EditSupplier = () => {
  const { id } = useParams(); // supplier_id from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    supplier_name: "",
    sup_email: "",
    sup_contact: "",
    sup_address: "",
    sup_gst_no: "",
  });

  const [error, setError] = useState("");

  // ✅ Load supplier details on page load
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/suppliers/serachSup/${id}`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setFormData(res.data[0]); // backend returns array
        } else {
          setError("Supplier not found");
        }
      })
      .catch(() => {
        setError("Failed to load supplier details");
      });
  }, [id]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await await axios.put(
  `http://localhost:3000/api/suppliers/updatesupp/${id}`,
  formData,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);
alert("Supplier updated successfully");
navigate("/admin/view-supplier");



// ✅ Navigate to supplier list page (fix path if needed)


    } catch (err) {
      console.error(err);
      alert("Failed to update supplier");
    }
  };

  return (
    <AdminLayout>
      <Container className="mt-4">
        <Card className={`${styles.card} p-4`}>
          <h3 className="text-center mb-4">Edit Supplier</h3>

          {error && <p className="text-danger text-center">{error}</p>}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Supplier Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="supplier_name"
                    value={formData.supplier_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
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
              </Col>
            </Row>

            <Row>
              <Col md={6}>
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
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>GST Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="sup_gst_no"
                    value={formData.sup_gst_no}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="sup_address"
                value={formData.sup_address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="text-center">
              <Button type="submit" className={`${styles.button} px-5`}>
                Update Supplier
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </AdminLayout>
  );
};

export default EditSupplier;
