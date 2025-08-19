import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSignup from "../signup/signup";
import styles from "./login.module.css"; 

export default function Login({ onClose, setToken, setRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const navigate = useNavigate();

  const checkAdmin = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/userExites");
      setShowSignup(!res.data.exists);
    } catch (err) {
      console.error(err);
      setShowSignup(false);
    }
  };

  useEffect(() => {
    checkAdmin();
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });
      const { token, role } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role.toLowerCase());
      setToken(token);
      setRole(role.toLowerCase());
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      onClose();

      if (role.toLowerCase() === "admin") navigate("/admin-panel");
      else if (role.toLowerCase() === "staff") navigate("/staff-panel");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  const toggleForms = async () => {
    if (!showLoginForm) {
      await checkAdmin();
    }
    setShowLoginForm((prev) => !prev);
    setError("");
  };

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-container"]}>
        <button className={styles["modal-close-btn"]} onClick={onClose}>
          &times;
        </button>

        {showLoginForm ? (
          <>
            <h2 className={styles["modal-title"]}>Login Form</h2>
            <form onSubmit={handleLoginSubmit}>
              <input
                className={styles["modal-input"]}
                type="text"
                name="username"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className={styles["modal-input"]}
                type="password"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className={`${styles["modal-submit-btn"]} btn btn-primary`}
              >
                Login
              </button>
              {error && <div className={styles["modal-error"]}>{error}</div>}
            </form>

            {showSignup && (
              <div
                className={styles["modal-register-text"]}
                onClick={toggleForms}
              >
                Register Here
              </div>
            )}
          </>
        ) : (
          <AdminSignup onClose={toggleForms} />
        )}
      </div>
    </div>
  );
}
