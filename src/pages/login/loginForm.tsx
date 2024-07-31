import { Input } from "@/components/ui/input";
import CryptoJs from "crypto-js";
// import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "@/features/authen/authenSlice";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { setCookies } from "@/lib/Cookies";
import axios from "@/api/axios";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  type AuthForm = {
    email: string;
    password: string;
    exp: any;
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AuthForm>({
    resolver: zodResolver(auth),
  });

  const onSubmit: SubmitHandler<AuthForm> = (data) => {
    if (data.email && data.password) {
      const hashedUsername = CryptoJs.SHA256(data.email).toString();
      const hashedPassword = CryptoJs.SHA256(data.password).toString();
      console.log(hashedUsername);
      console.log(hashedPassword);

      axios
        .post(
          // "http://localhost:1323/admin/v2/login",
          "/api/v1/authen/login",
          {
            hashedUsername: `${hashedUsername}`,
            hashedPassword: `${hashedPassword}`,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
          dispatch(setToken(res.data.accessToken));
          setCookies(res.data.accessToken);
          navigate("/");
        })
        .catch((err) => {
          setError("root", { message: err.message });
        })
        .finally(() => {
          navigate("/welcome");
        });

      // const cookie = Cookies.get("refreshToken");
      // console.log("cookie", cookie);
      if (token) {
        const decoded = jwtDecode<jwtPayload>(token);
        console.log("decoded", decoded);
      }
      // navigate("/welcome");
    }
  };

  return (
    <>
      <form
        className="flex flex-col space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          {...register("email")}
          title="Email"
          name="email"
          className="border-gray-900"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <Input
          {...register("password")}
          title="Password"
          name="password"
          className="border-gray-900"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <div className=" w-full pt-10">
          {/* <button className="bg-orange-400 rounded-lg py-2 ring-orange-600 w-full ring-1">
            Sign in
          </button> */}
          <Button className="w-full">Sign in</Button>
        </div>
        {errors.root && <p className="text-red-500">{errors.root.message}</p>}
      </form>
    </>
  );
};

export default LoginForm;
