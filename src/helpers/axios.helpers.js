import axios from "axios";

export const configHeadersImage = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

export const configHeaders = {
  headers: {
    "content-type": "application/json",
    auth: JSON.parse(sessionStorage.getItem("token")) || "",
  },
};

const clientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_URL_BACK}/api`,
});

clientAxios.interceptors.request.use((config) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  if (token && !config.headers.auth) {
    config.headers.auth = token;
  }
  return config;
});

export default clientAxios;
