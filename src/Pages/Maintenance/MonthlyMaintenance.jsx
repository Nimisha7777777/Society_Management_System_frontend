import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";
import { toast } from "react-toastify";

export default function MonthlyMaintenance() {
  const today = new Date();
  const [billMonth, setBillMonth] = useState(today.getMonth() + 1);
  const [billYear, setBillYear] = useState(today.getFullYear());
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    try {
      setLoading(true);
      await api.post(
        `/api/admin/maintenance-config/generate?billMonth=${billMonth}&billYear=${billYear}`
      );
      toast.success("Maintenance generated");
      await loadBills();
    } catch (e) {
      console.error(e);
      toast.error("Generate failed");
    } finally {
      setLoading(false);
    }
  };

  const loadBills = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        `/api/admin/maintenance-config/bills?billMonth=${billMonth}&billYear=${billYear}`
      );
      setBills(res.data);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load bills");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="maintenance-container">
        <h2>Monthly Maintenance</h2>

        <p style={{ marginBottom: 12, opacity: 0.85 }}>
          Select a month and year, then click <b>Generate Now</b> to create
          maintenance bills for all <b>OCCUPIED</b> flats in your society.
        </p>

        <div className="admin-form">
          {/* Month */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontWeight: 600 }}>Billing Month (1–12)</label>
            <input
              type="number"
              min="1"
              max="12"
              value={billMonth}
              onChange={(e) => setBillMonth(Number(e.target.value))}
              placeholder="Example: 2 for Feb"
            />
            <small style={{ opacity: 0.75 }}>
              Example: <b>2</b> = February, <b>12</b> = December.
            </small>
          </div>

          {/* Year */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontWeight: 600 }}>Billing Year</label>
            <input
              type="number"
              value={billYear}
              onChange={(e) => setBillYear(Number(e.target.value))}
              placeholder="Example: 2026"
            />
            <small style={{ opacity: 0.75 }}>
              Choose the year for which you want to generate/view bills.
            </small>
          </div>

          <button className="btn success" onClick={loadBills} disabled={loading}>
            {loading ? "Loading..." : "View Bills"}
          </button>

          <button className="btn success" onClick={generate} disabled={loading}>
            {loading ? "Working..." : "Generate Now"}
          </button>

          <small style={{ marginTop: 6, opacity: 0.7 }}>
            Note: If bills for the selected month are already generated, clicking{" "}
            <b>Generate Now</b> will not create duplicates.
          </small>
        </div>

        <table className="maintenance-table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Tower</th>
              <th>Flat</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Overdue Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bills.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No bills found for this month/year
                </td>
              </tr>
            ) : (
              bills.map((m, index) => (
                <tr key={m.maintenanceId}>
                  <td>{index + 1}</td>
                  <td>{m.towerName}</td>
                  <td>{m.flatNumber}</td>
                  <td>₹ {m.amount}</td>
                  <td>{m.dueDate}</td>
                  <td>{m.overDueDate || "-"}</td>
                  <td>
                    <span className={`status ${m.paymentStatus.toLowerCase()}`}>
                      {m.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
