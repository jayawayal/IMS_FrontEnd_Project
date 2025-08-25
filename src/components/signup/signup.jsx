import React, { useState } from "react";
import axios from "axios";
import styles from "./signup.module.css";  //  import CSS module

const AdminSignup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    user_email: "",
    user_contact: "",
    address: "",
    username: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role || !formData.name || !formData.user_email || !formData.username || !formData.password) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/register/user", formData);
      setMessage(response.data);
      setFormData({ role: "", name: "", user_email: "", user_contact: "", address: "", username: "", password: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className={styles.signupPageWrapper}>
      <div className={styles.signupContainer}>
        <h2 className={styles.signupTitle}>Signup</h2>

        {message && <p className={styles.signupSuccess}>{message}</p>}
        {error && <p className={styles.signupError}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <select name="role" value={formData.role} onChange={handleChange} className={styles.signupInput} required>
            <option value="" disabled>-- Select Role --</option>
            <option value="Admin">Admin</option>
            <option value="Staff">Staff</option>
          </select>

          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className={styles.signupInput} required />
          <input type="email" name="user_email" placeholder="Email" value={formData.user_email} onChange={handleChange} className={styles.signupInput} required />
          <input type="text" name="user_contact" placeholder="Contact" value={formData.user_contact} onChange={handleChange} className={styles.signupInput} />
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className={styles.signupInput} />
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className={styles.signupInput} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className={styles.signupInput} required />

          <button type="submit" className={styles.signupBtn}>Register</button>
        </form>

        <div className={styles.signupBack} onClick={onClose}>
          Back to Login
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
