import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import AdminLayout from "../pages/AdminLayout"; // same layout as AddAdmin
import layoutStyles from "../Style/AdminLayout.module.css"; // layout CSS
import formStyles from "../AdminCss/AddAdmin.module.css"; // reuse AddAdmin form CSS

const AddCategory = () => {
  const [name, setName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const trimmed = name.trim();
    if (!trimmed) {
      setErrorMessage("Category name is required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No authorization token found. Please log in.");
        return;
      }

      const res = await fetch("http://localhost:3000/api/categories/addCat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ category_name: trimmed }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to add category");
      }

      setSuccessMessage("Category added successfully!");
      setName("");
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      setErrorMessage(err.message || "Something went wrong");
    }
  };

  return (
    <AdminLayout>
      <Container className={layoutStyles.adminContainer}>
        <Card className={formStyles.adminCard}>
          <Card.Body>
            <Card.Title className={formStyles.cardTitle}>Add New Category</Card.Title>

            <Form onSubmit={handleSubmit} className={formStyles.adminForm}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="categoryName">
                    <Form.Label className={formStyles.formLabel}>Category Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter category name"
                      name="category_name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className={formStyles.adminBtnWrapper}>
                <Button type="submit" className={formStyles.adminBtn}>
                  Add Category
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

export default AddCategory;
