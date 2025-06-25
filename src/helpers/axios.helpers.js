import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("token")) || null;

const clientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_URL_BACK_LOCAL}/api`,
});

export const configHeaders = {

  headers: {
    "content-type": "application/json",
    auth: `${token}`,
  },
};
export const configHeadersImage = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

export default clientAxios;
