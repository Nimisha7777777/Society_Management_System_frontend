import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";
import "./AdminParking.css";

export default function AdminParking() {
  const [parkingSlots, setParkingSlots] = useState([]);
  const { user } = useAuth();
  const societyId = user?.societyId;

  useEffect(() => {
    api
      .get("/api/admin/parking/all")
      .then((res) => setParkingSlots(res.data))
      .catch((err) => {
        console.error("Error fetching parking slots", err);
        setParkingSlots([]);
      });
  }, []);

  return (
    <DashboardLayout>
      <div className="admin-parking-page">
        <h1>Parking Slots - Society {societyId}</h1>
        <table className="parking-table">
          <thead>
            <tr>
              <th>Slot Number</th>
              <th>Status</th>
              <th>Vehicle Type</th>
              <th>Flat Number</th>
              <th>Tower</th>
            </tr>
          </thead>
          <tbody>
            {parkingSlots.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  No parking slots found
                </td>
              </tr>
            ) : (
              parkingSlots.map((slot) => (
                <tr key={slot.slotNumber}>
                  <td>{slot.slotNumber}</td>
                  <td>{slot.status}</td>
                  <td>{slot.vehicleType}</td>
                  <td>{slot.flatNumber || "-"}</td>
                  <td>{slot.towerName || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
