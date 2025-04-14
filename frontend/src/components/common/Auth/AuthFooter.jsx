const AuthFooter = ({ text, linkText, linkUrl }) => {
  return (
    <div className="mt-6 text-center">
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        {text}{" "}
        <a
          href={linkUrl}
          className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
        >
          {linkText}
        </a>
      </p>
    </div>
  );
};

export default AuthFooter;