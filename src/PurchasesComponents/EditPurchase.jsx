import React, { useEffect, useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../pages/AdminLayout";
import axios from "axios";
import styles from "./PurchasesComponenteCss/EditPurchase.module.css";

const EditPurchase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [purchase, setPurchase] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchPurchase = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get(
        `http://localhost:3000/api/purchase/getPurchaseById/${id}`,
        { headers }
      );

      // if backend sends array, pick first object
     setPurchase(res.data[0] || {});
 
    } catch (err) {
      console.error(err);
      setError("Failed to fetch purchase details");
    } finally {
      setLoading(false);
    }
  };
  fetchPurchase();
}, [id]);


  const handleChange = (e) => {
    setPurchase({ ...purchase, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.put(
        `http://localhost:3000/api/purchase/updatePurchase/${id}`,
        purchase,
        { headers }
      );
      navigate("/view-purchases");
    } catch (err) {
      console.error(err);
      setError("Failed to update purchase");
    }
  };

  return (
    <AdminLayout>
      <Container className={styles.editContainer}>
        <Card className={styles.editCard}>
          <Card.Body>
            <Card.Title className={styles.cardTitle}>
              Edit Purchase
            </Card.Title>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="pur_quantity"
                    value={purchase.pur_quantity || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Total Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="total_amount"
                    value={purchase.total_amount || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Payment Mode</Form.Label>
                  <Form.Select
                    name="payment_mode"
                    value={purchase.payment_mode || "online"}
                    onChange={handleChange}
                  >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </Form.Select>
                </Form.Group>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className="d-flex justify-content-between">
                  <Button
                    variant="secondary"
                    onClick={() => navigate("/view-purchases")}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleUpdate}>
                    Update
                  </Button>
                </div>
              </Form>
            )}
          </Card.Body>
        </Card>
      </Container>
    </AdminLayout>
  );
};

export default EditPurchase;
