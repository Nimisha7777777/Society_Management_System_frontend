import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import ResidentBookingModal from "./ResidentBookingModal";
import "./ResidentAmenities.css";
import { toast } from "react-toastify";

export default function ResidentAmenities() {
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);

  useEffect(() => {
    loadFacilities();
  }, []);

  const loadFacilities = async () => {
    try {
      const res = await api.get("/api/facilities/active");
      setFacilities(res.data);
    } catch {
      toast.error("Failed to load amenities");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="amenities-title">Available Amenities</h1>

      <div className="amenities-grid">
        {facilities.map((f) => (
          <div key={f.facilityId} className="amenity-card">
            <h3>{f.facilityName.replace("_", " ")}</h3>
            <p>Capacity: {f.capacity}</p>
            <p>Status: {f.status}</p>

            {f.bookingRequired && (
              <button
                className="book-btn"
                onClick={() => setSelectedFacility(f)}
              >
                Book Now
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedFacility && (
        <ResidentBookingModal
          facility={selectedFacility}
          onClose={() => setSelectedFacility(null)}
          onBooked={loadFacilities}
        />
      )}
    </DashboardLayout>
  );
}
