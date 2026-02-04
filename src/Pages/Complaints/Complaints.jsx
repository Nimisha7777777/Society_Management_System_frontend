import { useAuth } from "../../contexts/AuthContext";
import AdminComplaints from "./AdminComplaints";
import ResidentComplaints from "./ResidentComplaints";

export default function Complaints() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please login</p>;

  return user.role === "ADMIN" ? <AdminComplaints /> : <ResidentComplaints />;
}
