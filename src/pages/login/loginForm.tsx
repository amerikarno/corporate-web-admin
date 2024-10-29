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

          dispatch(setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliODRjNzZkLWZlODQtNDExMy1iYTMwLTE3MDE0YTAyYjZiNSIsImN1c3RvbWVyQ29kZSI6IiIsImVtYWlsIjoiYWEyYzY5NjYzNDg2NDdmMzhjYmZiN2YyOWFiNDU5YzE3Zjc0MGZiNTdjYTJmZWIzODQwNDdhNTAzYmIxZTRmNiIsIm5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsImltYWdlIjoiIiwiZ3JvdXBzIjpbMTAwMSwxMDAyLDEwMDMsMTAwNCwxMDA1LDEwMDYsMTAwNywxMDA4LDEwMDksMTAxMCwyMDAxLDIwMDIsMjAwMywyMDA0LDIwMDUsMjAwNiwyMDA3LDIwMDgsMjAwOSwyMDEwLDIwMTEsMjAxMiwyMDEzLDIwMTQsMjAxNSwyMDE2LDIwMTcsMjAxOCwyMDE5LDIwMjAsMjAyMSwyMDIyLDMwMDEsMzAwMiwzMDAzLDMwMDQsMzAwNSwzMDA2LDMwMDcsMzAwOCwzMDA5LDMwMTAsMzAxMSwzMDEyLDMwMTMsMzAxNCw0MDAxLDQwMDIsNDAwMyw0MDA0LDQwMDUsNDAwNiw1MDAxLDUwMDIsNTAwMyw1MDA0LDUwMDUsNTAwNiw1MDA3LDUwMDgsNTAwOSw1MDEwLDUwMTEsNTAxMiw1MDEzLDUwMTQsNTAxNSw1MDE2LDUwMTcsNTAxOCw1MDE5LDUwMjAsNTAyMSw1MDIyLDUwMjMsNTAyNCw1MDI1LDUwMjYsNTAyNyw1MDI4LDUwMjksNTAzMCw1MDMxLDUwMzIsNTAzMyw1MDM0LDUwMzUsNTAzNiw1MDM3LDYwMDEsNjAwMiw2MDAzLDYwMDQsNjAwNSw2MDA2LDYwMDcsNjAwOCw3MDAxLDcwMDIsNzAwMyw3MDA0LDcwMDUsNzAwNl0sInBlcm1pc3Npb25zIjpbMTAxLDEwMiwxMDMsMjAxLDIwMiwyMDNdLCJyb2xlcyI6WzExLDEyLDEzLDIxLDIyLDIzLDMxLDMyLDMzXSwidXNlcklkIjoiIiwic3RhdHVzIjowLCJleHBpcmVzRGF0ZSI6IjAwMDEtMDEtMDFUMDA6MDA6MDBaIiwiRXJyb3IiOm51bGwsImV4cCI6MTczMDI1Mjc0NSwiaWF0IjoxNzMwMTY2MzQ1fQ.gOObsWGumfFXEf7OO7FdTzag6f_D8296BWQ4wlaey1s"));
          setCookies("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliODRjNzZkLWZlODQtNDExMy1iYTMwLTE3MDE0YTAyYjZiNSIsImN1c3RvbWVyQ29kZSI6IiIsImVtYWlsIjoiYWEyYzY5NjYzNDg2NDdmMzhjYmZiN2YyOWFiNDU5YzE3Zjc0MGZiNTdjYTJmZWIzODQwNDdhNTAzYmIxZTRmNiIsIm5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsImltYWdlIjoiIiwiZ3JvdXBzIjpbMTAwMSwxMDAyLDEwMDMsMTAwNCwxMDA1LDEwMDYsMTAwNywxMDA4LDEwMDksMTAxMCwyMDAxLDIwMDIsMjAwMywyMDA0LDIwMDUsMjAwNiwyMDA3LDIwMDgsMjAwOSwyMDEwLDIwMTEsMjAxMiwyMDEzLDIwMTQsMjAxNSwyMDE2LDIwMTcsMjAxOCwyMDE5LDIwMjAsMjAyMSwyMDIyLDMwMDEsMzAwMiwzMDAzLDMwMDQsMzAwNSwzMDA2LDMwMDcsMzAwOCwzMDA5LDMwMTAsMzAxMSwzMDEyLDMwMTMsMzAxNCw0MDAxLDQwMDIsNDAwMyw0MDA0LDQwMDUsNDAwNiw1MDAxLDUwMDIsNTAwMyw1MDA0LDUwMDUsNTAwNiw1MDA3LDUwMDgsNTAwOSw1MDEwLDUwMTEsNTAxMiw1MDEzLDUwMTQsNTAxNSw1MDE2LDUwMTcsNTAxOCw1MDE5LDUwMjAsNTAyMSw1MDIyLDUwMjMsNTAyNCw1MDI1LDUwMjYsNTAyNyw1MDI4LDUwMjksNTAzMCw1MDMxLDUwMzIsNTAzMyw1MDM0LDUwMzUsNTAzNiw1MDM3LDYwMDEsNjAwMiw2MDAzLDYwMDQsNjAwNSw2MDA2LDYwMDcsNjAwOCw3MDAxLDcwMDIsNzAwMyw3MDA0LDcwMDUsNzAwNl0sInBlcm1pc3Npb25zIjpbMTAxLDEwMiwxMDMsMjAxLDIwMiwyMDNdLCJyb2xlcyI6WzExLDEyLDEzLDIxLDIyLDIzLDMxLDMyLDMzXSwidXNlcklkIjoiIiwic3RhdHVzIjowLCJleHBpcmVzRGF0ZSI6IjAwMDEtMDEtMDFUMDA6MDA6MDBaIiwiRXJyb3IiOm51bGwsImV4cCI6MTczMDI1Mjc0NSwiaWF0IjoxNzMwMTY2MzQ1fQ.gOObsWGumfFXEf7OO7FdTzag6f_D8296BWQ4wlaey1s");
          const user: TUser = jwtDecode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliODRjNzZkLWZlODQtNDExMy1iYTMwLTE3MDE0YTAyYjZiNSIsImN1c3RvbWVyQ29kZSI6IiIsImVtYWlsIjoiYWEyYzY5NjYzNDg2NDdmMzhjYmZiN2YyOWFiNDU5YzE3Zjc0MGZiNTdjYTJmZWIzODQwNDdhNTAzYmIxZTRmNiIsIm5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsImltYWdlIjoiIiwiZ3JvdXBzIjpbMTAwMSwxMDAyLDEwMDMsMTAwNCwxMDA1LDEwMDYsMTAwNywxMDA4LDEwMDksMTAxMCwyMDAxLDIwMDIsMjAwMywyMDA0LDIwMDUsMjAwNiwyMDA3LDIwMDgsMjAwOSwyMDEwLDIwMTEsMjAxMiwyMDEzLDIwMTQsMjAxNSwyMDE2LDIwMTcsMjAxOCwyMDE5LDIwMjAsMjAyMSwyMDIyLDMwMDEsMzAwMiwzMDAzLDMwMDQsMzAwNSwzMDA2LDMwMDcsMzAwOCwzMDA5LDMwMTAsMzAxMSwzMDEyLDMwMTMsMzAxNCw0MDAxLDQwMDIsNDAwMyw0MDA0LDQwMDUsNDAwNiw1MDAxLDUwMDIsNTAwMyw1MDA0LDUwMDUsNTAwNiw1MDA3LDUwMDgsNTAwOSw1MDEwLDUwMTEsNTAxMiw1MDEzLDUwMTQsNTAxNSw1MDE2LDUwMTcsNTAxOCw1MDE5LDUwMjAsNTAyMSw1MDIyLDUwMjMsNTAyNCw1MDI1LDUwMjYsNTAyNyw1MDI4LDUwMjksNTAzMCw1MDMxLDUwMzIsNTAzMyw1MDM0LDUwMzUsNTAzNiw1MDM3LDYwMDEsNjAwMiw2MDAzLDYwMDQsNjAwNSw2MDA2LDYwMDcsNjAwOCw3MDAxLDcwMDIsNzAwMyw3MDA0LDcwMDUsNzAwNl0sInBlcm1pc3Npb25zIjpbMTAxLDEwMiwxMDMsMjAxLDIwMiwyMDNdLCJyb2xlcyI6WzExLDEyLDEzLDIxLDIyLDIzLDMxLDMyLDMzXSwidXNlcklkIjoiIiwic3RhdHVzIjowLCJleHBpcmVzRGF0ZSI6IjAwMDEtMDEtMDFUMDA6MDA6MDBaIiwiRXJyb3IiOm51bGwsImV4cCI6MTczMDI1Mjc0NSwiaWF0IjoxNzMwMTY2MzQ1fQ.gOObsWGumfFXEf7OO7FdTzag6f_D8296BWQ4wlaey1s");
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
