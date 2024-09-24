import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const AzureForm: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    // ดึง access_token จาก URL query parameters
    const query = new URLSearchParams(location.search);
    const token = query.get("access_token");

    if (token) {
      console.log("Token:", token);
      setAccessToken(token);
    }
  }, [location.search]);

  const handleLogin = async () => {
    try {
      const res = await api.get("/api/v1/authen/login/azure", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    // window.location.href = "http://localhost:1323/api/v1/authen/login/azure";
    window.location.href = `${window.origin}/api/v1/authen/login/azure`;
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
