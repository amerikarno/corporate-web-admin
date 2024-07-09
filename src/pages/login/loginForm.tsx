import Input from "@/components/Input";
import CryptoJs from "crypto-js";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "@/features/authen/authenSlice";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
  
  const token = useSelector((state: any) => state.authen.accessToken);
  const dispatch = useDispatch();

  const auth = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  type AuthForm = z.infer<typeof auth>;

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
          setError("root", { message: err.message });
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
      <form
        className="flex flex-col space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input {...register("email")} title="Email" name="email" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <Input {...register("password")} title="Password" name="password" />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        <div className=" w-full pt-10">
          <button className="bg-orange-400 rounded-lg py-2 ring-orange-600 w-full ring-1">
            Sign in
          </button>
        </div>
        {errors.root && <p className="text-red-500">{errors.root.message}</p>}
      </form>
    </>
  );
};

export default LoginForm;
