import { useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import "./EditNoticeModal.css";

export default function EditNoticeModal({ notice, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: notice.title,
    description: notice.description,
  });
  const [loading, setLoading] = useState(false);

  const save = async () => {
    if (!form.title || !form.description) {
      toast.error("Title and description are required");
      return;
    }

    try {
      setLoading(true);
      await api.put(`/api/notices/${notice.noticeId}`, form);
      toast.success("Notice updated");
      onSaved(); // reload notices
      onClose();
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Edit Notice</h3>

        <label>Title</label>
        <input
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <label>Description</label>
        <textarea
          value={form.description}
          onChange={e =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <div className="modal-actions">
          <button onClick={save} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button onClick={onClose} disabled={loading}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
