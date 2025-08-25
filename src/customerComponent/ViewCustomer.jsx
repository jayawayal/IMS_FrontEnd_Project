import React, { useEffect, useState } from "react";
import { getCustomers, deleteCustomer } from "../Services/CustomerService";
import AdminLayout from "../pages/AdminLayout";
import styles from "../customerComponent/ViewCust.module.css";
import { Users, Trash2, Edit } from "lucide-react"; // Icons
import { useNavigate } from "react-router-dom";

export default function ViewCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getCustomers(token);
      setCustomers(data);
    } catch (err) {
      setMessage(err.message || "Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000); // 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      const token = localStorage.getItem("token");
      await deleteCustomer(id, token);
      setMessage("Customer deleted successfully");
      fetchCustomers();
    } catch (err) {
      setMessage(err.message || "Delete failed");
    }
  };

  const handleUpdate = (cust) => {
    navigate(`/updated-customer/${cust.customer_id}`);
  };

  return (
    <AdminLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <Users size={28} className={styles.icon} />
          <h2 className={styles.title}>Customer List</h2>
        </div>

        {message && <p className={styles.message}>{message}</p>}
        {loading ? (
          <p className={styles.loading}>Loading customers...</p>
        ) : customers.length === 0 ? (
          <p className={styles.noData}>No customers found</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Address</th>
                <th>GST No</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((cust) => (
                <tr key={cust.customer_id}>
                  <td>{cust.customer_id}</td>
                  <td>{cust.customer_name}</td>
                  <td>{cust.cust_contact}</td>
                  <td>{cust.cust_email}</td>
                  <td>{cust.cust_address}</td>
                  <td>{cust.cust_gst_no || "N/A"}</td>
                  <td className={styles.actions}>
                    <button
                      className={styles.editBtn}
                      onClick={() => handleUpdate(cust)}
                    >
                      <Edit size={18}  color="blue"/>
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(cust.customer_id)}
                    >
                      <Trash2 size={18} color="red"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
