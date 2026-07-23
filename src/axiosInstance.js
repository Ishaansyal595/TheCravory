import axios from "axios";
import { useSelector } from "react-redux";

export const api = axios.create({
  baseURL: `https://thecravorybackend.onrender.com/api`,
  timeout: 5000,
  withCredentials: true,
});

// Request interceptor to attach the current access token
const admin = JSON.parse(localStorage.getItem("admin"));
api.interceptors.request.use(
  (config) => {
    const token = admin?.admin?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// Request interceptor to 401 error
api.interceptors.request.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.config?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const reponse = await api.post(
          "/refresh",
          {},
          { withCredentials: true },
        );

        const { accessToken } = response?.data;
        localStorage.setItem("accessToken", accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (error) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
