import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import "./Login.css";
import api from "../../api/axios";

export default function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // 🔹 Redirect if already logged in
  useEffect(() => {
    if (!user) return;

    if (user.role === "ADMIN") {
      navigate("/admin/dashboard", { replace: true });
    } else if (user.role === "RESIDENT") {
      navigate("/member/dashboard", { replace: true });
    } else if (user.role === "GUARD") {
      navigate("/guard/dashboard", { replace: true });
    }
  }, [user, navigate]);

  // 🔹 Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // 🔹 Basic frontend validation
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (password && password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error(Object.values(newErrors)[0]);
      return;
    }

    try {
      // 🔹 Call backend login API
      const response = await api.post("/api/auth/login", { email, password });
      const loggedUser = response.data;

      // 🔹 Save user in AuthContext
      login(loggedUser);

      toast.success("Login successful!");
      
      // 🔹 Redirect manually (optional, useEffect will also redirect)
      if (loggedUser.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (loggedUser.role === "RESIDENT") {
        navigate("/member/dashboard");
      } else if (loggedUser.role === "GUARD") {
        navigate("/guard/dashboard");
      }

    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        <p className="auth-subtitle">Sign in to continue</p>

        <form className="auth-form" onSubmit={handleLogin}>
          {/* EMAIL */}
          <label className="auth-label">Email *</label>
          <input
            className="auth-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({});
            }}
          />
          {errors.email && <p className="auth-error">{errors.email}</p>}

          {/* PASSWORD */}
          <label className="auth-label">Password *</label>
          <input
            className="auth-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({});
            }}
          />
          {errors.password && <p className="auth-error">{errors.password}</p>}

          {/* FORGOT PASSWORD */}
          <div className="auth-forgot">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          {/* LOGIN BUTTON */}
          <button className="auth-button" type="submit">
            Login
          </button>

          {/* FOOTER */}
          <p className="auth-footer">
            Don’t have an account?
            <Link className="auth-link" to="/register">
              Register
            </Link>
          </p>
        </form>

        <div className="auth-demo-info">
          <p><strong>Member Login:</strong> Use your registered email (must be approved by admin)</p>
        </div>
      </div>
    </div>
  );
}
