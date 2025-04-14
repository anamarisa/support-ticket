const Label = ({ htmlFor, children, required = false }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300
                transition-colors duration-200"
    >
      {children}
      {required && (
        <span className="text-red-500 dark:text-red-400 ml-1">*</span>
      )}
    </label>
  );
};

export default Label;
