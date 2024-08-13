import { Outlet } from "react-router-dom";
import Header from "./header/header";
import Sidebar from "./sidebar/sideBar";
import Footer from "./footer/footer";
import { ProtectedRoute } from "./ProtectedRoute";

const Layout = () => {
  return (
    <>
      <ProtectedRoute>
        <Header />
        <Sidebar />
        {/* <main className="App"> */}
        <main className="mt-[60px] sm:ml-[270px]">
          <Outlet />
        </main>
        <Footer />
      </ProtectedRoute>
    </>
  );
};

export default Layout;
