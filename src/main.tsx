import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import "./style.css";
import { HelmetProvider } from "react-helmet-async";
import Login from "./pages/login/login";
import Layout from "./components/Layout";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import CorporateAccountOpenning from "./pages/corporateAccountOpening/CorporateAccountOpenning";
import { customerRoutes } from "./routes/customerRoutes";
import { thirdPartyRoutes } from "./routes/thirdPartyRoute";
import { reportsRoutes } from "./routes/reportRoute";
import { systemManagementRoutes } from "./routes/systemManagementRoute";
import { createJobRoutes } from "./routes/createJobRoute";
import { todoListRoutes } from "./routes/todoListRoute";
import { enquireRoutes } from "./routes/enquiryRoute";
const helmetContext = {};

const container: HTMLElement | null = document.getElementById("root");
const root = createRoot(container!);

/*
 - disable react dev tools
 - not set state for password by map specific response data
 - send data in JWT token, jwt-decode lib
*/
root.render(
  <>
    <React.StrictMode>
      <Provider store={store}>
        <HelmetProvider context={helmetContext}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<CorporateAccountOpenning />} />
                {systemManagementRoutes()}
                {createJobRoutes()}
                {todoListRoutes()}
                {enquireRoutes()}
                {reportsRoutes()}
                {thirdPartyRoutes()}
                {customerRoutes()}
              </Route>
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      </Provider>
    </React.StrictMode>
  </>
);
