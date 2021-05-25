import axios from "axios";
import { api } from "./URLConfig";
import { Store } from "../Store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const token = AsyncStorage.setItem("token");

const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `bearer ${token}` : "",
  },
});

axiosInstance.interceptors.request.use((req) => {
  const { auth } = Store.getState();
  if (auth.token) {
    req.headers.Authorization = `bearer ${auth.token}`;
  }
  return req;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const status = error.response ? error.response.status : 500;
    console.error(error)
    return Promise.reject(status);
  }
);

export default axiosInstance;
