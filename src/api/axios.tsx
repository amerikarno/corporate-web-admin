import axios from "axios";
// import { log } from "console";
// import log from "@/log/log";

const BASE_URL = window.origin;
// const BASE_URL = "http://localhost:1323";

console.log("base url:", BASE_URL);

export default axios.create({
  baseURL: BASE_URL,
  // headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
