import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    // Required field
    if (!email.trim()) newErrors.email = "Email is required";

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) newErrors.email = "Invalid email format";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error(Object.values(newErrors)[0]);
      return;
    }

    try {
      // Verify email exists
      await api.post("/api/auth/forgot-password", { email });

      // ✅ Navigate immediately to Reset Password page
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);

      // Don't call toast here — call it in ResetPassword page
    } catch (err) {
      toast.error(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Forgot Password</h2>
        <p className="auth-subtitle">
          Enter your registered email to reset your password
        </p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label">Email *</label>
          <input
            className="auth-input"
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({});
            }}
          />
          {errors.email && <p className="auth-error">{errors.email}</p>}

          <button className="auth-button" type="submit">
            Verify Email
          </button>

          <p className="auth-footer">
            Remember your password?{" "}
            <Link to="/" className="auth-link">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
