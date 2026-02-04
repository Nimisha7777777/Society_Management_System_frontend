import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PrivateRoute({ children, role }) {
  const { user, loading } = useAuth();

  // ✅ Show loader (never return null)
  if (loading) {
    return <div style={{ padding: "2rem" }}>Loading...</div>;
  }

  // ✅ Not logged in → login page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // ✅ Role-based protection
  if (role && user.role !== role) {
    if (user.role === "ADMIN") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    if (user.role === "RESIDENT") {
      return <Navigate to="/member/dashboard" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;


