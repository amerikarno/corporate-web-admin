import { Input } from "@/components/ui/input";
import CryptoJs from "crypto-js";
// import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "@/features/authen/authenSlice";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { setCookies } from "@/lib/Cookies";
import api from "@/api/axios";
import { setUser, TUser, setEmail } from "@/features/user/userSlice";
import { clearCorporateData } from "@/features/editCorporateData/editCorporateData";
import AzureForm from "./azureForm";

const LoginForm = () => {
  const token = useSelector((state: any) => state.authen.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      dispatch(setEmail(data.email));
      const hashedUsername = CryptoJs.SHA256(data.email).toString();
      const hashedPassword = CryptoJs.SHA256(data.password).toString();
      // const hashedUsername = "c9a7055009a52c43e656cf1ad258589c957696714be89968f65274dcb0d60e41";
      // const hashedPassword = "741f67765bef6f01f37bf5cb1724509a83409324efa6ad2586d27f4e3edea296";
      console.log(hashedUsername);
      console.log(hashedPassword);

      api
        .post(
          // "http://localhost:1323/admin/v1/login",
          "/api/v1/authen/login",
          {
            hashedUsername: `${hashedUsername}`,
            hashedPassword: `${hashedPassword}`,
          },
          // {
          //   hashedUsername:data.email,
          //   hashedPassword:data.password,
          // },
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
          setError("root", { message: err.message });
          dispatch(setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE2M2U2YTA3LWJkN2QtNDUzZC05ZjU3LWM3Y2E4ZDdlMzRiYSIsImN1c3RvbWVyQ29kZSI6IiIsImVtYWlsIjoiZjAxNzlkZDNkOGY1Zjg1ZGQzMDMzMjY5MTEzMjBiZDNmOTg1YWM0Y2I4OWQ2YjNhNDRiMzBmMGYzNjI0OWE3NSIsIm5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsImltYWdlIjoiIiwiZ3JvdXBzIjpbMjAwMSwyMDAyLDIwMDMsMjAwNCwyMDA1LDIwMDYsMjAwNywyMDA4LDIwMDksMjAxMCwyMDExLDIwMTIsMjAxMywyMDE0LDIwMTUsMjAxNiwyMDE3LDIwMTgsMjAxOSwyMDIwLDIwMjEsMjAyMiwzMDAxLDMwMDIsMzAwMywzMDA0LDMwMDUsMzAwNiwzMDA3LDMwMDgsMzAwOSwzMDEwLDMwMTEsMzAxMiwzMDEzLDMwMTQsNDAwMSw0MDAyLDQwMDMsNDAwNCw0MDA1LDQwMDYsNTAwMSw1MDAyLDUwMDMsNTAwNCw1MDA1LDUwMDYsNTAwNyw1MDA4LDUwMDksNTAxMCw1MDExLDUwMTIsNTAxMyw1MDE0LDUwMTUsNTAxNiw1MDE3LDUwMTgsNTAxOSw1MDIwLDUwMjEsNTAyMiw1MDIzLDUwMjQsNTAyNSw1MDI2LDUwMjcsNTAyOCw1MDI5LDUwMzAsNTAzMSw1MDMyLDUwMzMsNTAzNCw1MDM1LDUwMzYsNTAzNyw2MDAxLDYwMDIsNjAwMyw2MDA0LDYwMDUsNjAwNiw2MDA3LDYwMDgsNzAwMSw3MDAyLDcwMDMsNzAwNCw3MDA1LDcwMDZdLCJwZXJtaXNzaW9ucyI6WzEwMSwxMDIsMTAzXSwicm9sZXMiOlsxMSwxMiwxMywyMSwyMiwyMywzMSwzMiwzM10sInVzZXJJZCI6IiIsImxvZ2luU3RhdHVzIjoiIiwiZXhwaXJlc0RhdGUiOiIwMDAxLTAxLTAxVDAwOjAwOjAwWiIsIkVycm9yIjpudWxsLCJleHAiOjE3MjkyMTcxOTMsImlhdCI6MTcyOTEzMDc5M30.u3tFqo7yBzQ82fcxoH7J_UzXS6VDNfBR85p5Igv7bkw"));
          setCookies("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE2M2U2YTA3LWJkN2QtNDUzZC05ZjU3LWM3Y2E4ZDdlMzRiYSIsImN1c3RvbWVyQ29kZSI6IiIsImVtYWlsIjoiZjAxNzlkZDNkOGY1Zjg1ZGQzMDMzMjY5MTEzMjBiZDNmOTg1YWM0Y2I4OWQ2YjNhNDRiMzBmMGYzNjI0OWE3NSIsIm5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsImltYWdlIjoiIiwiZ3JvdXBzIjpbMjAwMSwyMDAyLDIwMDMsMjAwNCwyMDA1LDIwMDYsMjAwNywyMDA4LDIwMDksMjAxMCwyMDExLDIwMTIsMjAxMywyMDE0LDIwMTUsMjAxNiwyMDE3LDIwMTgsMjAxOSwyMDIwLDIwMjEsMjAyMiwzMDAxLDMwMDIsMzAwMywzMDA0LDMwMDUsMzAwNiwzMDA3LDMwMDgsMzAwOSwzMDEwLDMwMTEsMzAxMiwzMDEzLDMwMTQsNDAwMSw0MDAyLDQwMDMsNDAwNCw0MDA1LDQwMDYsNTAwMSw1MDAyLDUwMDMsNTAwNCw1MDA1LDUwMDYsNTAwNyw1MDA4LDUwMDksNTAxMCw1MDExLDUwMTIsNTAxMyw1MDE0LDUwMTUsNTAxNiw1MDE3LDUwMTgsNTAxOSw1MDIwLDUwMjEsNTAyMiw1MDIzLDUwMjQsNTAyNSw1MDI2LDUwMjcsNTAyOCw1MDI5LDUwMzAsNTAzMSw1MDMyLDUwMzMsNTAzNCw1MDM1LDUwMzYsNTAzNyw2MDAxLDYwMDIsNjAwMyw2MDA0LDYwMDUsNjAwNiw2MDA3LDYwMDgsNzAwMSw3MDAyLDcwMDMsNzAwNCw3MDA1LDcwMDZdLCJwZXJtaXNzaW9ucyI6WzEwMSwxMDIsMTAzXSwicm9sZXMiOlsxMSwxMiwxMywyMSwyMiwyMywzMSwzMiwzM10sInVzZXJJZCI6IiIsImxvZ2luU3RhdHVzIjoiIiwiZXhwaXJlc0RhdGUiOiIwMDAxLTAxLTAxVDAwOjAwOjAwWiIsIkVycm9yIjpudWxsLCJleHAiOjE3MjkyMTcxOTMsImlhdCI6MTcyOTEzMDc5M30.u3tFqo7yBzQ82fcxoH7J_UzXS6VDNfBR85p5Igv7bkw");
          const user: TUser = jwtDecode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE2M2U2YTA3LWJkN2QtNDUzZC05ZjU3LWM3Y2E4ZDdlMzRiYSIsImN1c3RvbWVyQ29kZSI6IiIsImVtYWlsIjoiZjAxNzlkZDNkOGY1Zjg1ZGQzMDMzMjY5MTEzMjBiZDNmOTg1YWM0Y2I4OWQ2YjNhNDRiMzBmMGYzNjI0OWE3NSIsIm5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsImltYWdlIjoiIiwiZ3JvdXBzIjpbMjAwMSwyMDAyLDIwMDMsMjAwNCwyMDA1LDIwMDYsMjAwNywyMDA4LDIwMDksMjAxMCwyMDExLDIwMTIsMjAxMywyMDE0LDIwMTUsMjAxNiwyMDE3LDIwMTgsMjAxOSwyMDIwLDIwMjEsMjAyMiwzMDAxLDMwMDIsMzAwMywzMDA0LDMwMDUsMzAwNiwzMDA3LDMwMDgsMzAwOSwzMDEwLDMwMTEsMzAxMiwzMDEzLDMwMTQsNDAwMSw0MDAyLDQwMDMsNDAwNCw0MDA1LDQwMDYsNTAwMSw1MDAyLDUwMDMsNTAwNCw1MDA1LDUwMDYsNTAwNyw1MDA4LDUwMDksNTAxMCw1MDExLDUwMTIsNTAxMyw1MDE0LDUwMTUsNTAxNiw1MDE3LDUwMTgsNTAxOSw1MDIwLDUwMjEsNTAyMiw1MDIzLDUwMjQsNTAyNSw1MDI2LDUwMjcsNTAyOCw1MDI5LDUwMzAsNTAzMSw1MDMyLDUwMzMsNTAzNCw1MDM1LDUwMzYsNTAzNyw2MDAxLDYwMDIsNjAwMyw2MDA0LDYwMDUsNjAwNiw2MDA3LDYwMDgsNzAwMSw3MDAyLDcwMDMsNzAwNCw3MDA1LDcwMDZdLCJwZXJtaXNzaW9ucyI6WzEwMSwxMDIsMTAzXSwicm9sZXMiOlsxMSwxMiwxMywyMSwyMiwyMywzMSwzMiwzM10sInVzZXJJZCI6IiIsImxvZ2luU3RhdHVzIjoiIiwiZXhwaXJlc0RhdGUiOiIwMDAxLTAxLTAxVDAwOjAwOjAwWiIsIkVycm9yIjpudWxsLCJleHAiOjE3MjkyMTcxOTMsImlhdCI6MTcyOTEzMDc5M30.u3tFqo7yBzQ82fcxoH7J_UzXS6VDNfBR85p5Igv7bkw");
          localStorage.clear();
          dispatch(clearCorporateData());
          dispatch(setUser(user));
          navigate("/");
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
      <AzureForm />
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
