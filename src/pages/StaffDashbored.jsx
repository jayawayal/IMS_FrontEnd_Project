import React from "react";
import StaffHeader from "../components/Header/StaffHeader";
import StaffSidebar from "../components/Sidebar/Staffsidebar";
import styles from "../Style/StaffPanel.module.css"; // module import

export default function StaffPanel() {
  return (
    <div className={`${styles.staffPanel} d-flex`}>
      {/* Sidebar */}
      <div className={styles.sidebarContainer}>
        <StaffSidebar
          links={[
            { name: "Staff Overview", path: "/staff-dashboard" },
            { name: "Tasks", path: "/staff-tasks" },
            { name: "Profile", path: "/staff-profile" },
          ]}
        />
      </div>

      {/* Main content */}
      <div className={styles.mainContainer}>
        <StaffHeader />
        <div className={`${styles.staffContent} p-4`}>
          {/* Staff page content */}
        </div>
      </div>
    </div>
  );
}
