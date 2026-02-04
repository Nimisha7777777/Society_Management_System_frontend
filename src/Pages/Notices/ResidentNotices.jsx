import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import Card from "../../Components/Card";
import api from "../../api/axios";

export default function ResidentNotices() {
  const [notices, setNotices] = useState([]);

    useEffect(() => {
    api.get("/api/notices")
        .then(res => setNotices(res.data))
        .catch(err => console.error(err));
    }, []);

  return (
    <DashboardLayout>
      <h1>Notices</h1>

      <div className="grid">
        {notices.map(n => (
          <Card key={n.noticeId}>
            <h3>{n.title}</h3>
            <p>{n.description}</p>
            <small>
              {new Date(n.createdAt).toLocaleString()}
            </small>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
