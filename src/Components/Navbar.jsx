import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaBars } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar({ onToggleSidebar, sidebarOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/");
  };

  const handleToggleSidebar = () => {
    if (onToggleSidebar) {
      onToggleSidebar();
    }
  };

  // Role-based menu items
  const adminMenuItems = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/notices", label: "Notices" },
    { path: "/complaints", label: "Complaints" },
    { path: "/profile", label: "Profile" },
  ];

  const memberMenuItems = [
    { path: "/member/dashboard", label: "Dashboard" },
    { path: "/maintenance", label: "Maintenance" },
    { path: "/notices", label: "Notices" },
    { path: "/profile", label: "Profile" },
  ];

  const menuItems = user?.role === "admin" ? adminMenuItems : memberMenuItems;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Sidebar Toggle Button */}
        <button className="sidebar-toggle" onClick={handleToggleSidebar} aria-label="Toggle sidebar">
          <span className="hamburger-icon"><FaBars /></span>
        </button>

        {/* Navigation Links */}
        <div className="navbar-nav">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path} className="nav-link">
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="navbar-right">
        {/* User Info */}
        <div className="user-info">
          <span className="user-name">{user?.name || "User"}</span>
          <span className="user-role">({user?.role || "member"})</span>
        </div>

        {/* Logout Button */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
