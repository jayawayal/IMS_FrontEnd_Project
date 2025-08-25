import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Table,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import AdminLayout from "../pages/AdminLayout";
import axios from "axios";
import styles from "./PurchasesComponenteCss/ViewPurchase.module.css";
import { useNavigate } from "react-router-dom";

const ViewPurchase = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchPurchases = async (searchTerm = "") => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      let url = "http://localhost:3000/api/purchase/viewPurchases";

      if (searchTerm.trim()) {
        url = `http://localhost:3000/api/purchase/srchPurchaseByInvoice/${encodeURIComponent(
          searchTerm
        )}`;
      }

      const res = await axios.get(url, { headers });
      setPurchases(res.data.purchases || res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch purchases");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchPurchases(search);
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this purchase?")) return;
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(
        `http://localhost:3000/api/purchase/deletePurchase/${id}`,
        { headers }
      );
      fetchPurchases();
    } catch (err) {
      console.error(err);
      setError("Failed to delete purchase");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <AdminLayout>
      <Container className={styles.adminContainer}>
        <Card className={styles.adminCard}>
          <Card.Body>
            <Card.Title className={styles.cardTitle}>View Purchases</Card.Title>

            {/* Search bar */}
            <Form className="mb-3">
              <Row>
                <Col md={12}>
                  <Form.Control
                    type="text"
                    placeholder="Search by Invoice Number..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Col>
              </Row>
            </Form>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {loading ? (
              <p>Loading purchases...</p>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Sr.No</th>
                    <th>Date</th>
                    <th>User</th>
                    <th>Product</th>
                    <th>Supplier</th>
                    <th>Quantity</th>
                    <th>Invoice No</th>
                    <th>GST Invoice</th>
                    <th>Total Amount</th>
                    <th>Payment Mode</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.length === 0 ? (
                    <tr>
                      <td colSpan="11" style={{ textAlign: "center" }}>
                        No purchases found
                      </td>
                    </tr>
                  ) : (
                    purchases.map((purchase, index) => (
                      <tr key={purchase.purchase_id}>
                        <td>{index + 1}</td>
                        <td>
                          {new Date(purchase.purchase_date).toLocaleString()}
                        </td>
                        <td>{purchase.username}</td>
                        <td>{purchase.product_name}</td>
                        <td>{purchase.supplier_name}</td>
                        <td>{purchase.pur_quantity}</td>
                        <td>{purchase.invoice_number}</td>
                        <td>{purchase.gst_invoice_number}</td>
                        <td>{purchase.total_amount}</td>
                        <td>{purchase.payment_mode}</td>
                        <td>
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() =>
                              navigate(`/edit-purchase/${purchase.purchase_id}`)
                            }
                          >
                            Edit
                          </Button>{" "}
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(purchase.purchase_id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>
    </AdminLayout>
  );
};

export default ViewPurchase;
