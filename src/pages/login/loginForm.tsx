import React, { useRef, useState } from "react";
import Input from "../../components/Input";
import CryptoJs from "crypto-js";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const LoginForm = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userRef.current && passwordRef.current) {
      const user = userRef.current?.value;
      const password = passwordRef.current?.value;
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
          setAccessToken(res.data.accessToken);
          console.log(res);
        })
        .catch((err) => {
          setError(err.message);
        });
      console.log(accessToken);
      if (accessToken) {
        const decoded = jwtDecode(accessToken);
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
          <Input title="Email" name="email" ref={userRef} />
          <Input title="Password" name="password" ref={passwordRef} />
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
