const AuthInputField = ({
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    required = true,
    showForgotPassword = false
  }) => {
    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
          {showForgotPassword && type === "password" && (
            <a
              href="#"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Forgot password?
            </a>
          )}
        </div>
        <input
          type={type}
          name={name}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-600 dark:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
    );
  };
  
  export default AuthInputField;