import BlankPage from "@/pages/blankPages/blankPage";
import { Route, Outlet } from "react-router-dom";

export const thirdPartyRoutes = () => {
  return (
    <Route path="3rd-party" element={<Outlet />}>
      <Route index element={<BlankPage name="bank" />} />
      <Route path="bank" element={<BlankPage name="bank" />} />
      <Route path="custodian" element={<BlankPage name="custodian" />} />
      <Route path="cdd" element={<BlankPage name="cdd" />} />
      <Route path="dopa" element={<BlankPage name="dopa" />} />
      <Route path="ndid-thaid" element={<BlankPage name="ndid-thaid" />} />
      <Route path="google" element={<BlankPage name="google" />} />
      <Route path="azure-ad" element={<BlankPage name="azure-ad" />} />
      <Route path="amazon" element={<BlankPage name="amazon" />} />
    </Route>
  );
};
