import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./RegisterSociety.css"; 

export default function RegisterSociety() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    societyName: "",
    address: "",
    city: "",
    pincode: "",
    adminEmail: "",
    adminPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors({});
  };

  const handleRegisterSociety = async (e) => {
    e.preventDefault();

    let newErrors = {};
    const {
      societyName,
      address,
      city,
      pincode,
      adminEmail,
      adminPassword,
    } = formData;

    // REQUIRED VALIDATIONS
    if (!societyName.trim()) newErrors.societyName = "Society name is required";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!pincode.trim()) newErrors.pincode = "Pincode is required";
    if (!adminEmail.trim()) newErrors.adminEmail = "Admin email is required";
    if (!adminPassword.trim())
      newErrors.adminPassword = "Admin password is required";

    // EMAIL FORMAT
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (adminEmail && !emailRegex.test(adminEmail)) {
      newErrors.adminEmail = "Invalid email format";
    }

    // PINCODE → 6 DIGITS
    if (pincode && !/^[0-9]{6}$/.test(pincode)) {
      newErrors.pincode = "Pincode must be exactly 6 digits";
    }

    // PASSWORD RULE
    if (adminPassword && adminPassword.length < 6) {
      newErrors.adminPassword =
        "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error(Object.values(newErrors)[0]);
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/api/public/register-society",
        {
          societyName,
          address,
          city,
          pincode,
          adminEmail,
          adminPassword,
        }
      );

      toast.success(
        "Society registered successfully! Admin account created."
      );

      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Society registration failed"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Register Your Society</h2>
        <p className="auth-subtitle">
          Create your society and admin account
        </p>

        <form className="auth-form" onSubmit={handleRegisterSociety}>
          {/* SOCIETY NAME */}
          <label className="auth-label">Society Name *</label>
          <input
            name="societyName"
            className="auth-input"
            type="text"
            placeholder="Enter society name"
            value={formData.societyName}
            onChange={handleChange}
          />
          {errors.societyName && (
            <p className="auth-error">{errors.societyName}</p>
          )}

          {/* ADDRESS */}
          <label className="auth-label">Address *</label>
          <input
            name="address"
            className="auth-input"
            type="text"
            placeholder="Enter address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && (
            <p className="auth-error">{errors.address}</p>
          )}

          {/* CITY */}
          <label className="auth-label">City *</label>
          <input
            name="city"
            className="auth-input"
            type="text"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && <p className="auth-error">{errors.city}</p>}

          {/* PINCODE */}
          <label className="auth-label">Pincode *</label>
          <input
            name="pincode"
            className="auth-input"
            type="text"
            placeholder="Enter 6-digit pincode"
            value={formData.pincode}
            onChange={handleChange}
          />
          {errors.pincode && (
            <p className="auth-error">{errors.pincode}</p>
          )}

          {/* ADMIN EMAIL */}
          <label className="auth-label">Admin Email *</label>
          <input
            name="adminEmail"
            className="auth-input"
            type="email"
            placeholder="Enter admin email"
            value={formData.adminEmail}
            onChange={handleChange}
          />
          {errors.adminEmail && (
            <p className="auth-error">{errors.adminEmail}</p>
          )}

          {/* ADMIN PASSWORD */}
          <label className="auth-label">Admin Password *</label>
          <input
            name="adminPassword"
            className="auth-input"
            type="password"
            placeholder="Enter admin password"
            value={formData.adminPassword}
            onChange={handleChange}
          />
          {errors.adminPassword && (
            <p className="auth-error">{errors.adminPassword}</p>
          )}

          <button className="auth-button" type="submit">
            Register Society
          </button>

          <p className="auth-footer">
            Already registered?{" "}
            <Link to="/login" className="auth-link">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
