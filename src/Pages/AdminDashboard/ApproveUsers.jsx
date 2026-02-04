import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import "./ApproveUsers.css";

export default function ApproveUsers() {
  const { user, loading } = useAuth();
  const societyId = user?.societyId;

  const [users, setUsers] = useState([]);
  const [flats, setFlats] = useState({}); // { towerName: [flat1, flat2] }
  const [selectedTower, setSelectedTower] = useState({}); // userId -> towerName
  const [selectedFlat, setSelectedFlat] = useState({}); // userId -> flatId

  useEffect(() => {
    if (loading || !societyId) return;

    loadPendingUsers();
    loadAvailableFlats();
  }, [loading, societyId]);

  const loadPendingUsers = async () => {
    const res = await api.get(
      `/api/admin/pending?societyId=${societyId}`
    );
    setUsers(res.data);
  };

const loadAvailableFlats = async () => {
  try {
    const res = await api.get(
      `/api/admin/flats?societyId=${societyId}`
    );

    const grouped = {};

    res.data
      .filter((flat) => flat.status === "VACANT") // IMPORTANT
      .forEach((flat) => {
        if (!grouped[flat.towerName]) {
          grouped[flat.towerName] = [];
        }

        grouped[flat.towerName].push({
          flatId: flat.flatId,
          flatNumber: flat.flatNumber,
        });
      });

    setFlats(grouped);
  } catch (error) {
    console.error("Error loading flats", error);
  }
};


  const handleTowerChange = (userId, towerName) => {
    setSelectedTower((prev) => ({
      ...prev,
      [userId]: towerName,
    }));
    // Reset flat selection if tower changes
    setSelectedFlat((prev) => ({
      ...prev,
      [userId]: "",
    }));
  };

  const handleFlatChange = (userId, flatId) => {
    setSelectedFlat((prev) => ({
      ...prev,
      [userId]: flatId,
    }));
  };

  const approveUser = async (userId) => {
    const flatId = selectedFlat[userId];

    if (!flatId) {
      alert("Please assign flat before approving");
      return;
    }

    await api.post(`/api/admin/approve`, {
      userId,
      flatId,
    });

    loadPendingUsers();
  };

  return (
    <DashboardLayout>
      <div className="approve-users-container">
        <h1>Approve Residents</h1>

        <table className="approve-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Registered On</th>
              <th>Society</th>
              <th>Select Tower</th>
              <th>Select Flat</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.firstName} {user.middleName} {user.lastName}</td>
                <td>{user.phone}</td>
                <td>{user.registrationDate}</td>
                <td>{user.societyName}</td>

                {/* Tower dropdown */}
                <td>
                  <select
                    value={selectedTower[user.userId] || ""}
                    onChange={(e) =>
                      handleTowerChange(user.userId, e.target.value)
                    }
                  >
                    <option value="">Select Tower</option>
                    {Object.keys(flats).map((tower) => (
                      <option key={tower} value={tower}>
                        {tower}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Flat dropdown */}
                <td>
                  <select
                    value={selectedFlat[user.userId] || ""}
                    onChange={(e) =>
                      handleFlatChange(user.userId, e.target.value)
                    }
                    disabled={!selectedTower[user.userId]}
                  >
                    <option value="">Select Flat</option>
                    {selectedTower[user.userId] &&
                      flats[selectedTower[user.userId]].map((flat) => (
                        <option key={flat.flatId} value={flat.flatId}>
                          {flat.flatNumber}
                        </option>
                      ))}
                  </select>
                </td>

                <td>
                  <button
                    className="approve-btn"
                    onClick={() => approveUser(user.userId)}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
