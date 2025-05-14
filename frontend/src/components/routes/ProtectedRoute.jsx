import { Navigate, Outlet } from "react-router-dom";
import { getUserData } from "../../lib/auth";

const ProtectedRoute = ({ allowedRoles, requireApproval = false }) => {
  const userData = getUserData();

  if (!userData) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
