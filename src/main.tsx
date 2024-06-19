import { Fragment } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.scss";
import { RouteData } from "./common/routingdata";
import { HelmetProvider } from "react-helmet-async";

import App from "./layout/App";

import Authenticationlayout from "./layout/authenticationlayout";

import Error404 from "./component/Authentication/errorpage/error404/error404";

import ScrollToTop from "./ScrollToTop/ScrolltoTop";
import Login from "./pages/login";
import React from "react";
import Layout from "./component/Layout";

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
      <HelmetProvider context={helmetContext}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>
  </>
);
