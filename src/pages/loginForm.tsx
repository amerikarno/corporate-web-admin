import React, { useRef } from "react";
import Input from "../component/Input";
import CryptoJs from "crypto-js";
const LoginForm = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userRef.current && passwordRef.current) {
      const user = userRef.current?.value;
      const password = passwordRef.current?.value;
      const hashedUsername = CryptoJs.SHA256(user).toString();
      const hashedPassword = CryptoJs.SHA256(password).toString();
      console.log(hashedUsername);
      console.log(hashedPassword);
    }
  };
  return (
    <>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <Input title="Email" name="email" ref={userRef} />
        <Input title="Password" name="password" ref={passwordRef} />
        <button>Sign in</button>
      </form>
    </>
  );
};

export default LoginForm;
