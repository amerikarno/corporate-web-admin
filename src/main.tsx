import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./style.css";
import { HelmetProvider } from "react-helmet-async";
import Login from "./pages/login/login";
import React from "react";
import Layout from "./components/Layout";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Welcome from "./pages/Welcome";

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
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/login" />} />
                <Route path="login" element={<Login />} />
                <Route path="welcome" element={<Welcome />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      </Provider>
    </React.StrictMode>
  </>
);
