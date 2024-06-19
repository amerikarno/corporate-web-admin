import React, { useRef, useState } from "react";
import Input from "../component/Input";
import CryptoJs from "crypto-js";
import axios from "axios";
const LoginForm = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

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
    }
  };
  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <Input title="Email" name="email" ref={userRef} />
          <Input title="Password" name="password" ref={passwordRef} />
          <button>Sign in</button>
        </form>
      )}
    </>
  );
};

export default LoginForm;
