import axios from "axios";
import { getCookie } from "./cookies";

const axiosInstance = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("login");
  console.log(token)
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config
});

export default axiosInstance;