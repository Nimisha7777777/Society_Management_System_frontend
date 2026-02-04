import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import "./DashboardLayout.css";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-layout">
      {/* Fixed Top Navbar */}
      <Navbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

      <div className="dashboard-content-wrapper">
        {/* Optional Collapsible Sidebar */}
        <Sidebar isOpen={sidebarOpen} />

        {/* Main Content Area */}
        <div className={`main-content ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
