import api from "./api";

export const getSubscriptions = () =>
  api.get("/subscriptions/");