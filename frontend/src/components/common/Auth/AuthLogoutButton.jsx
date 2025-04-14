// src/components/Auth/AuthLogoutButton.jsx
import { useNavigate } from "react-router-dom";
import { logout } from "../../../services/auth";
import { clearUserData, removeAuthToken } from "../../../utils/auth";

const AuthLogoutButton = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      // Clear local storage
      removeAuthToken();
      clearUserData();
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if API fails, clear local storage and redirect
      removeAuthToken();
      clearUserData();
      navigate("/login");
    }
  };

  return (
    <div className="pt-8 border-t border-gray-200 dark:border-neutral-700">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
          {user?.name?.charAt(0) || "A"}
        </div>
        <div>
          <p className="font-medium">{user?.name || "Admin User"}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user?.email || "admin@example.com"}
          </p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Logout
      </button>
    </div>
  );
};

export default AuthLogoutButton;
