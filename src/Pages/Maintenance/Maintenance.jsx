import { useAuth } from "../../contexts/AuthContext";
import AdminMaintenance from "./AdminMaintenance";
import ResidentMaintenance from "./ResidentMaintenance";

export default function Maintenance() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please login</p>;

  return user.role === "ADMIN"
    ? <AdminMaintenance />
    : <ResidentMaintenance />;
}
