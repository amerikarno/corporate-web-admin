import { Helmet } from "react-helmet";
import LoginForm from "./loginForm";

function login() {
  return (
    <>
      <Helmet>
        <html dir="ltr" className="h-full"></html>
        {/* <body className="authentication-page"></body> */}
      </Helmet>
      <main className="w-screen h-screen flex items-center ">
        <section className="mx-auto w-1/3 rounded-xl max-w-lg border-primary border-2 py-10 px-5">
          <div className="divide-y divide-solid divide-gray-400 space-y-10">
            <h1 className="text-center font-bold text-3xl text-secondary">FDA Corporate Admin</h1>
            <div className=" pt-10">

            <LoginForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default login;
