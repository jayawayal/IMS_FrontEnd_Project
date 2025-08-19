import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Login function
  const loginUser = async (credentials) => {
    setLoading(true);
    setError(null);

  try {
  const response = await axios.post("http://localhost:3000/api/login", credentials);
  const { token, role, message } = response.data;

  console.log("Login Message:", message);

  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser({ username: credentials.username, role });
  } else {
    setUser(null);
  }
} catch (err) {
  console.error("Login Error:", err.response?.data?.message || "Login failed");
  setUser(null);
}
finally {
         setLoading(false);
     }
  };

  // Logout function
  const logoutUser = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  // Check token on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Optionally, you can fetch user info from backend here
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, error, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
