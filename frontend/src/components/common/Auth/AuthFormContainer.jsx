const AuthFormContainer = ({ children, title, subtitle, icon }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-neutral-900 dark:to-neutral-800 px-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-neutral-700">
        {icon && (
          <div className="flex justify-center mb-8">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
              {icon}
            </div>
          </div>
        )}

        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">
          {title}
        </h2>

        {subtitle && (
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </div>
  );
};

export default AuthFormContainer;
