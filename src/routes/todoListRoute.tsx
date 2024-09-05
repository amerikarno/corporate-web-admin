import BlankPage from "@/pages/blankPages/blankPage";
import TransactionList from "@/pages/todoList/orderTrade/transactionList";
import TodoCorporateAccountOpenning from "@/pages/todoList/corporateAccountOpening/corporateAccountOpening";
import { EditCorporateAccount } from "@/pages/todoList/corporateAccountOpening/edit/editCorporateAccount";
import { Route, Outlet } from "react-router-dom";

export const todoListRoutes = () => {
  return (
    <Route path="todo-list" element={<Outlet />}>
      <Route index element={<TodoCorporateAccountOpenning />} />
      <Route path="corporate-account-opening" element={<Outlet />}>
        <Route index element={<TodoCorporateAccountOpenning />} />
        <Route path="edit" element={<Outlet />}>
          <Route index element={<EditCorporateAccount />} />
          <Route path=":page" element={<EditCorporateAccount />} />
        </Route>
      </Route>
      <Route
        path="individual-account-opening"
        element={<BlankPage name="Individual Account Opening" />}
      />
      <Route
        path="whitelist-bank"
        element={<BlankPage name="Whitelist (Bank)" />}
      />
      <Route path="change-info" element={<BlankPage name="Change Info" />} />
      <Route path="review-kyb" element={<BlankPage name="Review KYB" />} />
      <Route path="review-kyc" element={<BlankPage name="Review KYC" />} />
      <Route
        path="change-risk-and-edd"
        element={<BlankPage name="Change Risk and EDD" />}
      />
      <Route
        path="str-monitoring"
        element={<BlankPage name="STR Monitoring" />}
      />
      <Route path="lock-unlock" element={<BlankPage name="Lock Unlock" />} />
      <Route path="deposit-cash" element={<BlankPage name="Deposit Cash" />} />
      <Route
        path="withdraw-cash"
        element={<BlankPage name="Withdraw Cash" />}
      />
      <Route path="da-withdraw" element={<BlankPage name="DA Withdraw" />} />
      <Route
        path="fx-rate-approve"
        element={<BlankPage name="FX Rate Approve" />}
      />
      <Route path="orders-trades" element={<TransactionList />} />
      <Route
        path="bank-deposite-withdraw"
        element={<BlankPage name="bank deposite withdraw" />}
      />
    </Route>
  );
};
