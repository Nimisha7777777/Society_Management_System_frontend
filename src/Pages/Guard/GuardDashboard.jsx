import { useEffect, useState } from "react";
import GuardLayout from "../../layouts/GuardLayout";
import api from "../../api/axios";

export default function GuardDashboard() {
  const [insideCount, setInsideCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);

  useEffect(() => {
    api.get("/api/visitors/inside", { withCredentials: true })
      .then(res => setInsideCount(res.data.length))
      .catch(() => setInsideCount(0));

    api.get("/api/visitors/today", { withCredentials: true })
      .then(res => setTodayCount(res.data.length))
      .catch(() => setTodayCount(0));
  }, []);

  return (
    <GuardLayout>
      <h2>Guard Dashboard</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={card}>
          <h3>{insideCount}</h3>
          <p>Visitors Inside</p>
        </div>

        <div style={cardGreen}>
          <h3>{todayCount}</h3>
          <p>Today Visitors</p>
        </div>
      </div>
    </GuardLayout>
  );
}

const card = {
  background: "white",
  padding: "20px",
  width: "220px",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const cardGreen = {
  ...card,
  borderLeft: "6px solid #16a34a",
};
