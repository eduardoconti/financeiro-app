import axios from "axios";
import { getToken } from "./Auth";

const api = axios.create({
  baseURL: "http://localhost:3001/",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
