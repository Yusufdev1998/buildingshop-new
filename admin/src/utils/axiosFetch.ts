import axios from "axios";
import getUserData from "./getUserData";

const BASE_URL = "http://127.0.0.1:8080/api/v1";

const axiosFetch = axios.create({
  baseURL: BASE_URL,
});

axiosFetch.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${getUserData().token}`;
    return config;
  },
  error => Promise.reject(error)
);

axiosFetch.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 403) {
      location.href = "/login";
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export default axiosFetch;
