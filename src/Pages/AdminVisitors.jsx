import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/axios";
import { toast } from "react-toastify";
import "./AdminVisitors.css";

export default function AdminVisitors() {
  const [tab, setTab] = useState("inside");
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewPhoto, setPreviewPhoto] = useState(null);

  const fetchVisitors = async () => {
    setLoading(true);
    try {
      let url = "/api/visitors";

      if (tab === "inside") url += "/inside";
      if (tab === "today") url += "/today";

      const res = await api.get(url);
      setVisitors(res.data);
    } catch {
      toast.error("Failed to load visitors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, [tab]);

  return (
    <DashboardLayout>
      <div className="admin-visitors-page">
        <h2>Visitors</h2>
        <p className="sub-text">Monitor society visitors</p>

        {/* TABS */}
        <div className="visitor-tabs">
          <button className={tab === "inside" ? "active" : ""} onClick={() => setTab("inside")}>
            Inside
          </button>
          <button className={tab === "today" ? "active" : ""} onClick={() => setTab("today")}>
            Today
          </button>
          <button className={tab === "all" ? "active" : ""} onClick={() => setTab("all")}>
            All
          </button>
        </div>

        {/* TABLE */}
        <div className="visitor-card">
          {loading ? (
            <p className="empty-text">Loading...</p>
          ) : visitors.length === 0 ? (
            <p className="empty-text">No visitors found</p>
          ) : (
            <table className="visitor-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Purpose</th>
                  <th>Vehicle</th>
                  <th>Entry Time</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {visitors.map((v) => (
                  <tr key={v.visitorId}>
                    <td>
                      {v.visitorPhoto ? (
                        <img
                          src={`http://localhost:8080${v.visitorPhoto}`}
                          alt={v.visitorName}
                          className="visitor-img clickable"
                          onClick={() =>
                            setPreviewPhoto(`http://localhost:8080${v.visitorPhoto}`)
                          }
                        />
                      ) : (
                        <div className="visitor-img placeholder" />
                      )}
                    </td>

                    <td>{v.visitorName}</td>
                    <td>{v.phone}</td>

                    <td>
                      <span className="purpose-chip">{v.purpose}</span>
                    </td>

                    <td>
                      {v.hasVehicle ? (
                        <div>
                          <strong>{v.vehicleType}</strong>
                          <div className="vehicle-number">{v.vehicleNumber}</div>
                        </div>
                      ) : (
                        <span className="pedestrian">Pedestrian</span>
                      )}
                    </td>

                    <td>
                      {new Date(v.entryTime).toLocaleString()}
                    </td>

                    <td>
                      <span className={`status-badge ${v.exitTime ? "exited" : "inside"}`}>
                        {v.exitTime ? "EXITED" : "INSIDE"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* PHOTO MODAL */}
        {previewPhoto && (
          <div className="photo-modal" onClick={() => setPreviewPhoto(null)}>
            <img src={previewPhoto} alt="Visitor Full" />
            <span className="close-btn">×</span>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
