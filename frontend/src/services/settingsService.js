import api from "./api";

export const getSettings = () => api.get("/settings/");

export const createSettings = (data) =>
  api.post("/settings/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateSettings = (id, data) =>
  api.put(`/settings/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });