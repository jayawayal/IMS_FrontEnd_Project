import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import AdminLayout from "../pages/AdminLayout";
import styles from "../SupplierComponent/SupplierCss/AddSupplier.module.css";
import axios from "axios";

const AddPurchase = () => {
  const [formData, setFormData] = useState({
    purchase_date: "",
    user_id: "",
    product_id: "",
    supplier_id: "",
    pur_quantity: "",
    invoice_number: "",
    gst_invoice_number: "",
    total_amount: "",
    payment_mode: "online",
  });

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [adminsRes, staffRes, productsRes, suppliersRes] = await Promise.all([
          axios.get("http://localhost:3000/api/viewAdmin", { headers }),
          axios.get("http://localhost:3000/api/viewstaff", { headers }),
          axios.get("http://localhost:3000/api/products/view", { headers }),
          axios.get("http://localhost:3000/api/suppliers/viewSup", { headers }),
        ]);

        // Users
        const admins = Array.isArray(adminsRes.data) ? adminsRes.data : [];
        const staff = Array.isArray(staffRes.data) ? staffRes.data : [];
        setUsers([...admins, ...staff]);

        // Products
        const products = Array.isArray(productsRes.data.products) ? productsRes.data.products : [];
        setProducts(products);

        // Suppliers
        const suppliers = Array.isArray(suppliersRes.data) ? suppliersRes.data : [];
        setSuppliers(suppliers);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch dropdown data");
        setTimeout(() => setError(""), 3000);
      }
    };

    fetchData();
  }, []);

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
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not logged in!");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/purchase/addPurchase",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccess("Purchase added successfully!");
        setFormData({
          purchase_date: "",
          user_id: "",
          product_id: "",
          supplier_id: "",
          pur_quantity: "",
          invoice_number: "",
          gst_invoice_number: "",
          total_amount: "",
          payment_mode: "online",
        });
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add purchase. Please try again.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <Container className={styles.adminContainer}>
        <Card className={styles.adminCard}>
          <Card.Body>
            <Card.Title className={styles.cardTitle}>Add Purchase</Card.Title>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <Form onSubmit={handleSubmit} className={styles.adminForm}>
              <Row>
                {/* Purchase Date */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>Purchase Date</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="purchase_date"
                      value={formData.purchase_date}
                      onChange={handleChange}
                      required
                      className={styles.formInput}
                    />
                  </Form.Group>
                </Col>

                {/* User */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>User</Form.Label>
                    <Form.Select
                      name="user_id"
                      value={formData.user_id}
                      onChange={handleChange}
                      required
                      className={styles.formInput}
                    >
                      <option value="">Select User</option>
                      {users.map((user) => (
                        <option key={user.user_id} value={user.user_id}>
                          {user.username}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Product */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>Product</Form.Label>
                    <Form.Select
                      name="product_id"
                      value={formData.product_id}
                      onChange={handleChange}
                      required
                      className={styles.formInput}
                    >
                      <option value="">Select Product</option>
                      {products.map((product) => (
                        <option key={product.product_id} value={product.product_id}>
                          {product.product_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Supplier */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>Supplier</Form.Label>
                    <Form.Select
                      name="supplier_id"
                      value={formData.supplier_id}
                      onChange={handleChange}
                      required
                      className={styles.formInput}
                    >
                      <option value="">Select Supplier</option>
                      {suppliers.map((supplier) => (
                        <option key={supplier.supplier_id} value={supplier.supplier_id}>
                          {supplier.supplier_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Quantity */}
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      name="pur_quantity"
                      value={formData.pur_quantity}
                      onChange={handleChange}
                      required
                      className={styles.formInput}
                    />
                  </Form.Group>
                </Col>

                {/* Invoice Number */}
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>Invoice Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="invoice_number"
                      value={formData.invoice_number}
                      onChange={handleChange}
                      className={styles.formInput}
                    />
                  </Form.Group>
                </Col>

                {/* GST Invoice Number */}
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>GST Invoice Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="gst_invoice_number"
                      value={formData.gst_invoice_number}
                      onChange={handleChange}
                      className={styles.formInput}
                    />
                  </Form.Group>
                </Col>

                {/* Total Amount */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>Total Amount</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      name="total_amount"
                      value={formData.total_amount}
                      onChange={handleChange}
                      required
                      className={styles.formInput}
                    />
                  </Form.Group>
                </Col>

                {/* Payment Mode */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className={styles.formLabel}>Payment Mode</Form.Label>
                    <Form.Select
                      name="payment_mode"
                      value={formData.payment_mode}
                      onChange={handleChange}
                      required
                      className={styles.formInput}
                    >
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? "Adding..." : "Add Purchase"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </AdminLayout>
  );
};

export default AddPurchase;
