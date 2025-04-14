const ProductTableRow = ({ product, onEdit, onDeleteClick, isDeleting }) => {

  return (
    <tr
      key={product.id}
      className="hover:bg-gray-50 dark:hover:bg-neutral-700/50"
    >
      {/* <td className="px-6 py-4 whitespace-nowrap">
        {product.img ? (
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-md object-cover"
              src={`http://127.0.0.1:8000/storage/${product.img}`}
              alt={product.name}
            />
          </div>
        ) : (
          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-100 dark:bg-neutral-700 rounded-md">
            <svg
              className="h-6 w-6 text-gray-400 dark:text-neutral-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </td> */}
      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {product.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
        Rp. {Number(product.price).toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            product.stock > 5
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
          }`}
        >
          {product.stock}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            product.status === "available"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
              : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
          }`}
        >
          {product.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
        <button
          onClick={() => onEdit(product.id)}
          className="text-blue-600 hover:text-blue-800 font-medium px-3 py-1 rounded-md hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20"
        >
          Edit
        </button>
        <button
          onClick={() => onDeleteClick(product.id)}
          disabled={isDeleting}
          className="text-red-600 hover:text-red-800 font-medium px-3 py-1 rounded-md hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ProductTableRow;
