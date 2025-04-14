const AuthIcon = ({ icon }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-blue-600 dark:text-blue-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {icon}
      </svg>
    );
  };
  
  export default AuthIcon;