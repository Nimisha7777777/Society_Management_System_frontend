import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import UploadPaymentModal from "./UploadPaymentModal";
import api from "../../api/axios";
import "./Maintenance.css";

export default function ResidentMaintenance() {
  const { user } = useAuth();
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);

  // ===== SEARCH STATE =====
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!user?.flatId) {
      setLoading(false);
      return;
    }

    api
      .get(`/api/resident/maintenance/flat/${user.flatId}`)
      .then(res => {
        setMaintenanceData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching maintenance:", err);
        setLoading(false);
      });
  }, [user]);

  if (!user) {
    return (
      <DashboardLayout>
        <p>Please log in to view your maintenance records.</p>
      </DashboardLayout>
    );
  }

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  // ===== SEARCH FILTER =====
  const filteredMaintenance = maintenanceData.filter(item => {
    const search = searchTerm.toLowerCase();

    const monthText = item.dueDate
      ? new Date(item.dueDate).toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
        }).toLowerCase()
      : "";

    return (
      monthText.includes(search) ||
      item.amount?.toString().includes(search) ||
      item.paymentStatus?.toLowerCase().includes(search) ||
      item.towerName?.toLowerCase().includes(search) ||
      item.flatNumber?.toLowerCase().includes(search)
    );
  });

  return (
    <DashboardLayout>
      <div className="maintenance-container">
        <h2 className="maintenance-title">My Maintenance</h2>

        {/* ===== SEARCH BAR ===== */}
        <div className="maintenance-search">
          <input
            type="text"
            placeholder="Search by month, amount, status..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="maintenance-table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Month</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Over Due Date</th>
              <th>Payment Status</th>
              <th>Payment Proof (Screenshot)</th>
              <th>Transaction ID</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredMaintenance.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  No maintenance records found
                </td>
              </tr>
            ) : (
              filteredMaintenance.map((item, index) => (
                <tr key={item.maintenanceId}>
                  {/* SERIAL NUMBER */}
                  <td>{index + 1}</td>

                  {/* MONTH FORMAT */}
                  <td>
                    {item.dueDate
                      ? new Date(item.dueDate).toLocaleDateString("en-GB", {
                          month: "long",
                          year: "numeric",
                        })
                      : "-"}
                  </td>

                  <td>₹ {item.amount}</td>
                  <td>{item.dueDate || "-"}</td>
                  <td>{item.overDueDate || "-"}</td>

                  {/* STATUS */}
                  <td>
                    <span className={`status ${item.paymentStatus.toLowerCase()}`}>
                      {item.paymentStatus.replace("_", " ")}
                    </span>
                  </td>

                  {/* SCREENSHOT */}
                  <td>
                    {item.paymentProof ? (
                      <a
                        href={`http://localhost:8080/uploads/${item.paymentProof}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={`http://localhost:8080/uploads/${item.paymentProof}`}
                          className="proof-thumb"
                          alt="proof"
                        />
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  {/* TXN */}
                  <td>{item.transactionId || "-"}</td>

                  {/* ACTION */}
                  <td>
                    <button
                      className={`btn success ${
                        item.paymentStatus !== "PENDING" ? "disabled" : ""
                      }`}
                      disabled={item.paymentStatus !== "PENDING"}
                      onClick={() => setSelectedMaintenance(item)}
                    >
                      Upload
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {selectedMaintenance && (
          <UploadPaymentModal
            maintenance={selectedMaintenance}
            onClose={() => setSelectedMaintenance(null)}
            onUpload={(updatedItem) => {
              setMaintenanceData(prev =>
                prev.map(m =>
                  m.maintenanceId === updatedItem.maintenanceId ? updatedItem : m
                )
              );
              setSelectedMaintenance(null);
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
