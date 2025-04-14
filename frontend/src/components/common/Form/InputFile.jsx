const InputFile = ({ name, onChange, required }) => {
  return (
    <input
      id={name}
      type="file"
      name={name}
      accept="image/*"
      onChange={onChange}
      required={required}
      className="block w-full text-sm text-gray-800 dark:text-gray-200
        file:mr-4 file:py-2.5 file:px-4 file:rounded-lg
        file:border-0 file:text-sm file:font-medium
        file:bg-purple-500 file:text-white
        hover:file:bg-purple-600
        active:file:bg-purple-700
        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
        transition-colors duration-200 ease-in-out
        cursor-pointer
        border border-gray-300 dark:border-neutral-700 rounded-lg
        bg-white dark:bg-neutral-800
        shadow-sm hover:shadow-md"
    />
  );
};

export default InputFile;