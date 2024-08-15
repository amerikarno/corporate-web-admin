import BlankPage from "@/pages/blankPages/blankPage";
import { Outlet, Route } from "react-router-dom";

export const reportsRoutes = () => {
  return (
    <Route path="reports" element={<Outlet />}>
      <Route
        index
        element={<BlankPage name="customer-proxy-wallet-deposit" />}
      />
      <Route
        path="customer-proxy-wallet-deposit"
        element={<BlankPage name="customer-proxy-wallet-deposit" />}
      />
      <Route
        path="customer-whitelist-wallet-withdraw"
        element={<BlankPage name="customer-whitelist-wallet-withdraw" />}
      />
      <Route
        path="digital-asset-outstanding-by-customer"
        element={<BlankPage name="digital-asset-outstanding-by-customer" />}
      />
      <Route
        path="digital-asset-movement-by-customer"
        element={<BlankPage name="digital-asset-movement-by-customer" />}
      />
      <Route
        path="digital-asset-movement-by-coin"
        element={<BlankPage name="digital-asset-movement-by-coin" />}
      />
      <Route
        path="digital-asset-outstanding-by-coin"
        element={<BlankPage name="digital-asset-outstanding-by-coin" />}
      />
      <Route
        path="digital-asset-balance-by-coin"
        element={<BlankPage name="digital-asset-balance-by-coin" />}
      />
      <Route path="gas-api" element={<BlankPage name="gas-api" />} />
      <Route
        path="customer-summary-gas-report"
        element={<BlankPage name="customer-summary-gas-report" />}
      />
      <Route
        path="report-gas-transfer"
        element={<BlankPage name="report-gas-transfer" />}
      />
      <Route
        path="summary-gas-report"
        element={<BlankPage name="summary-gas-report" />}
      />
      <Route
        path="summary-customer-wallet"
        element={<BlankPage name="summary-customer-wallet" />}
      />
      <Route
        path="cold-wallet-by-exchange"
        element={<BlankPage name="cold-wallet-by-exchange" />}
      />
      <Route
        path="summary-corporate-wallet"
        element={<BlankPage name="summary-corporate-wallet" />}
      />
      <Route
        path="cash-settlement"
        element={<BlankPage name="cash-settlement" />}
      />
      <Route
        path="coin-settlement"
        element={<BlankPage name="coin-settlement" />}
      />
      <Route
        path="transaction-log-by-exchange"
        element={<BlankPage name="transaction-log-by-exchange" />}
      />
      <Route
        path="report-adjust-coin-cause-re-balance-cold-hot"
        element={
          <BlankPage name="report-adjust-coin-cause-re-balance-cold-hot" />
        }
      />
      <Route
        path="report-for-segregate-airdrop"
        element={<BlankPage name="report-for-segregate-airdrop" />}
      />
      <Route path="nc-report" element={<BlankPage name="nc-report" />} />
      <Route path="sec-report" element={<BlankPage name="sec-report" />} />
      <Route
        path="customer-data-report"
        element={<BlankPage name="customer-data-report" />}
      />
      <Route
        path="confirmation-report"
        element={<BlankPage name="confirmation-report" />}
      />
      <Route
        path="daily-deposit-cash-summary-by-bank-report"
        element={<BlankPage name="daily-deposit-cash-summary-by-bank-report" />}
      />
      <Route
        path="daily-pending-deposit-summary-by-transaction-date-report"
        element={
          <BlankPage name="daily-pending-deposit-summary-by-transaction-date-report" />
        }
      />
      <Route
        path="daily-withdrawal-cash-summary-by-transaction-date-report"
        element={
          <BlankPage name="daily-withdrawal-cash-summary-by-transaction-date-report" />
        }
      />
      <Route
        path="daily-segregation-for-cash-balance-type-report"
        element={
          <BlankPage name="daily-segregation-for-cash-balance-type-report" />
        }
      />
      <Route
        path="daily-total-segregation-report"
        element={<BlankPage name="daily-total-segregation-report" />}
      />
      <Route
        path="summary-digital-asset-fee"
        element={<BlankPage name="summary-digital-asset-fee" />}
      />
      <Route
        path="daily-fiat-pre-fund-and-outstanding"
        element={<BlankPage name="daily-fiat-pre-fund-and-outstanding" />}
      />
      <Route
        path="daily-summary-cold-corporate-wallet-with-custodian"
        element={
          <BlankPage name="daily-summary-cold-corporate-wallet-with-custodian" />
        }
      />
      <Route
        path="summary-cash-settlement-with-counterparties"
        element={
          <BlankPage name="summary-cash-settlement-with-counterparties" />
        }
      />
      <Route
        path="export-loging-order"
        element={<BlankPage name="export-loging-order" />}
      />
      <Route
        path="customer-most-active-by-value"
        element={<BlankPage name="customer-most-active-by-value" />}
      />
      <Route
        path="order-register"
        element={<BlankPage name="order-register" />}
      />
      <Route
        path="foreign-exchange-average-and-spread-log"
        element={<BlankPage name="foreign-exchange-average-and-spread-log" />}
      />
      <Route path="da-deposit" element={<BlankPage name="da-deposit" />} />
    </Route>
  );
};
