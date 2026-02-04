import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// ADMIN
export const getAllMaintenance = () =>
  API.get("/admin/maintenance");

export const approveMaintenance = (id) =>
  API.put(`/admin/maintenance/${id}/approve`);

export const rejectMaintenance = (id) =>
  API.put(`/admin/maintenance/${id}/reject`);

export const createMaintenance = (data) =>
  API.post("/admin/maintenance", data);

// RESIDENT
export const getMaintenanceByFlat = (flatId) =>
  API.get(`/resident/maintenance/flat/${flatId}`);

export const uploadPaymentProof = (id, formData) =>
  API.post(`/resident/maintenance/${id}/upload-proof`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
