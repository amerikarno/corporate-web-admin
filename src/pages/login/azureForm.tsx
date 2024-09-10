import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { setCookies } from "@/lib/Cookies";
import { setToken } from "@/features/authen/authenSlice";
import { useDispatch } from "react-redux";
import { setUser, TUser } from "@/features/user/userSlice";
import { jwtDecode } from "jwt-decode";
import { clearCorporateData } from "@/features/editCorporateData/editCorporateData";

const AzureForm: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // ดึง access_token จาก URL query parameters
    const query = new URLSearchParams(location.search);
    const token = query.get("access_token");

    if (token) {
      console.log("Token:", token);
      setAccessToken(token);
    }
  }, [location.search]);

  const mockLogin = async () => {
    const hashedUsername =
      "f0179dd3d8f5f85dd303326911320bd3f985ac4cb89d6b3a44b30f0f36249a75";
    const hashedPassword =
      "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8";

    api
      .post(
        "/api/v1/authen/login",
        {
          hashedUsername: `${hashedUsername}`,
          hashedPassword: `${hashedPassword}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(setToken(res.data.accessToken));
        setCookies(res.data.accessToken);
        const user: TUser = jwtDecode(res.data.accessToken);
        localStorage.clear();
        dispatch(clearCorporateData());
        dispatch(setUser(user));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = async () => {
    // mockLogin();

    // window.location.href = "http://localhost/api/v1/authen/login/azure";
    try {
      const res = await api.post(
        "/api/v1/authen/login/azure",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   // ตรวจสอบว่ามีโทเค็นใน URL หลังจากการ redirect กลับมาหรือไม่
  //   const query = new URLSearchParams(window.location.search);
  //   const token = query.get("access_token");

  //   if (token) {
  //     setAccessToken(token);
  //     console.log("Token:", token);
  //   }
  // }, []);

  useEffect(() => {
    if (accessToken) {
      // ดึงข้อมูลผู้ใช้จาก Microsoft Graph API โดยใช้โทเค็น
      console.log("Access Token:", accessToken);
      axios
        .get("https://graph.microsoft.com/v1.0/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log("User Data:", response.data);
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [accessToken]);

  return (
    <div className="space-y-4 py-10">
      <h1 className="text-xl text-center">Microsoft Azure OAuth2 Login</h1>
      {!accessToken ? (
        // <button onClick={handleLogin}>Login with Microsoft</button>
        <>
          {/* <Input label="Email" onChange={handleAzure} /> */}
          <Button className="w-full" onClick={handleLogin}>
            Login with Microsoft
          </Button>
        </>
      ) : (
        <div>
          <h2>User Info</h2>
          {userData ? (
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AzureForm;
