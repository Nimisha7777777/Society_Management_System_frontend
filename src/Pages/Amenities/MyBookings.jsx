import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import DashboardLayout from "../../layouts/DashboardLayout";
import "./MyBookings.css";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
  try {
    const res = await api.get("/api/bookings/my");

    const previous =
      JSON.parse(localStorage.getItem("bookingStatusMap")) || {};

    res.data.forEach((b) => {
      const prevStatus = previous[b.bookingId];

      if (prevStatus && prevStatus !== b.status) {
        if (b.status === "APPROVED") {
          toast.success(
            `🎉 ${b.facilityName} booking approved`
          );
        }
        if (b.status === "REJECTED") {
          toast.error(
            `❌ ${b.facilityName} booking rejected`
          );
        }
      }

      previous[b.bookingId] = b.status;
    });

    localStorage.setItem(
      "bookingStatusMap",
      JSON.stringify(previous)
    );

    const sorted = res.data.sort(
      (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)
    );

    setBookings(sorted);

  } catch {
    toast.error("Failed to load bookings");
  } finally {
    setLoading(false);
  }
};


  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      await api.put(`/api/bookings/${id}/cancel`);
      toast.success("Booking cancelled");
      loadBookings();
    } catch {
      toast.error("Failed to cancel booking");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1>My Amenity Bookings</h1>

      {bookings.length === 0 ? (
        <div className="empty-state">
          No bookings yet. Book an amenity to get started 🚀
        </div>
      ) : (
        <div className="bookings-table-wrapper">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Facility</th>
                <th>Date</th>
                <th>Time</th>
                <th>Purpose</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b.bookingId}>
                  <td>{b.facilityName}</td>
                  <td>{b.bookingDate}</td>
                  <td>
                    {b.startTime} – {b.endTime}
                  </td>
                  <td>{b.purpose || "-"}</td>

                  <td>
                    <span
                      className={`status-badge ${b.status.toLowerCase()}`}
                    >
                      {b.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="cancel-btn"
                      disabled={
                        b.status === "CANCELLED" ||
                        b.status === "REJECTED"
                      }
                      onClick={() => cancelBooking(b.bookingId)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}
