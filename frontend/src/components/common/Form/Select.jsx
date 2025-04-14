const Select = ({ name, value, onChange, options, required = false }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-3 py-2 text-sm transition-all duration-200 ease-in-out
                border border-gray-300 dark:border-neutral-600 rounded-lg
                bg-white dark:bg-neutral-800
                text-gray-800 dark:text-gray-200
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                hover:border-gray-400 dark:hover:border-neutral-500
                shadow-sm hover:shadow
                disabled:opacity-50 disabled:cursor-not-allowed
                appearance-none "
    >
      {options.map((opt) => (
        <option
          key={opt.value}
          value={opt.value}
          className="bg-white dark:bg-neutral-800"
        >
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
