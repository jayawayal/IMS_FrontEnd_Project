import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col
} from "react-bootstrap";

import AdminLayout from "../pages/AdminLayout";
import layoutStyles from "../Style/AdminLayout.module.css";
import formStyles from "../AdminCss/AddAdmin.module.css"; 
import styles from "../CategoryComponents/CategoryCss/ViewCategory.module.css"; // reuse table/form styles if needed

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/categories/viewCat", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const cat = data.find((c) => c.category_id === parseInt(id));
        if (cat) {
          setCategoryName(cat.category_name);
        }
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:3000/api/categories/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ category_name: categoryName }),
        }
      );

      if (res.ok) {
        alert("Category updated successfully!");
        navigate("/admin/view-category");
      } else {
        alert("Failed to update category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <AdminLayout>
      <Container className={layoutStyles.adminContainer}>
        <Card className={formStyles.adminCard}>
          <Card.Body>
            <Card.Title className={formStyles.cardTitle}>
              Edit Category
            </Card.Title>

            <Form onSubmit={handleSubmit} className={formStyles.adminForm}>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className={formStyles.formLabel}>
                      Category Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter category name"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      required
                      className={formStyles.formInput}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button type="submit" className={formStyles.submitButton}>
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </AdminLayout>
  );
};

export default EditCategory;
