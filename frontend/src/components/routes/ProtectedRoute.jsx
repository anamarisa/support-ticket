import { Navigate, Outlet } from "react-router-dom";
import { getUserData } from "../../utils/auth";
import { checkVendorApproval } from "../../services/authCheck";

const ProtectedRoute = ({ allowedRoles, requireApproval = false }) => {
  const userData = getUserData();

  if (!userData) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  const userRole = userData?.user?.role;

  // 1. Check role access
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  // 2. Check vendor approval if required
  if (requireApproval && userRole === "vendor") {
    const approvalCheck = checkVendorApproval();
    if (!approvalCheck.allowed) {
      return <Navigate to={approvalCheck.redirectTo} replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
