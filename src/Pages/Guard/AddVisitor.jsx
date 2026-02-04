import { useState } from "react";
import GuardLayout from "../../layouts/GuardLayout";
import api from "../../api/axios";
import { toast } from "react-toastify";
import "./AddVisitor.css";

export default function AddVisitor() {
  const [visitorName, setVisitorName] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState("FRIEND");

  const [hasVehicle, setHasVehicle] = useState(false);
  const [vehicleType, setVehicleType] = useState("TWO_WHEELER");
  const [vehicleNumber, setVehicleNumber] = useState("");

  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!visitorName.trim() || !phone.trim()) {
      toast.error("Visitor name and phone are required");
      return;
    }

    if (hasVehicle && !vehicleNumber.trim()) {
      toast.error("Vehicle number is required");
      return;
    }

    const payload = {
      visitorName,
      phone,
      purpose,
      hasVehicle,
      vehicleType: hasVehicle ? vehicleType : null,
      vehicleNumber: hasVehicle ? vehicleNumber : null
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    if (photo) formData.append("photo", photo);

    try {
      setLoading(true);
      await api.post("/api/visitors/add", formData);
      toast.success("Visitor added successfully");

      // reset
      setVisitorName("");
      setPhone("");
      setPurpose("FRIEND");
      setHasVehicle(false);
      setVehicleNumber("");
      setPhoto(null);
    } catch {
      toast.error("Failed to add visitor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GuardLayout>
      <div className="add-visitor-page">
        <div className="add-visitor-card">
          <h2>Add Visitor</h2>
          <p className="sub-text">Register visitor entry</p>

          <form onSubmit={handleSubmit}>
            {/* NAME + PHONE */}
            <div className="add-form-row">
              <input
                placeholder="Visitor Name *"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
              />

              <input
                placeholder="Phone Number *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* PURPOSE */}
            <div className="add-form-row">
              <select
                className="add-wide"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              >
                <option value="FRIEND">Friend</option>
                <option value="DELIVERY">Delivery</option>
                <option value="SERVICE">Service</option>
                <option value="CAB">Cab</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            {/* VEHICLE CHECK */}
            <div className="checkbox-row">
              <input
                type="checkbox"
                checked={hasVehicle}
                onChange={(e) => setHasVehicle(e.target.checked)}
              />
              <span>Visitor has a vehicle</span>
            </div>

            {/* VEHICLE DETAILS */}
            {hasVehicle && (
              <div className="add-form-row">
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  <option value="TWO_WHEELER">Two Wheeler</option>
                  <option value="FOUR_WHEELER">Four Wheeler</option>
                </select>

                <input
                  placeholder="Vehicle Number"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                />
              </div>
            )}

            {/* PHOTO */}
            <div className="file-row">
              <label>Visitor Photo (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>

            {/* SUBMIT */}
            <button className="add-submit" disabled={loading}>
              {loading ? "Adding..." : "Add Visitor"}
            </button>
          </form>
        </div>
      </div>
    </GuardLayout>
  );
}
