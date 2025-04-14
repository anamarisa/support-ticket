import { NavLink } from "react-router-dom";
import { getUserData } from "../utils/auth";
import AuthLogoutButton from "../components/common/Auth/AuthLogoutButton";

const Sidebar = () => {
  const userData = getUserData();

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white dark:bg-neutral-800 border-r border-gray-200 dark:border-neutral-700 p-6 space-y-8 flex-shrink-0">
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            Admin Panel
          </h2>

          <nav className="space-y-1">
            {userData?.user?.role === "admin" && (
              <NavLink
                to="/vendor-approval"
                className={({ isActive }) =>
                  `flex items-center w-full text-left px-4 py-3 font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border-l-4 border-purple-500"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-neutral-700"
                  }`
                }
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Vendor Approval
              </NavLink>
            )}

            {userData?.user?.role !== "admin" && (
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `flex items-center w-full text-left px-4 py-3 font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border-l-4 border-purple-500"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-neutral-700"
                  }`
                }
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                Products
              </NavLink>
            )}
          </nav>
        </div>

        <AuthLogoutButton user={userData?.user} />
      </aside>
    </div>
  );
};

export default Sidebar;
