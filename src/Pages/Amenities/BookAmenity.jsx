import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/axios";

import DashboardLayout from "../../layouts/DashboardLayout";

export default function BookAmenity() {
  const { state: amenity } = useLocation();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  if (!amenity) {
    return (
      <DashboardLayout>
        <p>Invalid amenity selection</p>
      </DashboardLayout>
    );
  }

  const handleBooking = async () => {
    if (!date) {
      toast.error("Please select a date");
      return;
    }

    try {
      setLoading(true);

      // 🔥 BACKEND API (create later if not exists)
      await api.post("/api/amenity-bookings", {
        facilityId: amenity.id,
        bookingDate: date,
        notes,
      });

      toast.success("Amenity booked successfully!");
      navigate("/amenities");

    } catch (err) {
      toast.error(err.response?.data || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h1>Book Amenity</h1>

      <h3>{amenity.name}</h3>
      <p>{amenity.description}</p>

      <label>Booking Date *</label>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />

      <label>Notes (optional)</label>
      <textarea
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />

      <button onClick={handleBooking} disabled={loading}>
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </DashboardLayout>
  );
}
