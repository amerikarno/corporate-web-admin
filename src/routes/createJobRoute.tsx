import BlankPage from "@/pages/blankPages/blankPage";
import CorporateAccountOpenning from "@/pages/createJob/addedCorporateAccount/CorporateAccountOpenning";
import BankOrderEdit from "@/pages/createJob/addedCorporateAccount/pages/bankOrder/bankOrder";
import OrderTrade from "@/pages/createJob/orderTrade/orderTrade";
import PageAddIndividualAccount from "@/pages/createJob/addIndividualAccount/PageAddIndividualAccount";
import { Outlet, Route } from "react-router-dom";
import ChangeCorporateAccountOpenning from "@/pages/createJob/changeCorporateAccount/ChangeCorproateAccountOpening";
import EditCorporateAccount from "@/pages/createJob/changeCorporateAccount/CorporateAccountOpenning"
import ChangePageAddIndividualAccount from "@/pages/createJob/changeIndividualAccount/ChangePageAddIndividualAccount";
import ChangeTodoIndividualAccount from "@/pages/createJob/changeIndividualAccount/ToDoIndividualAccount";
import FxExchangeEdit from "@/pages/createJob/fxExchange/fxExchange";
import PageAddedIco from "@/pages/createJob/addedICO/PageAddedIco";
import ChangeIcoAccount from "@/pages/createJob/changeIcoAccount/ChangeAddedIcoSearch";
import ChangePageAddedIco from "@/pages/createJob/changeIcoAccount/PageChangeAddedIco";
export const createJobRoutes = () => {
  return (
    <Route path="create-job" element={<Outlet />}>
      <Route index element={<CorporateAccountOpenning />} />
      <Route path="added-corporate-account" element={<Outlet />}>
        <Route index element={<CorporateAccountOpenning />} />
        <Route path=":page" element={<CorporateAccountOpenning />} />
      </Route>
      <Route path="added-individual-account" element={<Outlet />}>
        <Route index element={<PageAddIndividualAccount />} />
        <Route path=":page" element={<PageAddIndividualAccount />} />
      </Route>
      <Route path="added-ico" element={<Outlet />}>
        <Route index element={<PageAddedIco />} />
        <Route path=":page" element={<PageAddedIco />} />
      </Route>
      <Route path="change-corporate-account" element={<Outlet />}>
        <Route index element={<ChangeCorporateAccountOpenning />} />
        <Route path="edit" element={<Outlet />}>
          <Route index element={<EditCorporateAccount />} />
          <Route path=":page" element={<EditCorporateAccount />} />
        </Route>
      </Route>
      <Route path="change-individual-account" element={<Outlet />}>
        <Route index element={<ChangeTodoIndividualAccount />} />
        <Route path="edit" element={<Outlet />}>
          <Route index element={<ChangePageAddIndividualAccount />} />
          <Route path=":page" element={<ChangePageAddIndividualAccount />} />
        </Route>
      </Route>
      <Route path="change-ico" element={<Outlet />}>
          <Route index element={<ChangeIcoAccount />} />
          <Route path="edit" element={<Outlet />}>
            <Route index element={<ChangePageAddedIco />} />
            <Route path=":page" element={<ChangePageAddedIco />} />
          </Route>
      </Route>
      <Route
        path="bank-deposite-withdraw"
        element={<BlankPage name="Bank deposite/withdraw" />}
      />
      <Route path="special-edd" element={<BlankPage name="Special EDD" />} />
      <Route
        path="adjust-cash-balance"
        element={<BlankPage name="Adjust Cash Balance" />}
      />
      <Route
        path="broker-transfer-fee"
        element={<BlankPage name="Broker Transfer Fee" />}
      />
      <Route
        path="setting-fx-rate"
        element={<BlankPage name="Setting FX Rate" />}
      />
      <Route path="bank-gateway" element={<BlankPage name="Bank Gateway" />} />
      <Route path="coin" element={<BlankPage name="Coin" />} />
      <Route path="coin-listing" element={<BlankPage name="Coin Listing" />} />
      <Route
        path="coin-exchange-pending"
        element={<BlankPage name="Coin Exchange Pending" />}
      />
      <Route
        path="order-engine-control"
        element={<BlankPage name="Order Engine Control" />}
      />
      <Route
        path="exchange-start-stop-control"
        element={<BlankPage name="Exchange Start-Stop Control" />}
      />
      <Route
        path="exchange-config-setting"
        element={<BlankPage name="Exchange Config Setting" />}
      />
      <Route path="packages" element={<BlankPage name="Packages" />} />
      <Route
        path="commission-package-setting"
        element={<BlankPage name="Commission Package Setting" />}
      />
      <Route
        path="customer-commission"
        element={<BlankPage name="Customer Commission" />}
      />
      <Route
        path="penalty-fee-setting"
        element={<BlankPage name="Penalty Fee Setting" />}
      />
      <Route
        path="create-penalty-fee"
        element={<BlankPage name="Create Penalty Fee" />}
      />
      <Route
        path="airdrop-setting"
        element={<BlankPage name="Airdrop Setting" />}
      />
      <Route path="orders-trades" element={<OrderTrade />} />
      <Route path="fx-exchange" element={<FxExchangeEdit/>}/>
      <Route path="cash-deposit-withdraw" element={<BankOrderEdit />} />
      <Route
        path="whitelist-bank"
        element={<BlankPage name="Whitelist (Bank)" />}
      />
      <Route path="change-info" element={<BlankPage name="Change Info" />} />
    </Route>
  );
};
