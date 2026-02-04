import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import DashboardLayout from "../../layouts/DashboardLayout";
import "./Amenities.css";

export default function ResidentAmenities() {
  const { user } = useAuth();
  const [facilities, setFacilities] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState({ message: "", type: "info", show: false });

  if (!user) {
    return (
      <DashboardLayout>
        <p>Please login to view amenities.</p>
      </DashboardLayout>
    );
  }

  const showPopup = (message, type = "info") => {
    setPopup({ message, type, show: true });
    setTimeout(() => setPopup(p => ({ ...p, show: false })), 2500);
  };

  const fetchData = async () => {
    try {
      const facRes = await fetch("http://localhost:8080/api/facilities/active", { credentials: "include" });
      const facData = await facRes.json();
      setFacilities(facData || []);

      const bookRes = await fetch("http://localhost:8080/api/bookings/my", { credentials: "include" });
      const bookData = await bookRes.json();
      setBookings(bookData || []);
    } catch (err) {
      console.error(err);
      showPopup("Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  if (loading) return <DashboardLayout><p>Loading...</p></DashboardLayout>;

  return (
    <DashboardLayout>
      {popup.show && <div className={`popup ${popup.type}`}>{popup.message}</div>}

      <div className="amenities-container">
        <h2>Book a Facility</h2>

        <div className="booking-form">
          <select value={selectedFacility} onChange={e => setSelectedFacility(e.target.value)}>
            <option value="">Select Facility</option>
            {facilities.map(f => (
              <option key={f.facilityId} value={f.facilityId}>
                {f.facilityName} (Capacity: {f.capacity})
              </option>
            ))}
          </select>

          <input type="date" value={bookingDate} onChange={e => setBookingDate(e.target.value)} />
          <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
          <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
          <input placeholder="Purpose" value={purpose} onChange={e => setPurpose(e.target.value)} />
          <button onClick={() => showPopup("Booking function not implemented", "info")}>Book</button>
        </div>

        <h3>My Bookings</h3>
        <table className="amenities-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Facility</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? bookings.map(b => (
              <tr key={b.bookingId}>
                <td>{b.bookingId}</td>
                <td>{b.facilityName}</td>
                <td>{b.bookingDate}</td>
                <td>{b.startTime} - {b.endTime}</td>
                <td>{b.status}</td>
              </tr>
            )) : (
              <tr><td colSpan={5}>No bookings found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
