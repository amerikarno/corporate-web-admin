import React from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/features/authen/authenSlice";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const decode = token ? jwtDecode(token) : null;
  if (decode) {
    const expire = decode.exp ? decode.exp : 0;
    if (expire < Date.now() / 1000) {
      console.log("expired");
      axios
        .get("http://localhost:1323/api/v1/authen/refresh", {
          withCredentials: true,
        })
        .then((res) => {
          console.log("response", res);
          sessionStorage.setItem("token", res.data.accessToken);
          dispatch(setAccessToken(res.data.accessToken));
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
