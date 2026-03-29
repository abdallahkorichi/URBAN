import axios from "axios";

const api = axios.create({
  // Use relative '/api' path when deployed, fallback to localhost for local development
  baseURL: import.meta.env.PROD ? "/api" : "http://localhost:5000/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

export const getFileUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  
  // Use relative path in production since the backend serves the files directly
  return import.meta.env.PROD ? `/${cleanPath}` : `http://localhost:5000/${cleanPath}`;
};