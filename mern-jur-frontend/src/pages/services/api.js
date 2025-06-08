import axios from "axios";

const URL = "http://localhost:4444";

export const api = axios.create({
    baseURL: URL,
    headers: {
        "Content-Type": "application/json"
    }
})
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});