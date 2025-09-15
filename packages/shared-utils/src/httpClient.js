import axios from "axios";
import config from "./config";

const HttpClient = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

// Add token-based client
const AuthenticatedHttpClient = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

// Add interceptor for authenticated requests
AuthenticatedHttpClient.interceptors.request.use(
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

export { HttpClient, AuthenticatedHttpClient };