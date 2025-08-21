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
import styles from "../SupplierComponent/SupplierCss/ViewSupplier.module.css"; // ✅ Supplier CSS

const ViewSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch all suppliers
  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/suppliers/viewSup", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSuppliers(data);
    } catch {
      setMsg({ type: "error", text: "Failed to load suppliers" });
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const searchSuppliers = async () => {
        // If search is empty, fetch all suppliers
        if (!search.trim()) {
          fetchSuppliers();
          return;
        }

        try {
          setLoading(true);
          const token = localStorage.getItem("token");

          // Use GET request with URL param
          const res = await fetch(
            `http://localhost:3000/api/suppliers/searchsuppbyname/${encodeURIComponent(search)}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const result = await res.json();

          if (res.ok) {
            setSuppliers(result);
            setMsg({ type: "", text: "" });
          } else {
            setSuppliers([]);
            setMsg({ type: "error", text: result.message || "No supplier found" });
          }
        } catch (error) {
          console.error(error);
          setMsg({ type: "error", text: "Search failed" });
        } finally {
          setLoading(false);
        }
      };

      searchSuppliers();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  // Fetch all suppliers on component mount
  useEffect(() => {
    fetchSuppliers();
  }, []);


  // Delete supplier
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/suppliers/delSup/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (res.ok) {
        setSuppliers(suppliers.filter((sup) => sup.supplier_id !== id));
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
            <Card.Title className={formStyles.cardTitle}>View Suppliers</Card.Title>

            {/* Search bar */}
            <Form className={`${formStyles.adminForm} mb-3`}>
              <Row>
                <Col md={12}>
                  <Form.Control
                    type="text"
                    placeholder="Search supplier..."
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

            {/* Supplier Table */}
            {loading ? (
              <p>Loading suppliers...</p>
            ) : suppliers.length === 0 ? (
              <p>No suppliers found.</p>
            ) : (
              <Table striped bordered hover responsive className={`mt-3 ${styles.adminTable}`}>
                <thead>
                  <tr>
                    <th>Sr.No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>GST Number</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((sup, index) => (
                    <tr key={sup.supplier_id}>
                      <td>{index + 1}</td>
                      <td>{sup.supplier_name}</td>
                      <td>{sup.sup_email}</td>
                      <td>{sup.sup_contact}</td>
                      <td>{sup.sup_address}</td>
                      <td>{sup.sup_gst_no}</td>
                      <td>
                        <div className={styles.actionButtons}>
                          <Button
                            className={styles.adminEditBtn}
                            onClick={() => navigate(`/admin/edit-supplier/${sup.supplier_id}`)}
                          >
                            <FaEdit /> Edit
                          </Button>


                          <Button
                            size="sm"
                            className={styles.adminDeleteBtn}
                            onClick={() => handleDelete(sup.supplier_id)}
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

export default ViewSupplier;
