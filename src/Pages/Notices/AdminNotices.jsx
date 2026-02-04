import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import Card from "../../Components/Card";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditNoticeModal from "./EditNoticeModal";
import "./Notices.css";

export default function AdminNotices() {
  const [notices, setNotices] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    try {
      const res = await api.get("/api/notices");
      setNotices(res.data);
    } catch {
      toast.error("Failed to load notices");
    }
  };

  const deleteNotice = async (id) => {
    if (!window.confirm("Delete this notice?")) return;

    try {
      await api.delete(`/api/notices/${id}`);
      toast.success("Notice deleted");
      loadNotices();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1>Notices</h1>
        <Link to="/notices/add" className="add-btn">
          + Add Notice
        </Link>
      </div>

      <div className="grid">
        {notices.map((n) => (
          <Card key={n.noticeId}>
            <h3>{n.title}</h3>
            <p>{n.description}</p>
            <small>Posted by {n.postedBy || "Admin"}</small>

            <div className="actions">
              <FaEdit
                className="action-icon edit"
                onClick={() => setEditing(n)}
              />
              <FaTrash
                className="action-icon delete"
                onClick={() => deleteNotice(n.noticeId)}
              />
            </div>
          </Card>
        ))}
      </div>

      {editing && (
        <EditNoticeModal
          notice={editing}
          onClose={() => setEditing(null)}
          onSaved={loadNotices}
        />
      )}
    </DashboardLayout>
  );
}
