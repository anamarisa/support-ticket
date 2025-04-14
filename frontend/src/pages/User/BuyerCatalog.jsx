import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiSearch, FiShoppingCart, FiPackage } from "react-icons/fi";
import api from "../../services/api";

const BuyerCatalog = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  // Fetch paginated products
  const {
    data: paginatedProducts = { data: [], current_page: 1, last_page: 1 },
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    error: errorProducts,
  } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: async () => {
      const { data } = await api.get(`/products?page=${currentPage}`);
      console.log("All Products:", data);
      return data.data ?? { data: [] };
    },
  });

  // Fetch products based on debounced search query
  const {
    data: searchResults = [],
    isLoading: isLoadingSearch,
    isError: isErrorSearch,
    error: errorSearch,
  } = useQuery({
    queryKey: ["search", debouncedSearch],
    queryFn: async () => {
      if (debouncedSearch) {
        const response = await api.get(
          `/products/search?keyword=${debouncedSearch}`
        );
        console.log("Search Results:", response.data);
        return response?.data?.data?.data ?? [];
      }
      return [];
    },
    enabled: debouncedSearch.length > 0,
  });

  const isLoading = isLoadingProducts || isLoadingSearch;
  const isError = isErrorProducts || isErrorSearch;
  const error = errorProducts || errorSearch;

  const displayProducts = debouncedSearch
    ? searchResults
    : paginatedProducts.data;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold text-gray-900 mb-2">
          Product Catalog
        </h1>
        <div className="w-20 h-1 bg-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Discover our premium selection of tech products
        </p>
      </div>

      <div className="relative mb-6 max-w-md mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg transition-all duration-200"
        />
      </div>

      {!debouncedSearch && (
        <div className="mb-8 text-center">
          <label className="mr-2 font-medium text-gray-700">Page:</label>
          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            className="px-3 py-2 border rounded-md"
          >
            {Array.from(
              { length: paginatedProducts.last_page },
              (_, i) => i + 1
            ).map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-16">
          <p>Loading products...</p>
        </div>
      ) : isError ? (
        <div className="text-center py-16 text-red-500">
          <p>Error loading products: {error.message}</p>
        </div>
      ) : displayProducts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className={`flex flex-col h-full border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${
                product.status === "unavailable" ? "opacity-70" : ""
              }`}
            >
              <div className="p-6 flex-grow">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <FiPackage className="mr-2" />
                  <span>{product.stock} in stock</span>
                </div>
              </div>
              <div className="p-6 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-blue-600">
                    Rp {Number(product.price).toLocaleString()}
                  </p>
                  <button
                    disabled={product.status === "unavailable"}
                    className={`px-4 py-2 rounded-lg flex items-center ${
                      product.status === "available"
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    } transition-colors duration-200`}
                  >
                    <FiShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FiSearch className="text-gray-400 text-3xl" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {debouncedSearch
              ? "We couldn't find any products matching your search. Try different keywords."
              : "No products available yet."}
          </p>
        </div>
      )}
    </div>
  );
};

export default BuyerCatalog;
