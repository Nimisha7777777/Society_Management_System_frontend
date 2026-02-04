import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import Card from "../../Components/Card";
import {
  FaUsers,
  FaHome,
  FaBell,
  FaExclamationTriangle,
} from "react-icons/fa";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();   
  const societyId = user?.societyId; 


  // ===============================
  // Pending Approvals Count
  // ===============================
  const [pendingApprovals, setPendingApprovals] = useState(0);

  useEffect(() => {
    api
      .get(`/api/admin/pending/count?societyId=${societyId}`)
      .then((res) => setPendingApprovals(res.data))
      .catch(() => setPendingApprovals(0));
  }, []);

  // ===============================
  // Flat Dashboard Stats
  // ===============================
  const [flatStats, setFlatStats] = useState({
    totalFlats: 0,
    occupiedFlats: 0,
    vacantFlats: 0,
  });
  useEffect(() => {
    api
      .get(`/api/admin/flats/count?societyId=${societyId}`)
      .then((res) => setFlatStats(res.data))
      .catch(() =>
        setFlatStats({
          totalFlats: 0,
          occupiedFlats: 0,
          vacantFlats: 0,
        })
      );
  }, []);

  // Notice Bucket
    const [noticeCount, setNoticeCount] = useState(0);
    useEffect(() => {
      api.get(`/api/admin/notices/count?societyId=${societyId}`)
        .then(res => setNoticeCount(res.data))
        .catch(() => setNoticeCount(0));
    }, []);


    //Pending Complaints Count
    const [pendingComplaintCount, setPendingComplaintCount] = useState(0);

    useEffect(() => {
      api
        .get(`/complaints/pending/count`)
        .then((res) => setPendingComplaintCount(res.data.count))
        .catch(() => setPendingComplaintCount(0));
    }, []);


    
  return (
    <DashboardLayout>
      <div className="member-dashboard">

        {/* ===============================
            Welcome Section
        =============================== */}
        <div className="welcome-section">
          <h1 className="welcome-title">Admin Dashboard</h1>
          <p className="welcome-subtitle">
            Manage your society efficiently from one place
          </p>
        </div>

        {/* ===============================
            Dashboard Cards
        =============================== */}
        <div className="stats-grid">

          {/* Pending Approvals */}
          <Card
            className="stat-card complaints-card clickable"
            onClick={() => navigate("/admin/approve-users")}
          >
            <div className="stat-icon">
              <FaUsers />
            </div>
            <div className="stat-content">
              <p className="stat-label">Pending Approvals</p>
              <h3 className="stat-value">{pendingApprovals}</h3>
            </div>
          </Card>

          {/* Total Flats */}
          <Card
            className="stat-card maintenance-card clickable"
            onClick={() => navigate("/admin/manage-flats")}
          >
            <div className="stat-icon">
              <FaHome />
            </div>
            <div className="stat-content">
              <p className="stat-label">Total Flats</p>

              <h3 className="stat-value">
                {flatStats.totalFlats}
              </h3>

              <p className="stat-subtext">
                {flatStats.occupiedFlats} Occupied ·{" "}
                {flatStats.vacantFlats} Vacant
              </p>
            </div>
          </Card>

          {/* Active Notices (later API) */}
          <Card   
            className="stat-card notices-card clickable"
            onClick={() => navigate("/notices")}
          >
            <div className="stat-icon">
              <FaBell />
            </div>
            <div className="stat-content">
              <p className="stat-label">Active Notices</p>
              <h3 className="stat-value">{noticeCount}</h3>
            </div>
          </Card>

          {/* Pending Complaints (later API) */}
          <Card
            className="stat-card events-card clickable"
            onClick={() => navigate("/complaints")}
          >
            <div className="stat-icon">
              <FaExclamationTriangle />
            </div>

            <div className="stat-content">
              <p className="stat-label">Pending Complaints</p>
              <h3 className="stat-value">{pendingComplaintCount}</h3>
            </div>
          </Card>
        </div>

        {/* ===============================
            Quick Actions
        =============================== */}
        <div className="content-row">
          <Card className="events-card-list">
            <h2 className="section-title">Quick Actions</h2>

            <div className="events-list">
              <button
                className="admin-action-btn"
                onClick={() => navigate("/admin/approve-users")}
              >
                Approve Users
              </button>

              <button
                className="admin-action-btn"
                onClick={() => navigate("/admin/manage-flats?add=true")}
              >
                Add Flat
              </button>
              <button
                className="admin-action-btn"
                onClick={() => navigate("/notices/add")}
              >
                Add Notice
              </button>
              <button
                className="admin-action-btn"
                onClick={() => navigate("/complaints")}
              >
                View Complaints
              </button>

            </div>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
}
