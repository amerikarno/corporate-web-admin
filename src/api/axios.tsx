import axios from "axios";
// const BASE_URL = import.meta.env.VITE_BASE_URL;
let BASE_URL = process.env.BASE_URL
if (BASE_URL) {
  BASE_URL = "http://localhost:1323";
}

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
