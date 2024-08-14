// import React from "react";
// import { jwtDecode } from "jwt-decode";
// // import axios from "axios";
// import axios from "@/api/axios";
// import { useDispatch } from "react-redux";
// import { setToken } from "@/features/authen/authenSlice";
// import { useNavigate } from "react-router-dom";
// import { getCookies, setCookies } from "@/lib/Cookies";

// export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   // const token = sessionStorage.getItem("token");
//   const token = getCookies();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const decode = token && token !== null ? jwtDecode(token) : null;
//   if (decode !== null) {
//     const expire = decode.exp ? decode.exp : 0;
//     if (expire !== 0 && expire < Date.now() / 1000) {
//       console.log("expired");
//       axios
//         // .get("/api/v1/authen/refresh", {
//         // //.get("http://localhost:1323/api/v1/authen/refresh", {
//         //   withCredentials: true,
//         // })
//         .post(
//           "/api/v1/authen/refresh",
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//             withCredentials: true,
//           }
//         )
//         .then((res) => {
//           console.log("response refresh", res);
//           // sessionStorage.setItem("token", res.data.accessToken);
//           setCookies(res.data.accessToken);
//           dispatch(setToken(res.data.accessToken));
//           // setCookies(res.data.token);
//           // dispatch(setToken(res.data.token));
//         })
//         .catch((err) => {
//           console.log("root", { message: err.message });
//           return navigate("/login");
//         })
//         .finally(() => {
//           console.log("decode:", decode);
//           console.log("cookieValue:", token);
//         });
//     }
//     return children;
//   }
// };

import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "@/api/axios";
import { useDispatch } from "react-redux";
import { setToken } from "@/features/authen/authenSlice";
import { useNavigate } from "react-router-dom";
import { getCookies, setCookies } from "@/lib/Cookies";
import { LoaderCircle } from "lucide-react";

interface DecodedToken {
  exp?: number;
}

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const token = getCookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      if (token && token !== null) {
        const decode: DecodedToken = jwtDecode(token);
        const expire = decode.exp ? decode.exp : 0;

        if (expire < Date.now() / 1000) {
          console.log("expired");

          try {
            const res = await axios.post(
              "/api/v1/authen/refresh",
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );

            console.log("response refresh", res);
            setCookies(res.data.accessToken);
            dispatch(setToken(res.data.accessToken));
          } catch (err) {
            if (err instanceof Error) {
              console.log("root", { message: err.message });
            } else {
              console.log("root", { message: err });
            }
            navigate("/login");
          }
        }
      }
      setLoading(false);
    };

    checkToken();
  }, [token, dispatch, navigate]);

  if (loading) {
    return (
      <div className="inline-block animate-spin">
        <LoaderCircle />
      </div>
    );
  }

  return <>{children}</>;
};
