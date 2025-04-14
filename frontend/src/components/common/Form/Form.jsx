const Form = ({ title, onSubmit, children }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white dark:bg-neutral-800 p-6 md:p-8 rounded-xl shadow-lg 
                space-y-6 text-gray-800 dark:text-gray-200
                border border-gray-100 dark:border-neutral-700
                transition-all duration-200"
    >
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
      )}
      <div className="space-y-5">
        {children}
      </div>
    </form>
  );
};

export default Form;