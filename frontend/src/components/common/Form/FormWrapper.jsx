const FormWrapper = ({ title, onSubmit, children }) => {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          {children}
        </form>
      </div>
    );
  };
  
  export default FormWrapper;
  