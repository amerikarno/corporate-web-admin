import BlankPage from "@/pages/blankPages/blankPage";
import { Route, Outlet } from "react-router-dom";

export const systemManagementRoutes = () => {
  return (
    <Route path="system-management" element={<Outlet />}>
      <Route index element={<BlankPage name="User Management" />} />
      <Route
        path="user-management"
        element={<BlankPage name="User Management" />}
      />
      <Route
        path="role-management"
        element={<BlankPage name="Role Management" />}
      />
      <Route
        path="department-management"
        element={<BlankPage name="Department Management" />}
      />
      <Route
        path="permission-management"
        element={<BlankPage name="Permission Management" />}
      />
      <Route path="workflow" element={<BlankPage name="Workflow" />} />
      <Route
        path="system-configuration"
        element={<BlankPage name="System Configuration" />}
      />
      <Route
        path="schedual-task"
        element={<BlankPage name="Schedual Task" />}
      />
      <Route
        path="password-policy"
        element={<BlankPage name="Password Policy" />}
      />
      <Route path="audit-log" element={<BlankPage name="Audit Log" />} />
      <Route path="activity-log" element={<BlankPage name="Activity Log" />} />
    </Route>
  );
};
