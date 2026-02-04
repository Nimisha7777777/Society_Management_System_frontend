import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"; // Make sure axios is installed
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    societyId: "",
  });

  const [errors, setErrors] = useState({});
  const [societies, setSocieties] = useState([]);
  const [roles] = useState(["RESIDENT", "GUARD"]); // Exclude ADMIN

  // Fetch societies on mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/societies")
      .then((res) => setSocieties(res.data))
      .catch((err) => toast.error("Failed to fetch societies"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors({});
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let newErrors = {};

    const {
      firstName,
      middleName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      role,
      societyId,
    } = formData;

    // REQUIRED FIELD VALIDATIONS
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!password.trim()) newErrors.password = "Password is required";
    if (!confirmPassword.trim())
      newErrors.confirmPassword = "Confirm password is required";
    if (!role) newErrors.role = "Role is required";
    if (!societyId) newErrors.societyId = "Society is required";

    // EMAIL FORMAT
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) newErrors.email = "Invalid email format";

    // BLOCK ADMIN EMAIL
    if (email === "admin@urbannest.com")
      newErrors.email = "This email is reserved for admin.";

    // PHONE VALIDATION → ONLY DIGITS
    if (phone && !/^[0-9]+$/.test(phone))
      newErrors.phone = "Phone number must contain digits only";

    // PHONE VALIDATION → MUST BE EXACTLY 10 DIGITS
    if (phone && phone.length !== 10)
      newErrors.phone = "Phone number must be exactly 10 digits";

    // PASSWORD VALIDATION
    if (password && password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstError = Object.values(newErrors)[0];
      toast.error(firstError);
      return;
    }

    // 🔹 SEND TO BACKEND
    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        firstName,
        middleName,
        lastName,
        email,
        phone,
        password,
        role,
        societyId: parseInt(societyId),
      });

      toast.success(
        "Registration successful! Your account is pending admin approval."
      );
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Register</h2>
        <p className="auth-subtitle">Create your account</p>

        <form className="auth-form" onSubmit={handleRegister}>
          {/* FIRST NAME */}
          <label className="auth-label">First Name *</label>
          <input
            name="firstName"
            className="auth-input"
            type="text"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className="auth-error">{errors.firstName}</p>}

          {/* MIDDLE NAME */}
          <label className="auth-label">Middle Name</label>
          <input
            name="middleName"
            className="auth-input"
            type="text"
            placeholder="Enter middle name"
            value={formData.middleName}
            onChange={handleChange}
          />

          {/* LAST NAME */}
          <label className="auth-label">Last Name *</label>
          <input
            name="lastName"
            className="auth-input"
            type="text"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="auth-error">{errors.lastName}</p>}

          {/* EMAIL */}
          <label className="auth-label">Email *</label>
          <input
            name="email"
            className="auth-input"
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="auth-error">{errors.email}</p>}

          {/* PHONE */}
          <label className="auth-label">Phone Number *</label>
          <input
            name="phone"
            className="auth-input"
            type="text"
            placeholder="Enter 10-digit phone number"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="auth-error">{errors.phone}</p>}

          {/* SOCIETY DROPDOWN */}
          <label className="auth-label">Society *</label>
          <select
            name="societyId"
            className="auth-input"
            value={formData.societyId}
            onChange={handleChange}
          >
            <option value="">-- Select Society --</option>
            {societies.map((society) => (
              <option key={society.societyId} value={society.societyId}>
                {society.societyName}
              </option>
            ))}
          </select>
          {errors.societyId && <p className="auth-error">{errors.societyId}</p>}

          {/* ROLE DROPDOWN */}
          <label className="auth-label">Role *</label>
          <select
            name="role"
            className="auth-input"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">-- Select Role --</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.role && <p className="auth-error">{errors.role}</p>}

          {/* PASSWORD */}
          <label className="auth-label">Password *</label>
          <input
            name="password"
            className="auth-input"
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="auth-error">{errors.password}</p>}

          {/* CONFIRM PASSWORD */}
          <label className="auth-label">Confirm Password *</label>
          <input
            name="confirmPassword"
            className="auth-input"
            type="password"
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="auth-error">{errors.confirmPassword}</p>
          )}

          {/* REGISTER BUTTON */}
          <button className="auth-button" type="submit">
            Register
          </button>

          {/* REDIRECT */}
          <p className="auth-footer">
            Already have an account?{" "}
            <Link to="/" className="auth-link">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
