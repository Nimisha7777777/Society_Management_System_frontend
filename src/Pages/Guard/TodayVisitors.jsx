import { useEffect, useState } from "react";
import GuardLayout from "../../layouts/GuardLayout";
import api from "../../api/axios";
import "./GuardVisitors.css";

export default function TodayVisitors() {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    api.get("/api/visitors/today", { withCredentials: true })
      .then(res => setVisitors(res.data))
      .catch(() => setVisitors([]));
  }, []);

  return (
    <GuardLayout>
      <h2>Today Visitors</h2>
      <p className="sub-text">Visitors who entered today</p>

      {visitors.length === 0 ? (
        <p className="empty-text">No visitors today</p>
      ) : (
        <table className="visitor-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Purpose</th>
              <th>Vehicle</th>
              <th>Entry Time</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map(v => (
              <tr key={v.visitorId}>
                <td>{v.visitorName}</td>
                <td>{v.phone}</td>
                <td>{v.purpose}</td>
                <td>
                  {v.hasVehicle
                    ? `${v.vehicleType} (${v.vehicleNumber})`
                    : "Pedestrian"}
                </td>
                <td>{new Date(v.entryTime).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </GuardLayout>
  );
}
