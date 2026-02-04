import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import DashboardLayout from "../../../layouts/DashboardLayout";
import "./AdminBookings.css";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  // const loadBookings = async () => {
  //   try {
  //     const res = await api.get("/api/bookings", {
  //       params: { status: "PENDING" }
  //     });
  //     setBookings(res.data);
  //   } catch {
  //     toast.error("Failed to load bookings");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const loadBookings = async () => {
  try {
    const res = await api.get("/api/bookings", {
      params: { status: "PENDING" }
    });

    const sorted = [...res.data].sort((a, b) => {
      const d1 = new Date(`${a.bookingDate}T${a.startTime}`);
      const d2 = new Date(`${b.bookingDate}T${b.startTime}`);
      return d1 - d2; // earliest first
    });

    setBookings(sorted);
  } catch {
    toast.error("Failed to load bookings");
  } finally {
    setLoading(false);
  }
};


  const approveBooking = async (id) => {
    try {
      await api.put(`/api/bookings/${id}/approve`);
      toast.success("Booking approved");
      loadBookings();
    } catch {
      toast.error("Approval failed");
    }
  };

  const rejectBooking = async (id) => {
    try {
      await api.put(`/api/bookings/${id}/reject`);
      toast.success("Booking rejected");
      loadBookings();
    } catch {
      toast.error("Rejection failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="admin-bookings">
        <h1>Amenity Booking Approvals</h1>

        {loading ? (
          <p>Loading...</p>
        ) : bookings.length === 0 ? (
          <p>No pending booking requests</p>
        ) : (
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Facility</th>
                <th>User</th>
                <th>Date</th>
                <th>Time</th>
                <th>Purpose</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.bookingId}>
                  <td>{b.facilityName.replaceAll("_", " ")}</td>
                  <td>{b.userName}</td>
                  <td>{b.bookingDate}</td>
                  <td>{b.startTime} – {b.endTime}</td>
                  <td>{b.purpose || "-"}</td>
                  <td>
                    <button
                      className="approve"
                      onClick={() => approveBooking(b.bookingId)}
                    >
                      Approve
                    </button>
                    <button
                      className="reject"
                      onClick={() => rejectBooking(b.bookingId)}
                    >
                      Reject
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
