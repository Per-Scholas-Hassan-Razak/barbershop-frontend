import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // pulled from .env
  withCredentials: true, // allows cookies (if you ever use them for auth)
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Attach token automatically if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;