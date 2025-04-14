const Button = ({ children = "Submit", disabled = false }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`mt-2 font-semibold py-2 px-4 rounded-lg transition-colors duration-200
        ${disabled ? "bg-purple-300 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white"}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
