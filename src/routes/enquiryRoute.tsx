import BlankPage from "@/pages/blankPages/blankPage";
import { Route, Outlet } from "react-router-dom";

export const enquireRoutes = () => {
  return (
    <Route path="enquiry" element={<Outlet />}>
      <Route index element={<BlankPage name="Deposit/Withdraw List" />} />
      <Route
        path="deposit-withdraw-list"
        element={<BlankPage name="Deposit/Withdraw List" />}
      />
      <Route
        path="enquiry-application"
        element={<BlankPage name="Enquiry Application" />}
      />
      <Route
        path="cutomer-detail"
        element={<BlankPage name="Cutomer Detail" />}
      />
      <Route
        path="deposit-cash-summary"
        element={<BlankPage name="Deposit Cash Summary" />}
      />
      <Route
        path="withdraw-cash-summary"
        element={<BlankPage name="Withdraw Cash Summary" />}
      />
      <Route
        path="cash-balance-statement"
        element={<BlankPage name="Cash Balance Statement" />}
      />
    </Route>
  );
};
