import BlankPage from "@/pages/blankPages/blankPage";
import Login from "@/pages/login/login";
import { Navigate, Outlet, Route } from "react-router-dom";

export const customerRoutes = () => {
  return (
    <Route path="customer" element={<Outlet />}>
      <Route index element={<Navigate to="login" />} />
      <Route path="login" element={<Login />} />
      <Route path="da" element={<BlankPage name="da" />} />
      <Route path="balance" element={<BlankPage name="balance" />} />
      <Route
        path="deposit-withdraw-da"
        element={<BlankPage name="deposit-withdraw-da" />}
      />
      <Route
        path="deposit-withdraw-cash"
        element={<BlankPage name="deposit-withdraw-cash" />}
      />
      <Route
        path="google-authenticator"
        element={<BlankPage name="google-authenticator" />}
      />
    </Route>
  );
};
