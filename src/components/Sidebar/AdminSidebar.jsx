import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { 
  FaUserCircle, FaBox, FaShoppingCart, FaUsers, 
  FaChartBar, FaThList, FaStore, FaFileAlt, FaUserTie, 
  FaCog, FaBars, FaTimes 
} from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import styles from "./AdminSidebar.module.css";

function AdminSidebar() {
  const [openMenus, setOpenMenus] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const menuItems = [
    { path: "/admin/profile", label: "Edit Profile", icon: <FaUserCircle /> },
    {
      label: "Admin",
      icon: <FaUsers />,
      children: [
        { path: "/add-admin", label: "Add Admin" },
        { path: "/view-admin", label: "View Admin" },
      ],
    },
    {
      label: "Staff",
      icon: <FaUserTie />,
      children: [
        { path: "/add-staff", label: "Add Staff" },
        { path: "/view-staff", label: "View Staff" },
      ],
    },
    {
      label: "Categories",
      icon: <FaThList />,
      children: [
        { path: "/admin/add-category", label: "Add Category" },
        { path: "/admin/view-category", label: "View Categories" },
      ],
    },
    {
      label: "Suppliers",
      icon: <FaStore />,
      children: [
        { path: "/admin/add-supplier", label: "Add Supplier" },
        { path: "/admin/view-supplier", label: "View Suppliers" }, // ✅ fixed path
      ],
    },
    //  { path: "/admin/products", label: "Products", icon: <FaBox /> },
    {
      label: "Products",
      icon: <FaBox />,
      children: [
        { path: "/add-products", label: "Add Product" },
        { path: "/view-Products", label: "View product" },
      ],
    },
    {
      label: "Customer",
      icon: <FaUsers />,
      children: [
        { path: "/add-customer", label: "Add Customer" },
        { path: "/view-customer", label: "View Customer" },
      ],
    },

    // { path: "/admin/suppliers", label: "Suppliers", icon: <FaStore /> },
    // { path: "/admin/purchases", label: "Purchases", icon: <FaShoppingCart /> },
    {
  label: "Purchases",
  icon: <FaShoppingCart />,
  children: [
    { path: "/add-purchase", label: "Add Purchase" },
    { path: "/view-purchase", label: "View Purchase" },
  ],
}
,

    { path: "/admin/customers", label: "Customers", icon: <FaUsers /> },
    { path: "/admin/sales", label: "Sales", icon: <FaChartBar /> },
    { path: "/admin/reports", label: "Reports", icon: <FaFileAlt /> },
    { path: "/admin/settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <>
      {isMobile && (
        <div 
          className={styles.mobileMenuToggle} 
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </div>
      )}
      
      <aside 
        className={`${styles.adminSidebar} ${isMobile ? styles.adminSidebarMobile : ""} ${sidebarOpen ? styles.adminSidebarMobileOpen : ""}`}
      >
        <div className={styles.adminSidebarHeader}>
          <FaUserCircle className={styles.adminSidebarIcon} />
          <h2>Admin Panel</h2>
        </div>

        <nav className={styles.adminSidebarMenu}>
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.children ? (
                <div 
                  className={`${styles.adminSidebarMenuParent} ${openMenus[item.label] ? styles.adminSidebarMenuParentOpen : ""}`}
                >
                  <div 
                    className={styles.adminSidebarMenuParentTitle} 
                    onClick={() => toggleMenu(item.label)}
                  >
                    <span className={styles.adminSidebarIcon}>{item.icon}</span>
                    <span>{item.label}</span>
                    <span className={styles.adminSidebarArrow}>
                      {openMenus[item.label] ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                    </span>
                  </div>
                  <div className={styles.adminSidebarSubmenu}>
                    {item.children.map((child, cIndex) => (
                      <NavLink
                        key={cIndex}
                        to={child.path}
                        className={({ isActive }) =>
                          isActive 
                            ? `${styles.adminSidebarSubmenuItem} ${styles.active}`
                            : styles.adminSidebarSubmenuItem
                        }
                        onClick={() => isMobile && setSidebarOpen(false)}
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive 
                      ? `${styles.adminSidebarMenuItem} ${styles.active}`
                      : styles.adminSidebarMenuItem
                  }
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  <span className={styles.adminSidebarIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default AdminSidebar;
