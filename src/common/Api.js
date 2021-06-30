import axios from "axios";
import { getToken } from "./Auth";

const api = axios.create({
  baseURL: "https://controle-financeiro-efc.herokuapp.com/",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(token);
  }

  return config;
});

export default api;
