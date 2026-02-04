import { useState } from "react";
import api from "../../api/axios";

export default function UploadPaymentModal({ maintenance, onClose, onUpload }) {
  const [file, setFile] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("transactionId", transactionId);

    setLoading(true);

    api
      .post(
        `/api/resident/maintenance/${maintenance.maintenanceId}/upload-proof`,
        formData
      )
      .then(res => {
        onUpload(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Upload Payment Proof</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Transaction ID:
            <input
              type="text"
              value={transactionId}
              onChange={e => setTransactionId(e.target.value)}
              required
            />
          </label>

          <label>
            File:
            <input
              type="file"
              onChange={e => setFile(e.target.files[0])}
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>

          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
