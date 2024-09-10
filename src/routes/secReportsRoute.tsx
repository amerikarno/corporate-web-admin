import Reports from "@/pages/secReports/reports/reports";
import { Outlet, Route } from "react-router-dom";

export const secReportRoutes = () => {
  return (
    <Route path="sec-reports" element={<Outlet />}>
      <Route index element={<Reports />} />
      <Route path="reports" element={<Reports />} />
    </Route>
  );
};
