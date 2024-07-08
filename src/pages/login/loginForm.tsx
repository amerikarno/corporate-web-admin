import React, { useRef, useState } from "react";
import Input from "@/components/Input";
import CryptoJs from "crypto-js";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "@/features/authen/authenSlice";
const LoginForm = () => {
  const [error, setError] = useState(null);
  const token = useSelector((state: any) => state.authen.accessToken);
  const dispatch = useDispatch();
  // const [accessToken, setAccessToken] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  type auth = {
    email: string;
    password: string;
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & auth;
    if (target.email && target.password) {
      const user = target.email;
      const password = target.password;
      const hashedUsername = CryptoJs.SHA256(user).toString();
      const hashedPassword = CryptoJs.SHA256(password).toString();
      console.log(hashedUsername);
      console.log(hashedPassword);

      axios
        .post(
          "http://localhost:1323/admin/v2/login",
          {
            hashedUsername: `${hashedUsername}`,
            hashedPassword: `${hashedPassword}`,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          dispatch(setToken(res.data.token));
        })
        .catch((err) => {
          setError(err.message);
        });
      console.log(token);
      if (token) {
        const decoded = jwtDecode(token);
        console.log(decoded);
      }
    }
  };
  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
          <Input title="Email" name="email" />
          <Input title="Password" name="password" />
          <div className=" w-full pt-10">
            <button className="bg-orange-400 rounded-lg py-2 ring-orange-600 w-full ring-1">
              Sign in
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default LoginForm;
