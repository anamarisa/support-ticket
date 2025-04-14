import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import MainContent from "../../layout/MainContent";
import Heading from "../../layout/Heading";

import ProductTableHead from "./ProductComponent/ProductTableHead";
import ProductTableRow from "./ProductComponent/ProductTableRow";
import EmptyProductState from "./ProductComponent/EmptyProductState";
import DeleteConfirmationModal from "../../components/common/Modal/DeleteConfirmationModal";

const fetchProducts = async (page) => {
  const { data } = await api.get(`/products/user?page=${page}`);
  console.log(data);
  return data;
};

const deleteProduct = async (id) => {
  await api.delete(`/products/${id}`);
};

const ProductList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: () => fetchProducts(currentPage),
    keepPreviousData: true,
  });

  const products = Array.isArray(data?.data?.data) ? data.data.data : [];

  const { mutate: mutateDelete, isLoading: isDeleting } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setDeleteModalOpen(false);
    },
  });

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleAdd = () => {
    navigate("/add-product");
  };

  const handleDeleteClick = (id) => {
    setProductToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      mutateDelete(productToDelete);
    }
  };

  const totalPages = data?.data?.last_page || 1;

  if (isLoading)
    return <div className="p-4 dark:text-gray-300">Loading products...</div>;
  if (isError)
    return (
      <div className="p-4 text-red-500 dark:text-red-400">
        Error: {error.message}
      </div>
    );

  return (
    <MainContent>
      <Heading
        title="Product Management"
        subtitle="Create, view, and manage your product listings"
      >
        <button
          onClick={handleAdd}
          className="mt-4 md:mt-0 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors duration-200 flex items-center dark:bg-purple-600 dark:hover:bg-purple-700"
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
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Product
        </button>
      </Heading>

      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-sm dark:bg-neutral-800 dark:border dark:border-neutral-700">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 dark:text-gray-200">
            Product List
          </h2>

          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-neutral-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <ProductTableHead
                columns={[
                  { key: "name", label: "Name", align: "left" },
                  { key: "price", label: "Price", align: "left" },
                  { key: "stock", label: "Stock", align: "left" },
                  { key: "status", label: "Status", align: "left" },
                  { key: "action", label: "Action", align: "right" },
                ]}
              />
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-neutral-800 dark:divide-neutral-700">
                {products.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-gray-500 dark:text-neutral-400"
                    >
                      <EmptyProductState onAddClick={handleAdd} />
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <ProductTableRow
                      key={product.id}
                      product={product}
                      onEdit={handleEdit}
                      onDeleteClick={handleDeleteClick}
                      isDeleting={isDeleting}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-center mt-6 space-x-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </MainContent>
  );
};

export default ProductList;
