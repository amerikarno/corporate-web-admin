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
import Login from "@/pages/login/login";
import Layout from "@/components/Layout";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import BlankPage from "./pages/blankPages/blankPage";
import CorporateAccountOpenning from "./pages/corporateAccountOpening/CorporateAccountOpenning";
import TodoCorporateAccountOpenning from "./pages/todoList/corporateAccountOpening/corporateAccountOpening";
import { EditCorporateAccount } from "./pages/todoList/corporateAccountOpening/edit/editCorporateAccount";
import OrderTrade from "./pages/corporateAccountOpening/pages/orderTrade/orderTrade";
import TransactionList from "./pages/corporateAccountOpening/pages/transactionList/transactionList";
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
                    <Navigate
                      to="/create-job/added-corporate-account"
                      replace
                    />
                  }
                />
                <Route path="create-job" element={<Outlet />}>
                  <Route path="added-corporate-account" element={<Outlet />}>
                    <Route index element={<CorporateAccountOpenning />} />
                    <Route
                      path=":page"
                      element={<CorporateAccountOpenning />}
                    />
                  </Route>
                  <Route path="order-trade" element={<Outlet />}>
                    <Route index element={<OrderTrade />}/>
                    <Route path="transaction-list" element={<TransactionList />}/>
                  </Route>
                </Route>
                <Route path="todo-list" element={<Outlet />}>
                  <Route index element={<TodoCorporateAccountOpenning />} />
                  <Route path="corporate-account-opening" element={<Outlet />}>
                    <Route index element={<TodoCorporateAccountOpenning />} />
                    <Route path="edit" element={<Outlet />}>
                      <Route index element={<EditCorporateAccount />} />
                      <Route path=":page" element={<EditCorporateAccount />} />
                    </Route>
                  </Route>
                </Route>
                <Route path="blankPages" element={<BlankPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      </Provider>
    </React.StrictMode>
  </>
);
