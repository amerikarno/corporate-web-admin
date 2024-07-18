import { Outlet } from "react-router-dom";
import Header from "./header/header";
import Sidebar from "./sidebar/sideBar";
import Footer from "./footer/footer";

const Layout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="mt-[60px] sm:ml-[270px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
