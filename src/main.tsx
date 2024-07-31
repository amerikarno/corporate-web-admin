// import { createRoot } from "react-dom/client";
// import {
//   BrowserRouter,
//   Navigate,
//   Outlet,
//   Route,
//   Routes,
// } from "react-router-dom";
// import "./style.css";
// import { HelmetProvider } from "react-helmet-async";
// import Login from "./pages/login/login";
// import React from "react";
// import Layout from "./components/Layout";
// import { Provider } from "react-redux";
// import { store } from "./app/store";
// import Welcome from "./pages/Welcome";
// import CreateCorporate from "./pages/corporate/createCorporate";
// import ContactPerson from "./pages/contactperson/contactPerson";
// import { FormTest } from "./pages/test";

// const helmetContext = {};

// const container: HTMLElement | null = document.getElementById("root");
// const root = createRoot(container!);

// /*
//  - disable react dev tools
//  - not set state for password by map specific response data
//  - send data in JWT token, jwt-decode lib
// */
// root.render(
//   <>
//     <React.StrictMode>
//       <Provider store={store}>
//         <HelmetProvider context={helmetContext}>
//           <BrowserRouter>
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route path="/" element={<Layout />}>
//                 <Route index element={<Welcome />} />
//                 <Route path="/corporate" element={<Outlet />}>
//                   <Route index element={<CreateCorporate />} />
//                   <Route path="create" element={<CreateCorporate />} />
//                   <Route path="contactperson" element={<ContactPerson />} />
//                 </Route>
//                 <Route path="/test" element={<FormTest />} />
//               </Route>
//             </Routes>
//           </BrowserRouter>
//         </HelmetProvider>
//       </Provider>
//     </React.StrictMode>
//   </>
// );

import { createRoot } from "react-dom/client";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./style.css";
import { HelmetProvider } from "react-helmet-async";
import Login from "./pages/login/login";
import React from "react";
import Layout from "./components/Layout";
import { Provider } from "react-redux";
import { store } from "./app/store";
// import CreateCorporate from "./pages/corporate/createCorporate";
import BlankPage from "./pages/blankPages/blankPage";
import CorporateAccountOpenning from "./pages/corporateAccountOpenning/CorporateAccountOpenning";
import UploadFiles from "./pages/uploadFiles/uploadFiles";
// import { ProtectedRoute } from "./components/ProtectedRoute";

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
                <Route
                  index
                  element={
                    // <ProtectedRoute>
                    <CorporateAccountOpenning />
                    // </ProtectedRoute>
                  }
                />
                <Route path="create-job" element={<Outlet />}>
                  <Route path="added-corporate-account" element={<Outlet />}>
                    <Route
                      index
                      element={
                        // <ProtectedRoute>
                        <CorporateAccountOpenning />
                        // </ProtectedRoute>
                      }
                    />
                    <Route
                      path=":page"
                      element={
                        // <ProtectedRoute>
                        <CorporateAccountOpenning />
                        // </ProtectedRoute>
                      }
                    />
                  </Route>
                </Route>
                <Route path="blankPages" element={<BlankPage />} />
                <Route path="upload" element={<UploadFiles />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      </Provider>
    </React.StrictMode>
  </>
);
