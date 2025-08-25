import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../pages/AdminLayout";
import { getCustomerById, updateCustomer } from "../Services/CustomerService";
import styles from "./UpdatedCust.module.css";

const CustomerUpdateForm = () => {
  const { customer_id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    customer_name: "",
    cust_contact: "",
    cust_email: "",
    cust_address: "",
    cust_gst_no: ""
  });

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchCustomer = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getCustomerById(customer_id, token);
      setCustomer(Array.isArray(data) ? data[0] : data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching customer:", err);
      setLoading(false);
    }
  };
  fetchCustomer();
}, [customer_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await updateCustomer(customer_id, customer, token);
      alert("Customer updated successfully!");
      
      navigate("/admin/customers");
    } catch (err) {
      console.error("Error updating customer:", err);
      alert("Failed to update customer.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <AdminLayout>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>Update Customer</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Customer Name</label>
            <input
              type="text"
              name="customer_name"
              value={customer.customer_name}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Contact</label>
            <input
              type="text"
              name="cust_contact"
              value={customer.cust_contact}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
            
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email</label>
            <input
              type="email"
              name="cust_email"
              value={customer.cust_email}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Address</label>
            <textarea
              name="cust_address"
              value={customer.cust_address}
              onChange={handleChange}
              className={styles.formTextarea}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>GST No</label>
            <input
              type="text"
              name="cust_gst_no"
              value={customer.cust_gst_no || ""}
              onChange={handleChange}
              className={styles.formInput}
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Update
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CustomerUpdateForm;
