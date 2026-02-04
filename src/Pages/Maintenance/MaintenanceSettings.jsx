import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";
import { toast } from "react-toastify";

export default function MaintenanceSettings() {
  const [form, setForm] = useState({
    ratePerSqft: 3,
    dueDay: 28,
    overdueGraceDays: 5,
    overdueExtraAmount: 0,
  });

  const loadConfig = async () => {
    try {
      const res = await api.get("/api/admin/maintenance-config");
      setForm(res.data);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load config");
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  const save = async () => {
    try {
      await api.post("/api/admin/maintenance-config", form);
      toast.success("Settings saved");
    } catch (e) {
      console.error(e);
      toast.error("Save failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="maintenance-container">
        <h2>Maintenance Settings</h2>

        <p style={{ marginBottom: 12, opacity: 0.85 }}>
          These settings are used to auto-generate monthly maintenance for all{" "}
          <b>OCCUPIED</b> flats in your society.
        </p>

        <div className="admin-form">
          {/* Rate per sqft */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontWeight: 600 }}>
              Maintenance Rate (₹ per sq ft)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={form.ratePerSqft}
              onChange={(e) =>
                setForm({ ...form, ratePerSqft: Number(e.target.value) })
              }
              placeholder="Example: 3"
            />
            <small style={{ opacity: 0.75 }}>
              Amount is calculated as: <b>Flat Area (sqft) × Rate</b>. Default:{" "}
              <b>₹3/sqft</b>.
            </small>
          </div>

          {/* Due day */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontWeight: 600 }}>Due Day of the Month</label>
            <input
              type="number"
              min="1"
              max="31"
              value={form.dueDay}
              onChange={(e) =>
                setForm({ ...form, dueDay: Number(e.target.value) })
              }
              placeholder="Example: 28"
            />
            <small style={{ opacity: 0.75 }}>
              The bill due date will be on this day every month. Example:{" "}
              <b>28</b> means due on <b>28th</b>. If month has fewer days, the
              system uses the last day of that month.
            </small>
          </div>

          {/* Grace days */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontWeight: 600 }}>
              Overdue Grace Days (after due date)
            </label>
            <input
              type="number"
              min="0"
              max="60"
              value={form.overdueGraceDays}
              onChange={(e) =>
                setForm({ ...form, overdueGraceDays: Number(e.target.value) })
              }
              placeholder="Example: 5"
            />
            <small style={{ opacity: 0.75 }}>
              Overdue date is calculated as: <b>Due Date + Grace Days</b>.
              Default: <b>5 days</b>.
            </small>
          </div>

          {/* Late fee */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontWeight: 600 }}>
              Late Fee After Overdue Date (₹)
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={form.overdueExtraAmount}
              onChange={(e) =>
                setForm({ ...form, overdueExtraAmount: Number(e.target.value) })
              }
              placeholder="Example: 200"
            />
            <small style={{ opacity: 0.75 }}>
              Fixed extra charge added when payment is made after the overdue
              date. Keep <b>0</b> if you don’t want late fee.
            </small>
          </div>

          <button className="btn success" onClick={save}>
            Save Settings
          </button>

          <small style={{ marginTop: 6, opacity: 0.7 }}>
            Tip: After saving settings, go to <b>Monthly Maintenance</b> page and
            click <b>Generate Now</b> to generate bills for a selected month.
          </small>
        </div>
      </div>
    </DashboardLayout>
  );
}
