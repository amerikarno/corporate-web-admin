import BlankPage from "@/pages/blankPages/blankPage";
import CorporateAccountOpenning from "@/pages/createJob/addedCorporateAccount/CorporateAccountOpenning";
import BankOrderEdit from "@/pages/createJob/addedCorporateAccount/pages/bankOrder/bankOrder";
import OrderTrade from "@/pages/createJob/addedCorporateAccount/pages/orderTrade/orderTrade";
import AddIndividualAccount from "@/pages/createJob/addIndividualAccount/addIndividualAccount";
import BasicInfo from "@/pages/createJob/addIndividualAccount/basicInfo/basicInfo";
import IdentityVerification from "@/pages/createJob/addIndividualAccount/identityVerification/identityVerification";
import IDCardCapture from "@/pages/createJob/addIndividualAccount/livenessOcr/cardScan/idCardCapture";
import { CardWebcamInstructions } from "@/pages/createJob/addIndividualAccount/livenessOcr/cardScan/webCamInstructions";
import Liveness from "@/pages/createJob/addIndividualAccount/livenessOcr/livenessOcr";
import PageAddIndividualAccount from "@/pages/createJob/addIndividualAccount/PageAddIndividualAccount";
import SuitTestFatca from "@/pages/createJob/addIndividualAccount/suitTestFatca/suitTestFatca";
import { Outlet, Route } from "react-router-dom";

export const createJobRoutes = () => {
  return (
    <Route path="create-job" element={<Outlet />}>
      <Route index element={<BlankPage name="Added Corporate Account" />} />
      <Route path="added-corporate-account" element={<Outlet />}>
        <Route index element={<CorporateAccountOpenning />} />
        <Route path=":page" element={<CorporateAccountOpenning />} />
      </Route>
      <Route path="added-individual-account" element={<Outlet />}>
        <Route index element={<PageAddIndividualAccount />} />
        <Route path=":page" element={<PageAddIndividualAccount />} />
        {/* <Route path="basicinfo" element={<BasicInfo />} />
        <Route path="suittestfatca" element={<SuitTestFatca />} />
        <Route path="identityVerification" element={<IdentityVerification/>}/>
        <Route path="liveness" element={<Liveness />} />
        <Route path="card-instructions" element={<CardWebcamInstructions />} />
        <Route path="card-capture" element={<IDCardCapture />} /> */}
      </Route>
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
      <Route path="cash-deposit-withdraw" element={<BankOrderEdit />} />
      <Route
        path="whitelist-bank"
        element={<BlankPage name="Whitelist (Bank)" />}
      />
      <Route path="change-info" element={<BlankPage name="Change Info" />} />
    </Route>
  );
};
