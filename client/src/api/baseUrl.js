import axios from "axios";

const baseUrl = process.env.NODE_ENV === "development"
  ? "http://localhost:8080/api/v1"
  : "";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true
});

export default axiosInstance;
