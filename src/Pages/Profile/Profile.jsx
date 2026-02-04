import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import DashboardLayout from "../../layouts/DashboardLayout";
import Card from "../../Components/Card";
import { toast } from "react-toastify";
import "./Profile.css";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const isAdmin = user?.role?.toLowerCase() === "admin";

  /* ---------------- LOAD USER DATA ---------------- */
  useEffect(() => {
    if (!user) return;

    setFormData({
      name: user.name || "",
      email: user.email || "N/A",
      phone: user.phone || "",
    });
  }, [user]);

  /* ---------------- HANDLERS ---------------- */
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user.name || "",
      email: user.email || "N/A",
      phone: user.phone || "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------------- SAVE (FIXED) ---------------- */
  const handleSave = async () => {
    try {
      const parts = formData.name.trim().split(" ");
      const firstName = parts[0];
      const lastName = parts.length > 1 ? parts[parts.length - 1] : "";
      const middleName =
        parts.length > 2 ? parts.slice(1, -1).join(" ") : "";

      const res = await fetch("http://localhost:8080/api/profile", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          middleName,
          lastName,
          phone: isAdmin ? null : formData.phone || null,
        }),
      });

      /* 🔥 THIS IS THE FIX */
      if (!res.ok) {
        throw new Error("API failed");
      }

      /* DO NOT PARSE JSON
         DO NOT RELOAD USER
         DO NOT CALL loadUserData */

      updateUser({
        ...user,
        name: formData.name,
        phone: formData.phone,
      });

      setIsEditing(false); // ✅ EXIT EDIT MODE
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Profile update failed");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <DashboardLayout>
      <div className="profile-page">
        <div className="profile-header">
          <h1 className="page-title">
            {isAdmin ? "Admin Profile" : "My Profile"}
          </h1>
        </div>

        <Card className="profile-card">
          <div className="profile-content">
            <div className="profile-avatar">
              <div className="avatar-circle">
                {formData.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </div>

            <div className="profile-form">
              {/* NAME */}
              <div className="form-group">
                <label className="form-label">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                  />
                ) : (
                  <div className="form-value">{formData.name || "N/A"}</div>
                )}
              </div>

              {/* EMAIL */}
              <div className="form-group">
                <label className="form-label">Email</label>
                <div className="form-value read-only">
                  {formData.email}
                  <span className="read-only-badge">Read Only</span>
                </div>
              </div>

              {/* PHONE */}
              {!isAdmin && (
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      className="form-input"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength="10"
                    />
                  ) : (
                    <div className="form-value">
                      {formData.phone || "N/A"}
                    </div>
                  )}
                </div>
              )}

              {/* ACTIONS */}
              <div className="form-actions">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="save-btn"
                      onClick={handleSave}
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
