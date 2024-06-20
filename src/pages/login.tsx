import { Helmet } from "react-helmet";
import LoginForm from "./loginForm";

function login() {

  

 
  return (
    <>
      <Helmet>
        <html dir="ltr" className="h-full"></html>
        <body className="authentication-page"></body>
      </Helmet>
      <main className="w-2/3">
        <div className="mt-7 bg-white rounded-sm shadow-sm dark:bg-bgdark">
          <div className="p-4 sm:p-7 ">
            <div className="text-center">
              <h1 className=" text-2xl font-bold text-gray-800 dark:text-white">
                Sign in
              </h1>
            </div>

            <div className="mt-5">
              <LoginForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default login;
