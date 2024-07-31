import React from "react";
import { jwtDecode } from "jwt-decode";
// import axios from "axios";
import axios from "@/api/axios";
import { useDispatch } from "react-redux";
import { setToken } from "@/features/authen/authenSlice";
import { useNavigate } from "react-router-dom";
import { getCookies, setCookies } from "@/lib/Cookies";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // const token = sessionStorage.getItem("token");
  const token = getCookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const decode = token && token !== null ? jwtDecode(token) : null;
  if (decode !== null) {
    const expire = decode.exp ? decode.exp : 0;
    if (expire < Date.now() / 1000) {
      console.log("expired");
      axios
        .get("/api/v1/authen/refresh", {
          // .get("http://localhost:1323/api/v1/authen/refresh", {
          withCredentials: true,
        })
        .then((res) => {
          console.log("response", res);
          // sessionStorage.setItem("token", res.data.accessToken);
          // setCookies(res.data.accessToken);
          // dispatch(setToken(res.data.accessToken));
          setCookies(res.data.token);
          dispatch(setToken(res.data.token));
        })
        .catch((err) => {
          console.log("root", { message: err.message });
          return navigate("/login");
        })
        .finally(() => {
          console.log("decode:", decode);
          console.log("cookieValue:", token);
        });
    }
    return children;
  }
};
