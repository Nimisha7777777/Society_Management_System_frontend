import { useAuth } from "../../contexts/AuthContext";
import AdminNotices from "./AdminNotices";
import ResidentNotices from "./ResidentNotices";

export default function Notices() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please login</p>;

  return user.role === "ADMIN"
    ? <AdminNotices />
    : <ResidentNotices />;
}
