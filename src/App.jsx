import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import AdminPanel from "./pages/AdminDashbored.jsx";
import StaffPanel from "./pages/StaffDashbored.jsx";
import LandinPage from "./pages/LanddingPage.jsx";
import AdminSignup from "./components/signup/signup.jsx";
import AddAdmin from "./AdminComponets/AddAdmin.jsx";
import AddStaff from "./AdminComponets/AddStaff.jsx";
import ViewAdmin from "./AdminComponets/ViewAdmin.jsx";
import ViewStaff from "./AdminComponets/ViewStaff.jsx";
import AddCategory from "./CategoryComponents/AddCat.jsx";
import ViewCategory from "./CategoryComponents/ViewCategory.jsx";
import EditCategory from "./CategoryComponents/EditCategory.jsx";
import AddSupplier from "./SupplierComponent/AddSupplier.jsx";
import ViewSupplier from "./SupplierComponent/ViewSupplier.jsx";
import EditSupplier from "./SupplierComponent/EditSupplier.jsx";

import Sidebar from "./components/Sidebar/AdminSidebar.jsx";
import Header from "./components/Header/AdminHeader.jsx";

function AdminLayout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}

import AddProduct from "./ProductComponent/AddProduct.jsx";
import ViewProduct from "./ProductComponent/ViewProduct.jsx";


export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

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
        {/* Public routes */}
        <Route path="/" element={<LandinPage setToken={setToken} setRole={setRole} />} />
        <Route path="/signup" element={<AdminSignup />} />

        {/* ✅ Protected Admin routes inside AdminLayout */}
        <Route
          path="/admin/*"
          element={
            token && role?.toLowerCase() === "admin" ? (
              <AdminLayout>
                <Routes>
                  <Route path="panel" element={<AdminPanel />} />
                  <Route path="add-admin" element={<AddAdmin />} />
                  <Route path="view-admin" element={<ViewAdmin />} />

                  <Route path="add-staff" element={<AddStaff />} />
                  <Route path="view-staff" element={<ViewStaff />} />

                  <Route path="add-category" element={<AddCategory />} />
                  <Route path="view-category" element={<ViewCategory />} />
                  <Route path="edit-category/:id" element={<EditCategory />} />

                  <Route path="add-supplier" element={<AddSupplier />} />
                 <Route path="view-supplier" element={<ViewSupplier />} />
                 <Route path="edit-supplier/:id" element={<EditSupplier />} />

                </Routes>
              </AdminLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Staff routes */}
        <Route
          path="/staff-panel"
          element={token && role?.toLowerCase() === "staff" ? <StaffPanel /> : <Navigate to="/" />}
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

        {/*Protected Product */}
          <Route
          path="/add-products"
          element={token && role?.toLowerCase() === "admin" ? <AddProduct /> : <Navigate to="/" />}
        />

        <Route
          path="/view-Products"
          element={token && role?.toLowerCase() === "admin" || role?.toLowerCase() === "staff" ? <ViewProduct /> : <Navigate to="/" />}
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
