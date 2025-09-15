import axios from "axios";
import config from "../../config";

const AxiosWithToken = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach the token
AxiosWithToken.interceptors.request.use(
  (config) => {
    // Retrieve the token dynamically
    const token = localStorage.getItem("token");

    if (process.env.NODE_ENV === "development") {
      console.log("Token in Request:", token);
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration or other errors

AxiosWithToken.interceptors.response.use(
  (response) => response,
  async (error) => {
    const publicRoutes = ["/login", "/"];
    const isPublicRoute = publicRoutes.includes(window.location.pathname);

    if (error.response?.status === 401 && !isPublicRoute) {
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default AxiosWithToken;
