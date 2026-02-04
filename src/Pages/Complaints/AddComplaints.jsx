import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import Card from "../../Components/Card";
import { toast } from "react-toastify";
import api from "../../api/axios";
import "./AddComplaints.css";

export default function AddComplaints() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    complaintType: "",
    description: "",
  });

  if (user?.role === "ADMIN") {
    navigate("/complaints");
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.complaintType || formData.description.length < 10) {
      toast.error("Please fill all fields properly");
      return;
    }

    try {
      await api.post("/complaints", formData);
      toast.success("Complaint raised successfully");
      navigate("/complaints");
    } catch (err) {
      toast.error("Failed to raise complaint");
      console.error(err);
    }
  };

  return (
    <DashboardLayout>
      <div className="add-complaints-page">
        <Card className="add-complaints-card">
          <h2>Raise Complaint</h2>

          <form className="complaint-form" onSubmit={handleSubmit}>
            <input
              name="complaintType"
              placeholder="Complaint Type (PLUMBING, ELECTRIC)"
              value={formData.complaintType}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Describe the issue"
              value={formData.description}
              onChange={handleChange}
            />

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
