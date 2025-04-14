const Heading = ({ title, subtitle, children }) => {
  return (
    <div className="font-sans flex flex-col md:flex-row md:items-center md:justify-between mb-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          {title}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{subtitle}</p>
      </div>

      {children && <div>{children}</div>}
    </div>
  );
};

export default Heading;
