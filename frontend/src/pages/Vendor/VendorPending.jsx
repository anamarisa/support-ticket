import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkVendorApprovalStatus } from "../../services/vendorService";

const VendorPending = () => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState(new Date());

  const checkStatus = async () => {
    try {
      setIsChecking(true);
      const { isApproved, isRejected } = await checkVendorApprovalStatus();

      if (isApproved) {
        navigate("/");
      } else if (isRejected) {
        navigate("/vendor-rejected");
      }
    } catch (error) {
      console.error("Status check failed:", error);
    } finally {
      setIsChecking(false);
      setLastChecked(new Date());
    }
  };

  // Initial check on mount
  useEffect(() => {
    checkStatus();
  }, []);

  // Set up polling interval
  useEffect(() => {
    const interval = setInterval(() => {
      checkStatus();
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg text-center">
        <div className="mb-6 text-yellow-500 dark:text-yellow-400">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Approval Pending
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your vendor account is under review. Please wait for admin approval.
          {lastChecked && (
            <span className="block text-xs mt-2">
              Last checked: {lastChecked.toLocaleTimeString()}
            </span>
          )}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={checkStatus}
            disabled={isChecking}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition disabled:opacity-50"
          >
            {isChecking ? "Checking..." : "Refresh Now"}
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-200 dark:bg-neutral-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-neutral-600 transition"
          >
            Full Reload
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorPending;
