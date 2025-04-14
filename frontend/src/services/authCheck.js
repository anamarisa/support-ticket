// src/services/authCheck.js
import { getUserData } from '../utils/auth';

export const checkVendorApproval = () => {
  const userData = getUserData();
  
  if (userData?.user?.role === 'vendor') {
    switch(userData?.vendor?.status) {
      case 'pending':
        return { allowed: false, redirectTo: '/vendor-pending' };
      case 'rejected':
        return { allowed: false, redirectTo: '/vendor-rejected' };
      case 'approved':
        return { allowed: true };
      default:
        return { allowed: false, redirectTo: '/vendor-pending' };
    }
  }
  
  return { allowed: true }; // For non-vendors or admins
};