import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";
import { toast } from "react-toastify";

export default function MaintenanceSettings() {
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    calcMode: "PER_SQFT", // PER_SQFT | FIXED_BY_BHK

    ratePerSqft: 3,
    dueDay: 28,
    overdueGraceDays: 5,
    overdueExtraAmount: 0,

    bhk1Amount: "",
    bhk2Amount: "",
    bhk3Amount: "",
    bhk4Amount: "",
  });

  // which BHK types admin wants to enable (any subset)
  const [enabledBhk, setEnabledBhk] = useState({
    BHK_1: false,
    BHK_2: false,
    BHK_3: false,
    BHK_4: false,
  });

  const loadConfig = async () => {
    try {
      const res = await api.get("/api/admin/maintenance-config");
      const data = res.data || {};

      const mode = data.calcMode || "PER_SQFT";

      setForm(prev => ({
        ...prev,
        calcMode: mode,
        ratePerSqft: data.ratePerSqft ?? 3,
        dueDay: data.dueDay ?? 28,
        overdueGraceDays: data.overdueGraceDays ?? 5,
        overdueExtraAmount: data.overdueExtraAmount ?? 0,

        bhk1Amount: data.bhk1Amount ?? "",
        bhk2Amount: data.bhk2Amount ?? "",
        bhk3Amount: data.bhk3Amount ?? "",
        bhk4Amount: data.bhk4Amount ?? "",
      }));

      // Enable checkboxes based on which amounts exist (>0)
      setEnabledBhk({
        BHK_1: Number(data.bhk1Amount) > 0,
        BHK_2: Number(data.bhk2Amount) > 0,
        BHK_3: Number(data.bhk3Amount) > 0,
        BHK_4: Number(data.bhk4Amount) > 0,
      });
    } catch (e) {
      console.error(e);
      toast.error("Failed to load config");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  const setMode = (mode) => {
    setForm(prev => ({ ...prev, calcMode: mode }));

    // If switching to FIXED_BY_BHK and nothing selected, enable 1BHK by default
    if (mode === "FIXED_BY_BHK") {
      const anyEnabled = Object.values(enabledBhk).some(v => v);
      if (!anyEnabled) {
        setEnabledBhk(prev => ({ ...prev, BHK_1: true }));
      }
    }
  };

  const toggleBhk = (key) => {
    setEnabledBhk(prev => {
      const next = { ...prev, [key]: !prev[key] };

      // keep at least one enabled
      const anyEnabled = Object.values(next).some(v => v);
      if (!anyEnabled) {
        toast.error("Select at least one flat type (BHK) for fixed mode");
        return prev;
      }

      return next;
    });
  };

  const save = async () => {
    try {
      // Basic validations
      if (!form.dueDay || Number(form.dueDay) < 1 || Number(form.dueDay) > 31) {
        toast.error("Due Day must be between 1 and 31");
        return;
      }

      if (Number(form.overdueGraceDays) < 0 || Number(form.overdueGraceDays) > 60) {
        toast.error("Overdue Grace Days must be between 0 and 60");
        return;
      }

      if (Number(form.overdueExtraAmount) < 0) {
        toast.error("Late Fee cannot be negative");
        return;
      }

      // Build payload based on mode
      let payload = {
        calcMode: form.calcMode,
        dueDay: Number(form.dueDay),
        overdueGraceDays: Number(form.overdueGraceDays),
        overdueExtraAmount: Number(form.overdueExtraAmount),
      };

      if (form.calcMode === "PER_SQFT") {
        if (!form.ratePerSqft || Number(form.ratePerSqft) <= 0) {
          toast.error("Rate per Sq Ft must be greater than 0");
          return;
        }

        payload.ratePerSqft = Number(form.ratePerSqft);

      } else {
        // FIXED_BY_BHK
        // For any disabled BHK, send 0 so backend deletes it
        const bhk1 = enabledBhk.BHK_1 ? Number(form.bhk1Amount) : 0;
        const bhk2 = enabledBhk.BHK_2 ? Number(form.bhk2Amount) : 0;
        const bhk3 = enabledBhk.BHK_3 ? Number(form.bhk3Amount) : 0;
        const bhk4 = enabledBhk.BHK_4 ? Number(form.bhk4Amount) : 0;

        const anyEnabled = Object.values(enabledBhk).some(v => v);
        if (!anyEnabled) {
          toast.error("Select at least one BHK type");
          return;
        }

        // Validate enabled ones must be >0
        if (enabledBhk.BHK_1 && (!bhk1 || bhk1 <= 0)) { toast.error("Enter valid amount for 1BHK"); return; }
        if (enabledBhk.BHK_2 && (!bhk2 || bhk2 <= 0)) { toast.error("Enter valid amount for 2BHK"); return; }
        if (enabledBhk.BHK_3 && (!bhk3 || bhk3 <= 0)) { toast.error("Enter valid amount for 3BHK"); return; }
        if (enabledBhk.BHK_4 && (!bhk4 || bhk4 <= 0)) { toast.error("Enter valid amount for 4BHK"); return; }

        payload.bhk1Amount = bhk1;
        payload.bhk2Amount = bhk2;
        payload.bhk3Amount = bhk3;
        payload.bhk4Amount = bhk4;

        // ratePerSqft not needed in fixed mode; backend will set it to 0 anyway
      }

      await api.post("/api/admin/maintenance-config", payload);
      toast.success("Settings saved");
      await loadConfig();
    } catch (e) {
      console.error(e);
      toast.error(e?.response?.data?.message || "Save failed");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

return (
  <DashboardLayout>
    <div className="maintenance-container">
      <h2>Maintenance Settings</h2>

      <p style={{ marginBottom: 16, opacity: 0.85 }}>
        Set how monthly maintenance should be calculated. Bills will be generated only using the selected method.
      </p>

      <div className="ms-card">
        {/* ================= METHOD SELECTION ================= */}
        <div className="ms-methods">
          <p className="ms-methods-title">1) Choose Calculation Method</p>
          <div className="ms-methods-sub">
            Select one method. You can switch later anytime.
          </div>

          <div className="ms-method-grid">
            {/* PER SQFT */}
            <div
              className={`ms-method-card ${form.calcMode === "PER_SQFT" ? "active-sqft" : ""}`}
              onClick={() => setMode("PER_SQFT")}
              role="button"
              tabIndex={0}
            >
              <div className="ms-method-row">
                <input
                  type="radio"
                  name="calcMode"
                  checked={form.calcMode === "PER_SQFT"}
                  onChange={() => setMode("PER_SQFT")}
                />
                <div>
                  <div className="ms-method-title">Per Sq Ft (Area based)</div>
                  <div className="ms-method-desc">
                    Best when each flat has different area.<br />
                    <b>Formula:</b> Area × Rate (₹/sqft)
                  </div>
                </div>
              </div>
            </div>

            {/* FIXED BY BHK */}
            <div
              className={`ms-method-card ${form.calcMode === "FIXED_BY_BHK" ? "active-bhk" : ""}`}
              onClick={() => setMode("FIXED_BY_BHK")}
              role="button"
              tabIndex={0}
            >
              <div className="ms-method-row">
                <input
                  type="radio"
                  name="calcMode"
                  checked={form.calcMode === "FIXED_BY_BHK"}
                  onChange={() => setMode("FIXED_BY_BHK")}
                />
                <div>
                  <div className="ms-method-title">Fixed Amount (by Flat Type)</div>
                  <div className="ms-method-desc">
                    Best when society wants same bill per flat type.<br />
                    Example: 1BHK=₹2000, 2BHK=₹2500
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CONFIG ================= */}
        <div className="ms-config">
          <p className="ms-config-title">2) Configure Settings</p>
          <div className="ms-config-sub">
            Fill details below for the selected method.
          </div>

          {/* PER SQFT CONFIG */}
          {form.calcMode === "PER_SQFT" && (
            <div className="ms-grid">
              <div className="ms-field">
                <label>Maintenance Rate (₹ per sq ft)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={form.ratePerSqft}
                  onChange={(e) => setForm({ ...form, ratePerSqft: Number(e.target.value) })}
                  placeholder="Example: 3"
                />
                <small>Bill Amount = Flat Area × Rate</small>
              </div>
            </div>
          )}

          {/* FIXED BY BHK CONFIG */}
          {form.calcMode === "FIXED_BY_BHK" && (
            <>
              <div style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 800 }}>Enable Flat Types & Set Amount</div>
                <small style={{ opacity: 0.75 }}>
                  Enable only the flat types available in your society. Disabled types will be removed.
                </small>
              </div>

              <div className="ms-bhk">
                <div className="ms-bhk-head">Enable</div>
                <div className="ms-bhk-head">Type</div>
                <div className="ms-bhk-head">Amount (₹)</div>

                {/* 1BHK */}
                <input type="checkbox" checked={enabledBhk.BHK_1} onChange={() => toggleBhk("BHK_1")} />
                <div className="ms-bhk-type">1 BHK</div>
                <input
                  className="ms-bhk-amt"
                  type="number"
                  min="0"
                  placeholder="e.g. 2000"
                  value={form.bhk1Amount}
                  disabled={!enabledBhk.BHK_1}
                  onChange={(e) => setForm({ ...form, bhk1Amount: e.target.value })}
                />

                {/* 2BHK */}
                <input type="checkbox" checked={enabledBhk.BHK_2} onChange={() => toggleBhk("BHK_2")} />
                <div className="ms-bhk-type">2 BHK</div>
                <input
                  className="ms-bhk-amt"
                  type="number"
                  min="0"
                  placeholder="e.g. 2500"
                  value={form.bhk2Amount}
                  disabled={!enabledBhk.BHK_2}
                  onChange={(e) => setForm({ ...form, bhk2Amount: e.target.value })}
                />

                {/* 3BHK */}
                <input type="checkbox" checked={enabledBhk.BHK_3} onChange={() => toggleBhk("BHK_3")} />
                <div className="ms-bhk-type">3 BHK</div>
                <input
                  className="ms-bhk-amt"
                  type="number"
                  min="0"
                  placeholder="e.g. 3000"
                  value={form.bhk3Amount}
                  disabled={!enabledBhk.BHK_3}
                  onChange={(e) => setForm({ ...form, bhk3Amount: e.target.value })}
                />

                {/* 4BHK */}
                <input type="checkbox" checked={enabledBhk.BHK_4} onChange={() => toggleBhk("BHK_4")} />
                <div className="ms-bhk-type">4 BHK</div>
                <input
                  className="ms-bhk-amt"
                  type="number"
                  min="0"
                  placeholder="e.g. 3500"
                  value={form.bhk4Amount}
                  disabled={!enabledBhk.BHK_4}
                  onChange={(e) => setForm({ ...form, bhk4Amount: e.target.value })}
                />
              </div>
            </>
          )}

          {/* COMMON CONFIG - always */}
          <div className="ms-grid" style={{ marginTop: 14 }}>
            <div className="ms-field">
              <label>Due Day of the Month</label>
              <input
                type="number"
                min="1"
                max="31"
                value={form.dueDay}
                onChange={(e) => setForm({ ...form, dueDay: e.target.value })}
                placeholder="Example: 28"
              />
              <small>If month has fewer days, last day of that month is used.</small>
            </div>

            <div className="ms-field">
              <label>Overdue Grace Days (after due date)</label>
              <input
                type="number"
                min="0"
                max="60"
                value={form.overdueGraceDays}
                onChange={(e) => setForm({ ...form, overdueGraceDays: e.target.value })}
                placeholder="Example: 5"
              />
              <small>Overdue date = Due Date + Grace Days</small>
            </div>

            <div className="ms-field">
              <label>Late Fee After Overdue Date (₹)</label>
              <input
                type="number"
                min="0"
                step="1"
                value={form.overdueExtraAmount}
                onChange={(e) => setForm({ ...form, overdueExtraAmount: e.target.value })}
                placeholder="Example: 200"
              />
              <small>Keep 0 if you don’t want late fee.</small>
            </div>
          </div>

          <div className="ms-actions">
            <button className="btn success" onClick={save}>
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

}
