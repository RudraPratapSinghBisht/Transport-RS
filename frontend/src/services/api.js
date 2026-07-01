import axios from "axios";

const configuredApiUrl =
  import.meta.env.VITE_API_URL?.trim();

const normalizedApiUrl = configuredApiUrl
  ? configuredApiUrl.replace(/\/$/, "")
  : "/api";

export const API_BASE_URL =
  normalizedApiUrl.endsWith("/api")
    ? normalizedApiUrl
    : `${normalizedApiUrl}/api`;

export const apiUrl = (path = "") => {
  const cleanPath = String(path).replace(/^\/+/, "");

  return cleanPath
    ? `${API_BASE_URL}/${cleanPath}`
    : API_BASE_URL;
};

const API = axios.create({
  baseURL: API_BASE_URL,
});

export default API;
