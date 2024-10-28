import BlankPage from "@/pages/blankPages/blankPage";
import TransactionList from "@/pages/todoList/orderTrade/transactionList";
import TodoCorporateAccountOpenning from "@/pages/todoList/corporateAccountOpening/corporateAccountOpening";
import TodoIndividualAccount from "@/pages/todoList/addIndividualAccount/ToDoIndividualAccount";
import EditCorporateAccount from "@/pages/todoList/corporateAccountOpening/edit/editCorporateAccount";
import { Route, Outlet } from "react-router-dom";
import EditPageAddIndividualAccount from "@/pages/todoList/addIndividualAccount/EditPageAddIndividualAccount";
import BankTransactionList from "@/pages/todoList/bankTransactionList/bankTransactionList";
import FxExchangeTransactionList from "@/pages/todoList/fxExchange/fxExchangeTransaction";
import AccountApproval from "@/pages/todoList/accountApproval/AccountApproval";
import ToDoAddedIcoSearch from "@/pages/todoList/toDoIcoAccount/ToDoAddedIcoSearch";
import ToDoPageAddedIco from "@/pages/todoList/toDoIcoAccount/PageToDoAddedIco";
import AccountLockUnLock from "@/pages/todoList/toDoLockUnLockAccount/AccountLockUnLock";

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
      <Route path="individual-account-opening" element={<Outlet />}>
        <Route index element={<TodoIndividualAccount />} />
        <Route path="edit" element={<Outlet />}>
          <Route index element={<EditPageAddIndividualAccount />} />
          <Route path=":page" element={<EditPageAddIndividualAccount />} />
        </Route>
      </Route>
      <Route path="added-ico" element={<Outlet />}>
        <Route index element={<ToDoAddedIcoSearch />} />
        <Route path="edit" element={<Outlet />}>
          <Route index element={<ToDoPageAddedIco />} />
          <Route path=":page" element={<ToDoPageAddedIco />} />
        </Route>
      </Route>
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
      <Route path="account-approval" element={<AccountApproval />} />
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
        path="cash-deposit-withdraw"
        element={<BankTransactionList />}
        // element={<BlankPage name="cash deposit/withdraw transaction is developing"/>}
      />
      <Route path="account-lockunlock" element={<AccountLockUnLock/>} />
      <Route path="fx-exchange" element={<FxExchangeTransactionList />} />
    </Route>
  );
};
