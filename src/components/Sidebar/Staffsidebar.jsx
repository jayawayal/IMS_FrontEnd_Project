import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserCircle,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaStore,
  FaFileAlt,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import styles from "./StaffSidebar.module.css";

function StaffSidebar() {
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
    { path: "/staff/profile", label: "Edit Profile", icon: <FaUserCircle /> },
    {
      label: "Products",
      icon: <FaBox />,
      children: [
        { path: "/staff/add-product", label: "Add Product" },
        { path: "/staff/view-products", label: "View Products" },
      ],
    },
    { path: "/staff/suppliers", label: "Suppliers", icon: <FaStore /> },
    { path: "/staff/purchases", label: "Purchases", icon: <FaShoppingCart /> },
    { path: "/staff/customers", label: "Customers", icon: <FaUsers /> },
    { path: "/staff/sales", label: "Sales", icon: <FaChartBar /> },
    { path: "/staff/reports", label: "Reports", icon: <FaFileAlt /> },
    { path: "/staff/settings", label: "Settings", icon: <FaCog /> },
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
        className={`${styles.staffSidebar} ${
          isMobile ? styles.staffSidebarMobile : ""
        } ${sidebarOpen ? styles.staffSidebarMobileOpen : ""}`}
      >
        <div className={styles.staffSidebarHeader}>
          <FaUserCircle className={styles.staffSidebarIcon} />
          <h2>Staff Panel</h2>
        </div>

        <nav className={styles.staffSidebarMenu}>
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.children ? (
                <div
                  className={`${styles.staffSidebarMenuParent} ${
                    openMenus[item.label] ? styles.staffSidebarMenuParentOpen : ""
                  }`}
                >
                  <div
                    className={styles.staffSidebarMenuParentTitle}
                    onClick={() => toggleMenu(item.label)}
                  >
                    <span className={styles.staffSidebarIcon}>{item.icon}</span>
                    <span>{item.label}</span>
                    <span className={styles.staffSidebarArrow}>
                      {openMenus[item.label] ? (
                        <MdKeyboardArrowUp />
                      ) : (
                        <MdKeyboardArrowDown />
                      )}
                    </span>
                  </div>
                  <div className={styles.staffSidebarSubmenu}>
                    {item.children.map((child, cIndex) => (
                      <NavLink
                        key={cIndex}
                        to={child.path}
                        className={({ isActive }) =>
                          isActive
                            ? `${styles.staffSidebarSubmenuItem} ${styles.active}`
                            : styles.staffSidebarSubmenuItem
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
                      ? `${styles.staffSidebarMenuItem} ${styles.active}`
                      : styles.staffSidebarMenuItem
                  }
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  <span className={styles.staffSidebarIcon}>{item.icon}</span>
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

export default StaffSidebar;
