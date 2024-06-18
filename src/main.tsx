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

const helmetContext = {};

const container: HTMLElement | null = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <>
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route index element={<Login />} />

            {RouteData.map((idx) => (
              <Fragment key={Math.random()}>
                {/* //Main page */}
                <Route path={`${import.meta.env.BASE_URL}`} element={<App />}>
                  <Route path={idx.path} element={idx.element} />
                </Route>
                {/* Authentication */}

                <Route
                  path={`${import.meta.env.BASE_URL}`}
                  element={<Authenticationlayout />}
                >
                  <Route path="*" element={<Error404 />} />
                  <Route
                    path={`${
                      import.meta.env.BASE_URL
                    }Authentication/errorpage/error404`}
                    element={<Error404 />}
                  />
                </Route>
              </Fragment>
            ))}
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>
  </>
);
