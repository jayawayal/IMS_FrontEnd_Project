import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import AdminPanel from "./pages/AdminDashbored.jsx";
import StaffPanel from "./pages/StaffDashbored.jsx";
import LandinPage from "./pages/LanddingPage.jsx";
import AdminSignup from "./components/signup/signup.jsx";
import AddAdmin from "./AdminComponets/AddAdmin.jsx";
import AddStaff from "./AdminComponets/AddStaff.jsx"
import ViewAdmin from "./AdminComponets/ViewAdmin.jsx" // Import Add Admin page
import ViewStaff from "./AdminComponets/ViewStaff.jsx";
import AddProduct from "./ProductComponent/AddProduct.jsx";
import ViewProduct from "./ProductComponent/ViewProduct.jsx";


export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  // Update auth state when localStorage changes
  useEffect(() => {
    const updateAuth = () => {
      setToken(localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", updateAuth);
    return () => window.removeEventListener("storage", updateAuth);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<LandinPage setToken={setToken} setRole={setRole} />} />
        <Route path="/signup" element={<AdminSignup />} />

        {/* Protected Admin routes */}
        <Route
          path="/admin-panel"
          element={token && role?.toLowerCase() === "admin" ? <AdminPanel /> : <Navigate to="/" />}
        />
        <Route
          path="/add-admin"
          element={token && role?.toLowerCase() === "admin" ? <AddAdmin/> : <Navigate to="/" />}
        />

        <Route
          path="/view-admin"
          element={token && role?.toLowerCase() === "admin" ? <ViewAdmin/> : <Navigate to="/" />}
        />

        <Route
          path="/add-staff"
          element={token && role?.toLowerCase() === "admin" ? <AddStaff /> : <Navigate to="/" />}
        />

        <Route
          path="/view-staff"
          element={token && role?.toLowerCase() === "admin" ? <ViewStaff/> : <Navigate to="/" />}
        />
        
        
        {/* Protected Staff route */}
        <Route
          path="/staff-panel"
          element={token && role?.toLowerCase() === "staff" ? <StaffPanel /> : <Navigate to="/" />}
        />

        {/*Protected Product */}
          <Route
          path="/add-products"
          element={token && role?.toLowerCase() === "admin" ? <AddProduct /> : <Navigate to="/" />}
        />

        <Route
          path="/view-Products"
          element={token && role?.toLowerCase() === "admin" || role?.toLowerCase() === "staff" ? <ViewProduct /> : <Navigate to="/" />}
        />

        {/* Optional: catch-all route for unknown paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
