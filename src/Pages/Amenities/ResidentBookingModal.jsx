import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/axios";
import "./ResidentBookingModal.css";

export default function ResidentBookingModal({
  facility,
  onClose,
  onBooked
}) {
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];


  const submitBooking = async (e) => {
    e.preventDefault();

    if (!bookingDate || !startTime || !endTime) {
      toast.error("Please fill all required fields");
      return;
    }

    if (endTime <= startTime) {
      toast.error("End time must be after start time");
      return;
    }

    try {
      setLoading(true);

      await api.post(
        "/api/bookings",
        {
          facilityId: facility.facilityId,
          bookingDate,
          startTime,
          endTime,
          purpose
        },
        { withCredentials: true }
      );

      toast.success("Booking request sent");
      onBooked();
      onClose();

    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Book {facility.facilityName}</h2>

        <form className="modal-form" onSubmit={submitBooking}>
          <label>Date</label>
          <input
  type="date"
  value={bookingDate}
  min={today}          // 🔥 disables past dates
  onChange={(e) => setBookingDate(e.target.value)}
  required
/>


          <label>Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />

          <label>End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />

          <label>Purpose</label>
          <textarea
            placeholder="Optional"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />

          <div className="modal-actions">
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
