import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import Card from "../../Components/Card";
import api from "../../api/axios";
import { toast } from "react-toastify";
import "./AddNotices.css";


export default function AddNotice() {
  const navigate = useNavigate();
  const [data, setData] = useState({ title: "", description: "" });

  const submit = async (e) => {
    e.preventDefault();

    if (!data.title.trim() || !data.description.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      await api.post("/api/notices", data);
      toast.success("Notice created");
      navigate("/notices");
    } catch {
      toast.error("Failed to create notice");
    }
  };

  return (
    <DashboardLayout>
      <div className="add-notices-page">
        <div className="page-header">
          <h1 className="page-title">Create Notice</h1>

          <button
            className="back-button"
            onClick={() => navigate("/notices")}
          >
            ← Back to Notices
          </button>
        </div>

        <Card className="notice-form-card">
          <form className="notice-form" onSubmit={submit}>
            <div className="form-group">
              <label className="form-label">Notice Title</label>
              <input
                className="form-input"
                placeholder="Enter notice title"
                value={data.title}
                onChange={(e) =>
                  setData({ ...data, title: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                placeholder="Enter notice description"
                rows="6"
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/notices")}
              >
                Cancel
              </button>

              <button type="submit" className="submit-btn">
                Create Notice
              </button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
