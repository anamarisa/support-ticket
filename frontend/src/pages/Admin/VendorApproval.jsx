import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchVendors, updateVendorStatus } from "../../services/vendorService";
import { toast } from "react-hot-toast";
import MainContent from "../../layout/MainContent";
import Heading from "../../layout/Heading";

const VendorApproval = () => {
  const queryClient = useQueryClient();

  const {
    data: vendors = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["vendors"],
    queryFn: fetchVendors,
    retry: 2,
    refetchOnWindowFocus: true,
  });

  const { mutate, isLoading: isUpdating } = useMutation({
    mutationFn: updateVendorStatus,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["vendors"]);
      toast.success(`Vendor ${variables.action} successfully`);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update vendor status"
      );
    },
  });

  const handleAction = (id, action) => {
    if (!isUpdating) {
      mutate({ id, action });
    }
  };

  if (isLoading) {
    return (
      <MainContent activeMenu="vendor">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </MainContent>
    );
  }

  if (isError) {
    return (
      <MainContent activeMenu="vendor">
        <div className="p-4 text-red-500">
          Error loading vendors: {error.message}
        </div>
      </MainContent>
    );
  }

  return (
    <MainContent activeMenu="vendor">
      <Heading
        title="Vendor Approvals"
        subtitle="Review and manage vendor registration requests"
      />

      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
            <thead className="bg-gray-50 dark:bg-neutral-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Approved At
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-neutral-800 divide-y divide-gray-200 dark:divide-neutral-700">
              {vendors.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No vendors found
                  </td>
                </tr>
              ) : (
                vendors.map((vendor) => (
                  <tr
                    key={vendor.id}
                    className="hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {vendor.company_name}
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {vendor.address}
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {vendor.phone}
                  </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          vendor.status === "approved"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : vendor.status === "rejected"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {vendor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">
                      {vendor.approved_at
                        ? new Date(vendor.approved_at).toLocaleString()
                        : "—"}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      {vendor.status === "pending" ? (
                        <>
                          <button
                            onClick={() => handleAction(vendor.id, "approved")}
                            disabled={isUpdating}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 ${
                              isUpdating ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          >
                            {isUpdating ? "Processing..." : "Approve"}
                          </button>
                          <button
                            onClick={() => handleAction(vendor.id, "rejected")}
                            disabled={isUpdating}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 ${
                              isUpdating ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          >
                            {isUpdating ? "Processing..." : "Reject"}
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500 text-sm">
                          {vendor.status === "approved"
                            ? "Approved"
                            : "Rejected"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MainContent>
  );
};

export default VendorApproval;
