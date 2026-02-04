import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  FaThLarge,
  FaBell,
  FaExclamationCircle,
  FaCreditCard,
  FaUsers,
  FaUser,
  FaFileAlt,
  FaCar,
  FaSwimmingPool,
  FaCalendarAlt,
  FaHome
} from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar({ isOpen = true }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const getIcon = (name) => {
    const icons = {
      dashboard: <FaThLarge />,
      notices: <FaBell />,
      complaints: <FaExclamationCircle />,
      maintenance: <FaCreditCard />,
      directory: <FaUsers />,
      profile: <FaUser />,
      visitors: <FaUsers />,
      parking: <FaCar />,
      documents: <FaFileAlt />,
      notifications: <FaBell />,
      amenities: <FaSwimmingPool />,
      calendar: <FaCalendarAlt />,
      flats: <FaHome/>
    };
    return icons[name] || null;
  };

  /* ================= ADMIN MENU ================= */
  const adminMenu = [
    { path: "/admin/dashboard", label: "Dashboard", icon: "dashboard" },
    { path: "/directory", label: "Member Directory", icon: "directory" },
    { path: "/notices", label: "Notices", icon: "notices" },
    { path: "/complaints", label: "Complaints", icon: "complaints" },
    { path: "/maintenance", label: "Maintenance", icon: "maintenance" },
    { path: "/admin/amenities", label: "Amenities", icon: "amenities" },
    { path: "/admin/bookings", label: "Amenity Bookings", icon: "calendar" },
    { path: "/admin/manage-flats", label: "Manage Flats", icon: "flats" },
    { path: "/admin/visitors", label: "Visitors", icon: "visitors" },
    { path: "/admin/parking", label: "Parking Slots", icon: "parking" },
    { path: "/profile", label: "Profile", icon: "profile" }

  ];

  /* ================= RESIDENT MENU ================= */
  const memberMenu = [
    { path: "/member/dashboard", label: "Dashboard", icon: "dashboard" },
    { path: "/directory", label: "Member Directory", icon: "directory" },
    { path: "/notices", label: "Notices", icon: "notices" },
    { path: "/complaints", label: "Complaints", icon: "complaints" },
    { path: "/maintenance", label: "Maintenance", icon: "maintenance" },
    { path: "/amenities", label: "Amenities", icon: "amenities" },
    { path: "/amenities/my-bookings", label: "My Amenity Bookings", icon: "calendar" },
    { path: "/profile", label: "Profile", icon: "profile" }
  ];

  const guardMenu = [
    { path: "/guard/dashboard", label: "Dashboard", icon: "dashboard" },
    { path: "/guard/add-visitor", label: "Add Visitor", icon: "visitors" },
    { path: "/guard/inside-visitors", label: "Inside Visitors", icon: "visitors" },
    { path: "/guard/today-visitors", label: "Today Visitors", icon: "calendar" },
    { path: "/profile", label: "Profile", icon: "profile" }
  ];

  const menuItems =
    user.role === "ADMIN"
      ? adminMenu
      : user.role === "GUARD"
      ? guardMenu
      : memberMenu;

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <h2 className="sidebar-title">UrbanNest</h2>

      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={location.pathname === item.path ? "active" : ""}
          >
            <Link to={item.path} className="sidebar-link">
              <span className="sidebar-icon">{getIcon(item.icon)}</span>
              {isOpen && <span className="sidebar-label">{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
