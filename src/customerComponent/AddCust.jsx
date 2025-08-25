// src/CustomerComponent/AddCustomer.jsx
import React, { useState, useEffect } from "react";
import { addCustomer } from "../Services/CustomerService";
import AdminLayout from "../pages/AdminLayout"; 
import styles from "./AddCust.module.css";

export default function AddCustomer() {
  const [formData, setFormData] = useState({
    customer_name: "",
    cust_contact: "",
    cust_email: "",
    cust_address: "",
    cust_gst_no: "",
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await addCustomer(formData, token);
      setMessage(res.message);
      setIsSuccess(true);

      // Clear form fields after successful add
      setFormData({
        customer_name: "",
        cust_contact: "",
        cust_email: "",
        cust_address: "",
        cust_gst_no: "",
      });
    } catch (err) {
      setMessage(err.message || "Failed to add customer");
      setIsSuccess(false);
    }
  };

  // Auto-clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000); // 3 sec

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <AdminLayout>
      <div className={styles.container}>
        <h2 className={styles.title}>Add Customer</h2>
        
        {message && (
          <p className={`${styles.message} ${isSuccess ? styles.success : styles.error}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Customer Name</label>
            <input
              type="text"
              name="customer_name"
              placeholder="Customer Name"
              value={formData.customer_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Contact</label>
            <input
              type="text"
              name="cust_contact"
              placeholder="Customer Contact"
              value={formData.cust_contact}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="cust_email"
              placeholder="Customer Email"
              value={formData.cust_email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Address</label>
            <input
              type="text"
              name="cust_address"
              placeholder="Customer Address"
              value={formData.cust_address}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>GST No</label>
            <input
              type="text"
              name="cust_gst_no"
              placeholder="Enter GST NO"
              value={formData.cust_gst_no}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Add Customer
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
