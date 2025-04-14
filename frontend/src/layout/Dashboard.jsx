import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const Dashboard = () => {
  const { pathname } = useLocation();

  // Determine active menu directly from URL
  const activeMenu = pathname.startsWith("/vendor-approval")
    ? "vendor-approval"
    : "product"; // Default to "product" for home and other routes

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-200 transition-colors duration-200">
      <Sidebar activeMenu={activeMenu} />
      <MainContent activeMenu={activeMenu}>
        <Outlet />
      </MainContent>
    </div>
  );
};

export default Dashboard;
