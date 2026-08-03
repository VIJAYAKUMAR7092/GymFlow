import api from "./api";

export const getPendingUsers = () =>
  api.get("/auth/pending-users/");

export const approveUser = (id) =>
  api.post(`/auth/approve/${id}/`);

export const rejectUser = (id) =>
  api.delete(`/auth/reject/${id}/`);