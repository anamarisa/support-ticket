import api from "./api";
import { getUserData, setUserData } from "../utils/auth";

export const fetchVendors = async () => {
  const res = await api.get("/vendors");
  return res.data.data;
};

export const updateVendorStatus = async ({ id, action }) => {
    const { data } = await api.put(`/update-status/${id}`, { status: action });
    return data.data;
};

export const checkVendorApprovalStatus = async () => {
  try {
    const response = await api.get("/vendor/status");
    const { status } = response.data;
    const userData = getUserData();

    if (userData?.vendor) {
      setUserData({
        ...userData,
        vendor: {
          ...userData.vendor,
          status: status
        }
      });
    }

    return {
      isApproved: status === "approved",
      isRejected: status === "rejected",
      currentStatus: status
    };
  } catch (error) {
    console.error("Error checking vendor status:", error);
    throw error;
  }
};