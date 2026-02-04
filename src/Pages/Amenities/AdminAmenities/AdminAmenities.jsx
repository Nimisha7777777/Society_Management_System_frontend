import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../api/axios";
import "./AdminAmenities.css";
import DashboardLayout from "../../../layouts/DashboardLayout";

const FACILITIES = [
  "GYM",
  "SWIMMING_POOL",
  "CLUB_HOUSE",
  "COMMUNITY_HALL",
  "GARDEN",
  "PLAYGROUND",
  "PARKING",
  "TENNIS_COURT",
];

const STATUSES = ["ACTIVE", "MAINTENANCE", "CLOSED"];

export default function AdminAmenities() {
  const [facilities, setFacilities] = useState([]);
  const [facilityName, setFacilityName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [bookingRequired, setBookingRequired] = useState(true);

  const fetched = useRef(false);

  // 🔹 LOAD FACILITIES ONCE
  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    loadFacilities();
  }, []);

  const loadFacilities = async () => {
    try {
      const res = await api.get("/api/facilities");
      setFacilities(res.data);
    } catch (err) {
      toast.error("Failed to load facilities");
    }
  };

  // 🔹 ADD FACILITY
  const handleAddFacility = async (e) => {
    e.preventDefault();

    if (!facilityName || !capacity) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await api.post("/api/facilities", {
        facilityName,
        capacity: Number(capacity),
        status,
        bookingRequired,
      });

      toast.success("Facility added successfully");

      setFacilityName("");
      setCapacity("");
      setStatus("ACTIVE");
      setBookingRequired(true);

      loadFacilities();
    } catch (err) {
      toast.error("Failed to add facility");
    }
  };

  // 🔹 UPDATE STATUS
  const handleStatusChange = async (facility, newStatus) => {
    try {
      await api.put(`/api/facilities/${facility.facilityId}`, {
        capacity: facility.capacity,
        bookingRequired: facility.bookingRequired,
        status: newStatus,
      });

      toast.success("Facility status updated");
      loadFacilities();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <DashboardLayout>
      <div className="admin-amenities">

        <h1 className="page-title">Manage Amenities</h1>

        {/* ADD FACILITY FORM */}
        <form className="amenity-form" onSubmit={handleAddFacility}>
          <select
            value={facilityName}
            onChange={(e) => setFacilityName(e.target.value)}
          >
            <option value="">Select Facility</option>
            {FACILITIES.map((f) => (
              <option key={f} value={f}>
                {f.replace("_", " ")}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={bookingRequired}
              onChange={(e) => setBookingRequired(e.target.checked)}
            />
            Booking Required
          </label>

          <button type="submit" className="primary-btn">
            Add Facility
          </button>
        </form>

        <hr />

        {/* EXISTING FACILITIES */}
        <h2 className="section-title">Existing Amenities</h2>

        {facilities.length === 0 ? (
          <p className="empty-text">No amenities added yet</p>
        ) : (
          <table className="amenity-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Booking Required</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {facilities.map((f) => (
                <tr key={f.facilityId}>
                  <td>{f.facilityName.replace("_", " ")}</td>
                  <td>{f.capacity}</td>
                  <td>
                    <select
                      className="status-select"
                      value={f.status}
                      onChange={(e) =>
                        handleStatusChange(f, e.target.value)
                      }
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{f.bookingRequired ? "Yes" : "No"}</td>
                  <td>
                    <button className="update-btn">
                      Saved
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}
