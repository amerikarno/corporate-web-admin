import axios from "axios";
import { log } from "console";
// import log from "@/log/log";

let BASE_URL = import.meta.env.BASE_URL
// log.info("BASE_URL", BASE_URL)
log("BASE_URL", BASE_URL)
if (BASE_URL) {
  BASE_URL = "http://cwa-api-alb-400970075.eu-north-1.elb.amazonaws.com";
  // BASE_URL = "http://localhost:1323";
}

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
