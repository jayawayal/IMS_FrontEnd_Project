import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar.jsx";

import AdminPanel from "./pages/AdminDashbored.jsx";
import StaffPanel from "./pages/StaffDashbored.jsx";
import LandingPage from "./pages/LandingPage.jsx";   // ✅ Fixed spelling
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

import AddPurchase from "./PurchasesComponents/AddPurchase.jsx";
import ViewPurchase from "./PurchasesComponents/ViewPurchase.jsx";
import EditPurchase from "./PurchasesComponents/EditPurchase.jsx";

import AddCustomer from "./customerComponent/AddCust.jsx";
import ViewCustomer from "./customerComponent/ViewCustomer.jsx"
import UpdatedCustomer from "./customerComponent/UpdateCustomer.jsx";

import Sidebar from "./components/Sidebar/AdminSidebar.jsx";
import Header from "./components/Header/AdminHeader.jsx";

import AddProduct from "./ProductComponent/AddProduct.jsx";
import ViewProduct from "./ProductComponent/ViewProduct.jsx";

// ✅ Layout for Admin Panel
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
        <Route
          path="/"
          element={<LandingPage setToken={setToken} setRole={setRole} />}
        />
        <Route path="/signup" element={<AdminSignup />} />

        {/* ✅ Protected Admin routes inside AdminLayout */}
        <Route
          path="/admin/*"
          element={
            token && role?.toLowerCase() === "admin" ? (
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="panel" element={<AdminPanel />} />

                  <Route path="/add-admin" element={<AddAdmin />} />
                  <Route path="/view-admin" element={<ViewAdmin />} />

                  <Route path="/add-staff" element={<AddStaff />} />
                  <Route path="/view-staff" element={<ViewStaff />} />

                  {/* Category management */}
                  <Route path="add-category" element={<AddCategory />} />
                  <Route path="view-category" element={<ViewCategory />} />
                  <Route path="edit-category/:id" element={<EditCategory />} />

                  {/* Supplier management */}
                  <Route path="add-supplier" element={<AddSupplier />} />
                  <Route path="view-supplier" element={<ViewSupplier />} />
                  <Route path="edit-supplier/:id" element={<EditSupplier />} />

                  {/* Purchase management */}
                  <Route path="add-purchase" element={<AddPurchase />} />
                  {/* <Route path="view-purchase" element={<ViewPurchase />} /> */}
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
          element={
            token && role?.toLowerCase() === "staff" ? (
              <StaffPanel />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Direct admin routes (outside layout) */}
        <Route
          path="/add-admin"
          element={
            token && role?.toLowerCase() === "admin" ? (
              <AddAdmin />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/view-admin"
          element={
            token && role?.toLowerCase() === "admin" ? (
              <ViewAdmin />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/add-staff"
          element={
            token && role?.toLowerCase() === "admin" ? (
              <AddStaff />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/view-staff"
          element={
            token && role?.toLowerCase() === "admin" ? (
              <ViewStaff />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Protected Product routes */}
        <Route
          path="/add-products"
          element={
            token && role?.toLowerCase() === "admin" ? (
              <AddProduct />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/view-products"
          element={
            token &&
            (role?.toLowerCase() === "admin" || role?.toLowerCase() === "staff") ? (
              <ViewProduct />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Purchase routes */}
        <Route
          path="/add-purchase"
          element={
            token && role?.toLowerCase() === "admin" ? (
              <AddPurchase />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/view-purchase"
          element={
            token && role?.toLowerCase() === "admin" ? (
              <ViewPurchase />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/edit-purchase/:id"
          element={
            token && role?.toLowerCase() === "admin" ? (
              <EditPurchase />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/add-customer"
          element={token && role?.toLowerCase() === "admin" || role?.toLowerCase() === "staff" ? <AddCustomer /> : <Navigate to="/" />}
        />

        <Route
          path="/view-customer"
          element={token && role?.toLowerCase() === "admin" || role?.toLowerCase() === "staff" ? <ViewCustomer /> : <Navigate to="/" />}
        />

        <Route
  path="/updated-customer/:customer_id"
  element={
    token && (role?.toLowerCase() === "admin")
      ? <UpdatedCustomer />
      : <Navigate to="/" />
  }
/>
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
