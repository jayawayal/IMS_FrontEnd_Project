import React, { useState } from "react";
import AdminSidebar from "../components/Sidebar/AdminSidebar";
import AdminHeader from "../components/Header/AdminHeader";
import styles from "../Style/AdminLayout.module.css";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className={styles.adminPage}>
      {/* Sidebar */}
      <div
        className={`${styles.adminSidebar} ${sidebarOpen ? styles.open : ""}`}
      >
        <AdminSidebar />
      </div>

      {/* Header */}
      <div className={styles.adminHeader}>
        <AdminHeader toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
