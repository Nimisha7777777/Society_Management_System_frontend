import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import Card from "../../Components/Card";
import { toast } from "react-toastify";
import api from "../../api/axios";
import "./Complaints.css";

export default function ResidentComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const res = await api.get("/complaints/my"); // resident sees only their complaints
      console.log("Resident complaints:", res.data);
      setComplaints(res.data || []);
    } catch (err) {
      toast.error("Failed to load complaints");
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <DashboardLayout>
      <div className="complaints-page">
        <div className="complaints-header">
          <h1 className="page-title">My Complaints</h1>
          <Link to="/complaints/add" className="add-button">
            + Raise Complaint
          </Link>
        </div>

        {complaints.length === 0 ? (
          <Card className="empty-state-card">
            <p>No complaints found</p>
          </Card>
        ) : (
          <div className="complaints-list">
            {complaints.map((c) => (
              <Card key={c.complaintId} className="complaint-card">
                <div className="complaint-header">
                  <h3>{c.complaintType}</h3>
                  <span className={`status ${c.status.toLowerCase()}`}>
                    {c.status.replace("_", " ")}
                  </span>
                </div>

                <p>{c.description}</p>

                <div className="complaint-footer">
                  <span>Filed on: {formatDate(c.dateFiled)}</span>
                  {c.dateResolved && <span>Resolved on: {formatDate(c.dateResolved)}</span>}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
