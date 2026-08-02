import api from "./api";

export const getMembers = () => api.get("/members/");
export const getPlans = () => api.get("/plans/");
export const getSubscriptions = () => api.get("/subscriptions/");
export const getPayments = () => api.get("/payments/");
export const getAttendance = () => api.get("/attendance/");