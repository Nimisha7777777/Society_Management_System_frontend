// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import api from "../../api/axios";
// import DashboardLayout from "../../layouts/DashboardLayout";
// import { useAuth } from "../../contexts/AuthContext";
// import "./ManageFlats.css";

// export default function ManageFlats() {
//   const [flats, setFlats] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editingFlat, setEditingFlat] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");


//   const [formData, setFormData] = useState({
//     towerName: "",
//     flatNumber: "",
//     areaSqft: ""
//   });

//   const { user } = useAuth();
//   const societyId = user?.societyId;

//   const fetchFlats = () => {
//     api
//       .get(`/api/flats/society/${societyId}`)
//       .then((res) => setFlats(res.data))
//       .catch(console.error);
//   };

//   useEffect(() => {
//     if (societyId) fetchFlats();
//   }, [societyId]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const payload = {
//       towerName: formData.towerName,
//       flatNumber: formData.flatNumber,
//       areaSqft: Number(formData.areaSqft)
//     };

//     const request = editingFlat
//       ? api.put(`/api/flats/${editingFlat.flatId}`, payload)
//       : api.post(`/api/flats/society/${societyId}`, payload);

//     request
//       .then(() => {
//         fetchFlats();
//         setShowModal(false);
//         setEditingFlat(null);
//         setFormData({ towerName: "", flatNumber: "", areaSqft: "" });
//       })
//       .catch(console.error);
//   };

//   const deleteFlat = (flatId) => {
//     if (!window.confirm("Are you sure you want to delete this flat?")) return;

//     api
//       .delete(`/api/flats/${flatId}`)
//       .then(fetchFlats)
//       .catch(console.error);
//   };


//   const location = useLocation();
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     if (params.get("add") === "true") {
//       setShowModal(true);
//     }
//   }, [location.search]);


//   const openEditModal = (flat) => {
//     setEditingFlat(flat);
//     setFormData({
//       towerName: flat.towerName,
//       flatNumber: flat.flatNumber,
//       areaSqft: flat.areaSqft
//     });
//     setShowModal(true);
//   };

//   const filteredFlats = flats.filter((flat) => {
//     const query = searchTerm.toLowerCase();

//     return (
//       flat.towerName.toLowerCase().includes(query) ||
//       flat.flatNumber.toLowerCase().includes(query) ||
//       flat.status.toLowerCase().includes(query) ||
//       flat.areaSqft.toLowerCase().includes(query)
//     );
//   });
  

//   return (
//     <DashboardLayout>
//       <div className="manage-flats-container">
//         <div className="header">
//           <h1>All Flats</h1>

//           <div className="header-actions">
//             <input
//               type="text"
//               placeholder="Search by tower, flat no, status..."
//               className="search-input"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />

//             <button className="add-flat-btn" onClick={() => setShowModal(true)}>
//               + Add Flat
//             </button>
//           </div>
//         </div>

//         <table className="flats-table">
//           <thead>
//             <tr>
//               <th>Tower</th>
//               <th>Flat No</th>
//               <th>Area (sqft)</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredFlats.length === 0 ? (
//               <tr>
//                 <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
//                   No flats found
//                 </td>
//               </tr>
//             ) : (
//               filteredFlats.map((flat) => (
//                 <tr key={flat.flatId}>
//                   <td>{flat.towerName}</td>
//                   <td>{flat.flatNumber}</td>
//                   <td>{flat.areaSqft}</td>
//                   <td>
//                     <span className={`status ${flat.status?.toLowerCase()}`}>
//                       {flat.status}
//                     </span>
//                   </td>
//                   <td>
//                     <button
//                       className="edit-btn"
//                       disabled={flat.status === "OCCUPIED"}
//                       onClick={() => openEditModal(flat)}
//                     >
//                       Edit
//                     </button>

//                     <button
//                       className="delete-btn"
//                       disabled={flat.status === "OCCUPIED"}
//                       onClick={() => deleteFlat(flat.flatId)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>


//         </table>

//         {/* MODAL */}
//         {showModal && (
//           <div className="modal-overlay">
//             <div className="modal">
//               <h2>{editingFlat ? "Edit Flat" : "Add Flat"}</h2>

//               <form onSubmit={handleSubmit}>
//                 <input
//                   type="text"
//                   name="towerName"
//                   placeholder="Tower Name"
//                   value={formData.towerName}
//                   onChange={handleChange}
//                   required
//                 />

//                 <input
//                   type="text"
//                   name="flatNumber"
//                   placeholder="Flat Number"
//                   value={formData.flatNumber}
//                   onChange={handleChange}
//                   required
//                 />

//                 <input
//                   type="number"
//                   name="areaSqft"
//                   placeholder="Area (sqft)"
//                   value={formData.areaSqft}
//                   onChange={handleChange}
//                   required
//                 />

//                 <div className="modal-actions">
//                   <button
//                     type="button"
//                     className="cancel-btn"
//                     onClick={() => {
//                       setShowModal(false);
//                       setEditingFlat(null);
//                       setFormData({ towerName: "", flatNumber: "", areaSqft: "" });
//                     }}
//                   >
//                     Cancel
//                   </button>

//                   <button type="submit" className="submit-btn">
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// }


import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../contexts/AuthContext";
import "./ManageFlats.css";

export default function ManageFlats() {
  const [flats, setFlats] = useState([]);
  const [filteredFlats, setFilteredFlats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingFlat, setEditingFlat] = useState(null);
  const [searchText, setSearchText] = useState("");

  const [formData, setFormData] = useState({
    towerName: "",
    flatNumber: "",
    areaSqft: ""
  });

  const { user } = useAuth();
  const societyId = user?.societyId;

  const fetchFlats = () => {
    api
      .get(`/api/flats/society/${societyId}`)
      .then((res) => {
        setFlats(res.data);
        setFilteredFlats(res.data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (societyId) fetchFlats();
  }, [societyId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      towerName: formData.towerName,
      flatNumber: formData.flatNumber,
      areaSqft: Number(formData.areaSqft)
    };

    const request = editingFlat
      ? api.put(`/api/flats/${editingFlat.flatId}`, payload)
      : api.post(`/api/flats/society/${societyId}`, payload);

    request
      .then(() => {
        fetchFlats();
        setShowModal(false);
        setEditingFlat(null);
        setFormData({ towerName: "", flatNumber: "", areaSqft: "" });
      })
      .catch(console.error);
  };

  const deleteFlat = (flatId) => {
    if (!window.confirm("Are you sure you want to delete this flat?")) return;

    api
      .delete(`/api/flats/${flatId}`)
      .then(fetchFlats)
      .catch(console.error);
  };

  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("add") === "true") setShowModal(true);
  }, [location.search]);

  const openEditModal = (flat) => {
    setEditingFlat(flat);
    setFormData({
      towerName: flat.towerName,
      flatNumber: flat.flatNumber,
      areaSqft: flat.areaSqft
    });
    setShowModal(true);
  };

  // ================= SEARCH / FILTER =================
  useEffect(() => {
    const filtered = flats.filter((flat) => {
      const text = searchText.toLowerCase();
      return (
        flat.towerName.toLowerCase().includes(text) ||
        flat.flatNumber.toLowerCase().includes(text) ||
        flat.areaSqft.toString().includes(text) ||
        flat.status.toLowerCase().includes(text)
      );
    });
    setFilteredFlats(filtered);
  }, [searchText, flats]);

  return (
    <DashboardLayout>
      <div className="manage-flats-container">
        <div className="header">
          <h1>All Flats</h1>
          <button className="add-flat-btn" onClick={() => setShowModal(true)}>
            + Add Flat
          </button>
        </div>

        {/* ================= SEARCH BAR ================= */}
        <input
          type="text"
          placeholder="Search by tower, flat number, area, status..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />

        <table className="flats-table">
          <thead>
            <tr>
              <th>Tower</th>
              <th>Flat No</th>
              <th>Area (sqft)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredFlats.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "16px" }}>
                  No flats found
                </td>
              </tr>
            ) : (
              filteredFlats.map((flat) => (
                <tr key={flat.flatId}>
                  <td>{flat.towerName}</td>
                  <td>{flat.flatNumber}</td>
                  <td>{flat.areaSqft}</td>
                  <td>
                    <span className={`status ${flat.status?.toLowerCase()}`}>
                      {flat.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      disabled={flat.status === "OCCUPIED"}
                      onClick={() => openEditModal(flat)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      disabled={flat.status === "OCCUPIED"}
                      onClick={() => deleteFlat(flat.flatId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* ================= MODAL ================= */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{editingFlat ? "Edit Flat" : "Add Flat"}</h2>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="towerName"
                  placeholder="Tower Name"
                  value={formData.towerName}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="flatNumber"
                  placeholder="Flat Number"
                  value={formData.flatNumber}
                  onChange={handleChange}
                  required
                />

                <input
                  type="number"
                  name="areaSqft"
                  placeholder="Area (sqft)"
                  value={formData.areaSqft}
                  onChange={handleChange}
                  required
                />

                <div className="modal-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setShowModal(false);
                      setEditingFlat(null);
                      setFormData({ towerName: "", flatNumber: "", areaSqft: "" });
                    }}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="submit-btn">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
