import axios from "axios";

const API_URL = "http://localhost:8000"; // your FastAPI backend URL

const api = axios.create({
  baseURL: API_URL,
});

// Attach token to requests if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
