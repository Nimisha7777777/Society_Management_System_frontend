import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import Card from "../../Components/Card";
import { FaExclamationTriangle, FaCreditCard, FaCalendar, FaBell } from "react-icons/fa";
import api from "../../api/axios";
import useMyParking from "../../contexts/useMyParking";
import "./MemberDashboard.css";

export default function MemberDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [openComplaints, setOpenComplaints] = useState(0);
  const [activeNotices, setActiveNotices] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [pendingMaintenance, setPendingMaintenance] = useState(null); // NEW
  const [approvedBookings, setApprovedBookings] = useState(0);


const myParking = useMyParking();


  // Redirect if user not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  // 🔹 Load OPEN complaints count
  useEffect(() => {
    if (!user) return;

    const loadOpenComplaintCount = async () => {
      try {
        const res = await api.get("/complaints/my/pending/count");
        setOpenComplaints(res.data.count || 0);
      } catch (err) {
        console.error("Failed to load open complaints count", err);
      }
    };

    loadOpenComplaintCount();
  }, [user]);

    // 🔹 Load notices + activities
    useEffect(() => {
      if (!user) return;

      const notices = JSON.parse(localStorage.getItem("notices") || "[]");
      const activeNoticesCount = notices.filter(
        (notice) => notice.status === "active" || !notice.status
      ).length;
      setActiveNotices(activeNoticesCount);

      const activities = [];
      notices.slice(0, 3).forEach((notice) => {
        activities.push({
          id: `notice-${notice.id}`,
          text: `New Notice: ${notice.title || "UrbanNest Notice"}`,
          time: notice.createdAt
            ? new Date(notice.createdAt).toLocaleDateString()
            : "Recently",
          type: "notice",
        });
      });

      setRecentActivities(activities);
    }, [user]);

    // 🔹 Load pending maintenance from backend
    useEffect(() => {
      const flatId = user?.flatId || user?.flat?.flatId;
      if (!flatId) return;

      const fetchPendingMaintenance = async () => {
        try {
          const res = await api.get(`/api/resident/maintenance/flat/${flatId}/pending`);
          setPendingMaintenance(res.data); // will be null if none pending
        } catch (err) {
          console.error("Failed to fetch pending maintenance", err);
        }
      };

      fetchPendingMaintenance();
    }, [user]);

    const formatDate = (dateString) => {
      if (!dateString) return "-";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

      // 🔹 Load notices + activities from backend
    useEffect(() => {
      if (!user) return;

      const fetchNotices = async () => {
        try {
          const res = await api.get("/api/notices"); // backend call
          const notices = res.data || [];

          // Active notices
          const activeNoticesCount = notices.length; // all notices are active by default
          setActiveNotices(activeNoticesCount);

          // Recent activities (last 3 notices)
          const activities = notices.slice(0, 3).map((notice) => ({
            id: `notice-${notice.noticeId}`,
            text: `New Notice: ${notice.title || "UrbanNest Notice"}`,
            time: notice.createdAt
              ? new Date(notice.createdAt).toLocaleDateString()
              : "Recently",
            type: "notice",
          }));
          setRecentActivities(activities);
        } catch (err) {
          console.error("Failed to fetch notices", err);
          setActiveNotices(0);
          setRecentActivities([]);
        }
      };

      fetchNotices();
    }, [user]);


    // 🔹 Load approved amenity bookings count
    useEffect(() => {
      if (!user) return;

      const fetchApprovedBookings = async () => {
        try {
          const res = await api.get("/api/bookings/my/approved/count");
          setApprovedBookings(res.data || 0);
        } catch (err) {
          console.error("Failed to fetch approved bookings count", err);
        }
      };

      fetchApprovedBookings();
    }, [user]);

    

  if (loading || !user) {
    return (
      <DashboardLayout>
        <div className="loading-dashboard">
          <p>Loading your dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="member-dashboard">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1 className="welcome-title">
            Welcome back, {user.firstName || "Member"}!
          </h1>
          <p className="welcome-subtitle">
            Here's what's happening in your UrbanNest community today.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="stats-grid">
          {/* 🔹 OPEN COMPLAINTS */}
          <Card
            className="stat-card complaints-card clickable"
            onClick={() => navigate("/complaints?status=OPEN")}
          >
            <div className="stat-icon">
              <FaExclamationTriangle />
            </div>
            <div className="stat-content">
              <h3 className="stat-label">Open Complaints</h3>
              <p className="stat-value">{openComplaints}</p>
            </div>
          </Card>

          {/* 🔹 DUE MAINTENANCE */}
          <Card
            className="stat-card maintenance-card clickable"
            onClick={() => navigate("/maintenance")}
          >
            <div className="stat-icon"><FaCreditCard /></div>
            <div className="stat-content">
              <h3 className="stat-label">Due Maintenance</h3>
              <p className="stat-value">
                ₹{pendingMaintenance?.amount?.toLocaleString() || 0}
              </p>
              {pendingMaintenance && (
                <p className="stat-subtext">
                  Due: {formatDate(pendingMaintenance.dueDate)}
                </p>
              )}
            </div>
          </Card>

          {/* 🔹 UPCOMING EVENTS */}
          <Card
            className="stat-card events-card clickable"
            onClick={() => navigate("/amenities/my-bookings")}
          >
            <div className="stat-icon"><FaCalendar /></div>
            <div className="stat-content">
              <h3 className="stat-label">Approved Bookings</h3>
              <p className="stat-value">{approvedBookings}</p>
            </div>
          </Card>

          {/* 🔹 ACTIVE NOTICES */}
          <Card
            className="stat-card notices-card clickable"
            onClick={() => navigate("/notices")} // <-- Add this line
          >
            <div className="stat-icon"><FaBell /></div>
            <div className="stat-content">
              <h3 className="stat-label">Active Notices</h3>
              <p className="stat-value">{activeNotices}</p>
            </div>
          </Card>
        </div>



        {/* Main Content Row */}
        <div className="content-row">
          <Card className="activities-card">
            <h2 className="section-title">Recent Activities</h2>
            <div className="activities-list">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-dot"></div>
                    <div className="activity-content">
                      <p className="activity-text">{activity.text}</p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty-state">No recent activities</p>
              )}
            </div>
          </Card>

          {/* 🔹 MY PARKING */}
          <Card className="stat-card parking-card">
            <div className="stat-icon">🚗</div>
            <div className="stat-content">
              <h3 className="stat-label">My Parking</h3>
              {myParking?.parkingSlots?.length > 0 ? (
                (() => {
                  const slot = myParking.parkingSlots[0];
                  return (
                    <>
                      <p className="stat-value">{slot.slotNumber}</p>
                      <p
                        className={`stat-subtext ${
                          slot.status === "FREE" ? "status-free" : "status-occupied"
                        }`}
                      >
                        {slot.status}
                      </p>
                      <p className="stat-subtext">
                        {slot.vehicleType.replace("_", " ")}
                      </p>
                    </>
                  );
                })()
              ) : (
                <p className="stat-subtext">No parking assigned</p>
              )}
            </div>
          </Card>



        </div>
      </div>
    </DashboardLayout>
  );
}
