import { useEffect, useState } from "react";
import GuardLayout from "../../layouts/GuardLayout";
import api from "../../api/axios";
import { toast } from "react-toastify";
import "./GuardVisitors.css";

export default function InsideVisitors() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  // preview image state (must be inside component)
  const [previewPhoto, setPreviewPhoto] = useState(null);

  const fetchVisitors = async () => {
    try {
      const res = await api.get("/api/visitors/inside");
      setVisitors(res.data);
    } catch {
      toast.error("Failed to load visitors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const handleExit = async (visitorId) => {
    try {
      await api.put(`/api/visitors/exit/${visitorId}`);
      toast.success("Visitor exited");
      fetchVisitors();
    } catch {
      toast.error("Exit failed");
    }
  };

  return (
    <GuardLayout>
      <div className="guard-page">
        <div className="guard-card wide">
          <h2>Visitors Inside</h2>
          <p className="sub-text">Currently present visitors</p>

          {loading ? (
            <p className="empty-text">Loading...</p>
          ) : visitors.length === 0 ? (
            <p className="empty-text">No visitors inside</p>
          ) : (
            <table className="visitor-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Purpose</th>
                  <th>Vehicle</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {visitors.map((v) => (
                  <tr key={v.visitorId}>
                    {/* PHOTO */}
                    <td>
                      {v.visitorPhoto ? (
                        <img
                          src={`http://localhost:8080${v.visitorPhoto}`}
                          alt={v.visitorName}
                          className="visitor-photo clickable"
                          onClick={(e) => {
                            e.stopPropagation(); // prevent bubbling to row/modal
                            setPreviewPhoto(
                              `http://localhost:8080${v.visitorPhoto}`
                            );
                          }}
                        />
                      ) : (
                        <div className="visitor-photo placeholder">N/A</div>
                      )}
                    </td>

                    <td>{v.visitorName}</td>
                    <td>{v.phone}</td>

                    <td>
                      <span className="purpose-chip">{v.purpose}</span>
                    </td>

                    <td>
                      {v.hasVehicle ? (
                        <div className="vehicle-box">
                          <span className="vehicle-type">{v.vehicleType}</span>
                          <span className="vehicle-number">
                            {v.vehicleNumber}
                          </span>
                        </div>
                      ) : (
                        <span className="pedestrian">Pedestrian</span>
                      )}
                    </td>

                    <td>
                      <span className="status-badge inside">INSIDE</span>
                    </td>

                    <td>
                      <button
                        className="exit-btn"
                        onClick={() => handleExit(v.visitorId)}
                      >
                        Exit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* PHOTO MODAL */}
      {previewPhoto && (
        <div
          className="photo-modal"
          onClick={() => setPreviewPhoto(null)} // click outside image closes
        >
          <div
            className="photo-modal-inner"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking the inner area
          >
            <button
              className="photo-close"
              onClick={() => setPreviewPhoto(null)}
              aria-label="Close"
            >
              ×
            </button>

            <img src={previewPhoto} alt="Visitor Full" className="photo-full" />
          </div>
        </div>
      )}
    </GuardLayout>
  );
}
