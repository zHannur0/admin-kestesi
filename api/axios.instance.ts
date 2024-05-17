import axios from "axios";
import { BASE_URL } from "@/config/config";

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
  withCredentials: false,
});

instance.interceptors.request.use(
  (req) => {
    if (req.params)
      Object.keys(req.params).forEach((key) => {
        if (!req.params[key]) {
          delete req.params[key];
        }
      });

    return req;
  },
  (error) => {
    return Promise.reject(error.response);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    return Promise.reject(error);
  },
);
