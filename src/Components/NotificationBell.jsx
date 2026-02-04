import { useState } from "react";
import { FaBell } from "react-icons/fa";
import "./Navbar.css";

export default function NotificationBell({ role }) {
  const [open, setOpen] = useState(false);

  const adminNotifications = [
    "New complaint submitted",
    "Maintenance issue reported",
    "Visitor approval pending",
    "New notice added"
  ];

  const memberNotifications = [
    "New notice posted",
    "Your maintenance bill is generated"
  ];

  const notifications = role === "admin" ? adminNotifications : memberNotifications;

  return (
    <div className="notif-container">
      <span
        className="notif-bell"
        onClick={() => setOpen(!open)}
      >
        <FaBell />
      </span>

      {open && (
        <div className="notif-dropdown">
          {notifications.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      )}
    </div>
  );
}
