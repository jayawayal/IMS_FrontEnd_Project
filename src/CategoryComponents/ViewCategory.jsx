import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Card,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";  

import { FaEdit, FaTrash } from "react-icons/fa";

import AdminLayout from "../pages/AdminLayout";
import layoutStyles from "../Style/AdminLayout.module.css";
import formStyles from "../AdminCss/AddAdmin.module.css";
import styles from "../CategoryComponents/CategoryCss/ViewCategory.module.css"; 


const ViewCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [search, setSearch] = useState("");
  const navigate = useNavigate(); 

  // Helper: normalize data into array
  const normalizeCategories = (data) => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.categories)) return data.categories;
    return [];
  };

  // Fetch all categories
  const fetchCategories = async () => {

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/categories/viewCat", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log("Fetched categories:", data);
      setCategories(normalizeCategories(data));
    } catch {
      setMsg({ type: "error", text: "Failed to load categories" });
    } finally {
      setLoading(false);
    }
  };

  // Debounced search effect
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const searchCategories = async () => {
        if (!search.trim()) {
          fetchCategories();
          return;
        }

        try {
          setLoading(true);
          const token = localStorage.getItem("token");
          const res = await fetch("http://localhost:3000/api/categories/SearchCat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ category_name: search }),
          });

          const result = await res.json();
          console.log("Search result:", result);
          if (res.ok) {
            setCategories(normalizeCategories(result));
            setMsg({ type: "", text: "" });
          } else {
            setCategories([]);
            setMsg({ type: "error", text: result.message || "No category found" });
          }
        } catch {
          setMsg({ type: "error", text: "Search failed" });
        } finally {
          setLoading(false);
        }
      };

      searchCategories();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/categories/delCat/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (res.ok) {
        setCategories(categories.filter((cat) => cat.category_id !== id));
        setMsg({ type: "success", text: result.message });
      } else {
        setMsg({ type: "error", text: result.message || "Delete failed" });
      }
    } catch {
      setMsg({ type: "error", text: "Server error while deleting" });
    }
  };

  return (
    <AdminLayout>
      <Container className={layoutStyles.adminContainer}>
        <Card className={formStyles.adminCard}>
          <Card.Body>
            <Card.Title className={formStyles.cardTitle}>View Categories</Card.Title>

            {/* Real-time Search Bar */}
            <Form className={`${formStyles.adminForm} mb-3`}>
              <Row>
                <Col md={12}>
                  <Form.Control
                    type="text"
                    placeholder="Search category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={formStyles.formInput}
                  />
                </Col>
              </Row>
            </Form>

            {/* Message */}
            {msg.text && (
              <p
                className={
                  msg.type === "success"
                    ? formStyles.adminMessageSuccess
                    : formStyles.adminMessageError
                }
              >
                {msg.text}
              </p>
            )}

            {/* Category Table */}
            {loading ? (
              <p>Loading categories...</p>
            ) : categories.length === 0 ? (
              <p>No categories found.</p>
            ) : (
              <Table striped bordered hover responsive className={`mt-3 ${styles.adminTable}`}>
                <thead>
                  <tr>
                    <th>Sr.No</th>
                    <th>Category Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat, index) => (
                    <tr key={cat.category_id}>
                      <td>{index + 1}</td>
                      <td>{cat.category_name}</td>
                      <td>
                        <div className={styles.actionButtons}>
                          <Button
                            size="sm"
                            className={styles.adminEditBtn}
                            onClick={() => navigate(`/admin/edit-category/${cat.category_id}`)} // Navigate without reload
                          >
                            <FaEdit /> Edit
                          </Button>
                          <Button
                            size="sm"
                            className={styles.adminDeleteBtn}
                            onClick={() => handleDelete(cat.category_id)}
                          >
                            <FaTrash /> Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>
    </AdminLayout>
  );
};

export default ViewCategory;
