// src/components/PublicRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

const PublicRoute = ({ restricted = false }) => {
  if (restricted && isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default PublicRoute;
