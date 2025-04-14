const InputField = ({ type, name, value, onChange, required = false }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-3 py-2 text-sm transition-all duration-200 ease-in-out
        border border-gray-300 dark:border-neutral-600 rounded-sm
        bg-white dark:bg-neutral-800
        text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-neutral-500
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
        hover:border-gray-400 dark:hover:border-neutral-500
        shadow-sm hover:shadow-md
        disabled:opacity-50 disabled:cursor-not-allowed"
    />
  );
};

export default InputField;