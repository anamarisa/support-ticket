import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserData, refreshUserData } from '../../utils/auth';
import { logout } from '../../services/auth';

const VendorRejected = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const verifyStatus = async () => {
      try {
        setLoading(true);
        
        // First try to get fresh data from server
        const freshData = await refreshUserData();
        
        if (freshData?.vendor?.status !== 'rejected') {
          navigate('/');
          return;
        }
        
        setUserData(freshData);
      } catch (error) {
        console.error('Failed to refresh user data:', error);
        // Fallback to local storage data
        const localData = getUserData();
        
        if (localData?.vendor?.status !== 'rejected') {
          navigate('/login');
          return;
        }
        
        setUserData(localData);
      } finally {
        setLoading(false);
      }
    };

    verifyStatus();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Force logout anyway
      localStorage.clear();
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg text-center">
        <div className="mb-6 text-red-500 dark:text-red-400">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Account Not Approved</h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {userData?.vendor?.status === 'rejected'
            ? "Your vendor application has been rejected. Please contact support for more information."
            : "There was an issue verifying your account status."}
        </p>
        
        <div className="flex flex-col space-y-3">
          <Link 
            to="/contact" 
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Contact Support
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded bg-white hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorRejected;