import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import "./Maintenance.css";

export default function AdminMaintenance() {
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===== FLATS STATE =====
  const [flats, setFlats] = useState({});

  // ===== FORM STATE =====
  const [towerName, setTowerName] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [overDueDate, setOverDueDate] = useState("");
  const [editingId, setEditingId] = useState(null);

  // ===== SEARCH STATE =====
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useAuth();
  const societyId = user?.societyId;

  // ===== POPUP =====
  const [popup, setPopup] = useState({ message: "", type: "info", show: false });

  const showPopup = (message, type = "info") => {
    setPopup({ message, type, show: true });
    setTimeout(() => setPopup(p => ({ ...p, show: false })), 2500);
  };

  // ================= FETCH MAINTENANCE =================
  const fetchMaintenance = async () => {
    try {
      const res = await api.get("/api/admin/maintenance");
      setMaintenanceData(res.data);
    } catch (err) {
      console.error(err);
      showPopup("Failed to load maintenance", "error");
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH FLATS =================
  const loadAllFlats = async () => {
    if (!societyId) return;

    try {
      const res = await api.get(`/api/admin/flats?societyId=${societyId}`);

      const grouped = {};
      res.data.forEach(flat => {
        if (!grouped[flat.towerName]) grouped[flat.towerName] = [];
        grouped[flat.towerName].push({
          flatId: flat.flatId,
          flatNumber: flat.flatNumber,
        });
      });

      setFlats(grouped);
    } catch (err) {
      console.error(err);
      showPopup("Failed to load flats", "error");
    }
  };

  useEffect(() => {
    fetchMaintenance();
    loadAllFlats();
  }, [societyId]);

  // ================= CREATE / UPDATE =================
  const handleCreateOrUpdate = async () => {
    if (!towerName || !flatNumber || !amount || !dueDate) {
      showPopup("All fields are required", "error");
      return;
    }

    if (editingId) {
      const current = maintenanceData.find(m => m.maintenanceId === editingId);
      if (current.paymentStatus !== "PENDING") {
        showPopup("Only pending maintenance can be edited", "error");
        return;
      }
    }

    try {
      const payload = { towerName, flatNumber, amount, dueDate, overDueDate };

      const res = editingId
        ? await api.put(`/api/admin/maintenance/${editingId}`, payload)
        : await api.post("/api/admin/maintenance", payload);

      const saved = res.data;

      setMaintenanceData(prev =>
        editingId
          ? prev.map(m => (m.maintenanceId === editingId ? saved : m))
          : [...prev, saved]
      );

      showPopup(editingId ? "Maintenance updated" : "Maintenance created", "success");
      resetForm();
    } catch (err) {
      console.error(err);
      showPopup("Operation failed", "error");
    }
  };

  const resetForm = () => {
    setTowerName("");
    setFlatNumber("");
    setAmount("");
    setDueDate("");
    setOverDueDate("");
    setEditingId(null);
  };

  // ================= DELETE =================
  const handleDelete = async (id, status) => {
    if (status === "PAID" || status === "APPROVAL_PENDING") {
      showPopup("Cannot delete paid or approval pending maintenance", "error");
      return;
    }

    if (!window.confirm("Delete this maintenance?")) return;

    try {
      await api.delete(`/api/admin/maintenance/${id}`);
      setMaintenanceData(prev => prev.filter(m => m.maintenanceId !== id));
      showPopup("Maintenance deleted", "success");
    } catch (err) {
      console.error(err);
      showPopup("Delete failed", "error");
    }
  };

  // ================= APPROVE =================
  const handleApprove = async (id, status) => {
    if (status !== "APPROVAL_PENDING") return;

    try {
      const res = await api.put(`/api/admin/maintenance/${id}/approve`);
      setMaintenanceData(prev =>
        prev.map(m => (m.maintenanceId === id ? res.data : m))
      );
      showPopup("Payment approved", "success");
    } catch (err) {
      console.error(err);
      showPopup("Approve failed", "error");
    }
  };

  // ================= REJECT =================
  const handleReject = async (id, status) => {
    if (status !== "APPROVAL_PENDING") return;
    if (!window.confirm("Reject this payment?")) return;

    try {
      const res = await api.put(`/api/admin/maintenance/${id}/reject`);
      setMaintenanceData(prev =>
        prev.map(m => (m.maintenanceId === id ? res.data : m))
      );
      showPopup("Payment rejected", "success");
    } catch (err) {
      console.error(err);
      showPopup("Reject failed", "error");
    }
  };

  // ================= EDIT =================
  const handleEdit = item => {
    if (item.paymentStatus !== "PENDING") return;

    setEditingId(item.maintenanceId);
    setTowerName(item.towerName);
    setFlatNumber(item.flatNumber);
    setAmount(item.amount);
    setDueDate(item.dueDate);
    setOverDueDate(item.overDueDate || "");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ================= SEARCH FILTER =================
  const filteredMaintenance = maintenanceData.filter(m => {
    const search = searchTerm.toLowerCase();

    return (
      m.towerName?.toLowerCase().includes(search) ||
      m.flatNumber?.toLowerCase().includes(search) ||
      m.amount?.toString().includes(search) ||
      m.paymentStatus?.toLowerCase().includes(search) ||
      (m.dueDate &&
        new Date(m.dueDate)
          .toLocaleDateString("en-GB")
          .toLowerCase()
          .includes(search))
    );
  });

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {popup.show && <div className={`popup ${popup.type}`}>{popup.message}</div>}


      <div className="maintenance-container">
        <div style={{ display: "flex",justifyContent: "flex-end" ,gap: 10, marginBottom: 15 }}>
          <Link to="/maintenance/settings" className="btn success">
            Maintenance Settings
          </Link>

          <Link to="/maintenance/monthly" className="btn success">
            Monthly Maintenance
          </Link>
        </div>
        <h2>{editingId ? "Edit Maintenance" : "Add Maintenance"}</h2>

        {/* ===== FORM ===== */}
        <div className="admin-form">
          <select
            value={towerName}
            onChange={e => {
              setTowerName(e.target.value);
              setFlatNumber("");
            }}
          >
            <option value="">Select Tower</option>
            {Object.keys(flats).map(tower => (
              <option key={tower} value={tower}>{tower}</option>
            ))}
          </select>

          <select
            value={flatNumber}
            onChange={e => setFlatNumber(e.target.value)}
            disabled={!towerName}
          >
            <option value="">Select Flat</option>
            {towerName &&
              flats[towerName]?.map(flat => (
                <option key={flat.flatId} value={flat.flatNumber}>
                  {flat.flatNumber}
                </option>
              ))}
          </select>

          <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />

          <input
            type="date"
            placeholder="Payment due date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />

          <input
            type="date"
            placeholder="Late fee starts from (optional)"
            value={overDueDate}
            onChange={e => setOverDueDate(e.target.value)}
          />

          <button className="btn success" onClick={handleCreateOrUpdate}>
            {editingId ? "Update" : "Create"}
          </button>

          {editingId && (
            <button className="btn danger" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>

        {/* ===== SEARCH BAR ===== */}
        <div className="maintenance-search">
          <input
            type="text"
            placeholder="Search by date, amount, tower, flat number or status..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {/* ===== TABLE ===== */}
        <table className="maintenance-table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Month (Billing For)</th>
              <th>Tower</th>
              <th>Flat</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Screenshot</th>
              <th>Transaction ID</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredMaintenance.map((m, index) => {
              const canEdit = m.paymentStatus === "PENDING";
              const canApprove = m.paymentStatus === "APPROVAL_PENDING";

              return (
                <tr key={m.maintenanceId}>
                  <td>{index + 1}</td>

                  <td>
                    {m.dueDate
                      ? new Date(m.dueDate).toLocaleDateString("en-GB", {
                          month: "long",
                          year: "numeric",
                        })
                      : "-"}
                  </td>

                  <td>{m.towerName}</td>
                  <td>{m.flatNumber}</td>
                  <td>{m.amount}</td>

                  <td>
                    <span className={`status ${m.paymentStatus.toLowerCase()}`}>
                      {m.paymentStatus}
                    </span>
                  </td>

                  <td>
                    {m.paymentProof ? (
                      <a
                        href={`http://localhost:8080/uploads/${encodeURIComponent(m.paymentProof)}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={`http://localhost:8080/uploads/${encodeURIComponent(m.paymentProof)}`}
                          alt="proof"
                          style={{ width: "90px", height: "60px", objectFit: "cover" }}
                        />
                      </a>
                    ) : "-"}
                  </td>

                  <td>{m.transactionId || "-"}</td>

                  <td>
                    <button className="btn edit-btn" disabled={!canEdit} onClick={() => handleEdit(m)}>Edit</button>
                    <button className="btn delete-btn" disabled={!canEdit} onClick={() => handleDelete(m.maintenanceId, m.paymentStatus)}>Delete</button>
                    <button className="btn approve-btn" disabled={!canApprove} onClick={() => handleApprove(m.maintenanceId, m.paymentStatus)}>Approve</button>
                    <button className="btn danger" disabled={!canApprove} onClick={() => handleReject(m.maintenanceId, m.paymentStatus)}>Reject</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
