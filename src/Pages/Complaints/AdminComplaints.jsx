// import { useEffect, useState } from "react";
// import DashboardLayout from "../../layouts/DashboardLayout";
// import Card from "../../Components/Card";
// import { toast } from "react-toastify";
// import api from "../../api/axios";
// import "./Complaints.css";

// export default function AdminComplaints() {
//   const [complaints, setComplaints] = useState([]);
//   const [filterStatus, setFilterStatus] = useState("all");

//   const STATUS_OPTIONS = ["all", "OPEN", "RESOLVED", "CLOSED", "IN_PROGRESS", "REJECTED"];

//   useEffect(() => {
//     loadComplaints();
//   }, []);

//   const loadComplaints = async () => {
//     try {
//       const res = await api.get("/complaints/admin/all"); // admin sees all complaints
//       console.log("Admin complaints:", res.data);
//       setComplaints(res.data || []);
//     } catch (err) {
//       toast.error("Failed to load complaints");
//       console.error(err);
//     }
//   };

//   const handleStatusChange = async (complaintId, status) => {
//     try {
//       await api.put(`/complaints/${complaintId}/status`, { status });
//       toast.success("Complaint status updated");
//       loadComplaints();
//     } catch (err) {
//       toast.error("Failed to update status");
//       console.error(err);
//     }
//   };

//   const filteredComplaints =
//     filterStatus === "all"
//       ? complaints
//       : complaints.filter((c) => c.status === filterStatus);

//   const formatDate = (dateString) => {
//     if (!dateString) return "Unknown date";
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   return (
//     <DashboardLayout>
//       <div className="complaints-page">
//         <h1 className="page-title">Complaints</h1>

//         <div className="filter-tabs">
//           {STATUS_OPTIONS.map((status) => (
//             <button
//               key={status}
//               className={`filter-tab ${filterStatus === status ? "active" : ""}`}
//               onClick={() => setFilterStatus(status)}
//             >
//               {status === "all"
//                 ? "All"
//                 : status.replace("_", " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
//             </button>
//           ))}
//         </div>

//         {filteredComplaints.length === 0 ? (
//           <Card className="empty-state-card">
//             <p>No complaints found</p>
//           </Card>
//         ) : (
//           <div className="complaints-list">
//             {filteredComplaints.map((c) => (
//               <Card key={c.complaintId} className="complaint-card">
//                 <div className="complaint-header">
//                   <h3>{c.complaintType}</h3>
//                   <span className={`status ${c.status.toLowerCase()}`}>
//                     {c.status.replace("_", " ")}
//                   </span>

//                   {c.status === "OPEN" && (
//                     <button
//                       className="resolve-btn"
//                       onClick={() => handleStatusChange(c.complaintId, "RESOLVED")}
//                     >
//                       Mark Resolved
//                     </button>
//                   )}
//                 </div>

//                 <p>{c.description}</p>

//                 <div className="complaint-footer">
//                   <span>Filed on: {formatDate(c.dateFiled)}</span>
//                   {c.dateResolved && <span>Resolved on: {formatDate(c.dateResolved)}</span>}
//                 </div>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// }


import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import Card from "../../Components/Card";
import { toast } from "react-toastify";
import api from "../../api/axios";
import "./Complaints.css";

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");

  const STATUS_OPTIONS = [
    "all",
    "OPEN",
    "IN_PROGRESS",
    "RESOLVED",
    "CLOSED",
    "REJECTED",
  ];

  // 🔥 Priority order (OPEN always first)
  const STATUS_PRIORITY = {
    OPEN: 1,
    IN_PROGRESS: 2,
    RESOLVED: 3,
    CLOSED: 4,
    REJECTED: 5,
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const res = await api.get("/complaints/admin/all");
      setComplaints(res.data || []);
    } catch (err) {
      toast.error("Failed to load complaints");
      console.error(err);
    }
  };

  const handleStatusChange = async (complaintId, status) => {
    try {
      await api.put(`/complaints/${complaintId}/status`, { status });
      toast.success("Complaint status updated");
      loadComplaints();
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    }
  };

  // ✅ FILTER + SORT
  const filteredComplaints =
    filterStatus === "all"
      ? [...complaints].sort((a, b) => {
          const statusDiff =
            (STATUS_PRIORITY[a.status] || 99) -
            (STATUS_PRIORITY[b.status] || 99);

          // same status → latest first
          if (statusDiff !== 0) return statusDiff;

          return new Date(b.dateFiled) - new Date(a.dateFiled);
        })
      : complaints.filter((c) => c.status === filterStatus);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <DashboardLayout>
      <div className="complaints-page">
        <h1 className="page-title">Complaints</h1>

        {/* ================= FILTER TABS ================= */}
        <div className="filter-tabs">
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              className={`filter-tab ${
                filterStatus === status ? "active" : ""
              }`}
              onClick={() => setFilterStatus(status)}
            >
              {status === "all"
                ? "All"
                : status
                    .replace("_", " ")
                    .toLowerCase()
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>

        {/* ================= COMPLAINT LIST ================= */}
        {filteredComplaints.length === 0 ? (
          <Card className="empty-state-card">
            <p>No complaints found</p>
          </Card>
        ) : (
          <div className="complaints-list">
            {filteredComplaints.map((c) => (
              <Card key={c.complaintId} className="complaint-card">
                <div className="complaint-header">
                  <h3>{c.complaintType}</h3>

                  <span className={`status ${c.status.toLowerCase()}`}>
                    {c.status.replace("_", " ")}
                  </span>

                  {c.status === "OPEN" && (
                    <button
                      className="resolve-btn"
                      onClick={() =>
                        handleStatusChange(c.complaintId, "RESOLVED")
                      }
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>

                <p>{c.description}</p>

                <div className="complaint-footer">
                  <span>
                    Filed on: {formatDate(c.dateFiled)}
                  </span>

                  {c.dateResolved && (
                    <span>
                      Resolved on: {formatDate(c.dateResolved)}
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
