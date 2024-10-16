import NcReports from "@/pages/ncReports/NcReports";
import BusWallet from "@/pages/secReports/reports/busWallet";
import CusData from "@/pages/secReports/reports/cusData";
import CusIdentification from "@/pages/secReports/reports/cusIdentification";
import CusOutStanding from "@/pages/secReports/reports/cusOutStanding";
import CusWallet from "@/pages/secReports/reports/CusWallet";
import Dtw from "@/pages/secReports/reports/Dtw";
import OrderBook from "@/pages/secReports/reports/OrderBook";
import PartnerExProfile from "@/pages/secReports/reports/PartnerExProfile";
import ProfileListing from "@/pages/secReports/reports/ProfileListing";
import Reports from "@/pages/secReports/reports/reports";
import TradeBook from "@/pages/secReports/reports/TradeBook";
import { Outlet, Route } from "react-router-dom";

export const secReportRoutes = () => {
  return (
    <Route path="reports" element={<Outlet />}>
      <Route path="sec-reports" element={<Outlet />}>
        <Route index element={<Reports />} />
        <Route path="BusWallet" element={<BusWallet />} />
        <Route path="CusData" element={<CusData/>}/>
        <Route path="CusIdentification" element={<CusIdentification />} />
        <Route path="CusOutstanding" element={<CusOutStanding />} />
        <Route path="CusWallet" element={<CusWallet />} />
        <Route path="DTW" element={<Dtw />} />
        <Route path="Orderbook" element={<OrderBook />} />
        <Route path="PartnerExProfile" element={<PartnerExProfile />} />
        <Route path="ProfileListing" element={<ProfileListing />} />
        <Route path="Tradebook" element={<TradeBook />} />
      </Route>
      <Route path="nc-reports" element={<NcReports />} />
    </Route>
  );
};
