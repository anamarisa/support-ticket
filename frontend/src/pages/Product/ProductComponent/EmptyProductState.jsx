const EmptyProductState = ({ onAddClick }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <svg
        className="w-12 h-12 text-gray-400 mb-4 dark:text-neutral-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
      <p className="mb-2 text-gray-500 dark:text-neutral-400">No products found</p>
      <button
        onClick={onAddClick}
        className="text-blue-600 hover:text-blue-800 font-medium dark:text-blue-500 dark:hover:text-blue-400"
      >
        Add your first product
      </button>
    </div>
  );
};

export default EmptyProductState;