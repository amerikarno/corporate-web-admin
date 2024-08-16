import BlankPage from "@/pages/blankPages/blankPage";
import CorporateAccountOpenning from "@/pages/corporateAccountOpening/CorporateAccountOpenning";
import OrderTrade from "@/pages/corporateAccountOpening/pages/orderTrade/orderTrade";
import OrderTradeEdit from "@/pages/corporateAccountOpening/pages/orderTrade/orderTradeEdit";
import { Outlet, Route } from "react-router-dom";

export const createJobRoutes = () => {
  return (
    <Route path="create-job" element={<Outlet />}>
      <Route index element={<BlankPage name="Added Corporate Account" />} />
      <Route path="added-corporate-account" element={<Outlet />}>
        <Route index element={<CorporateAccountOpenning />} />
        <Route path=":page" element={<CorporateAccountOpenning />} />
      </Route>
      <Route
        path="added-individual-account"
        element={<BlankPage name="Added Individual Account" />}
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
      <Route path="orders-trades-edit" element={<OrderTradeEdit />} />
      <Route
        path="whitelist-bank"
        element={<BlankPage name="Whitelist (Bank)" />}
      />
      <Route path="change-info" element={<BlankPage name="Change Info" />} />
    </Route>
  );
};
