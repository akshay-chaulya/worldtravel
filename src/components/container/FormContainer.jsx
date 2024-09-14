const FormContainer = ({ children, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="my-8 transition-all flex gap-2 flex-col max-w-sm mx-auto px-6 py-4 rounded-md text-black shadow-md shadow-black md:w-[50%] w-[80%] bg-gray-300"
    >
      {children}
    </form>
  );
};

export default FormContainer;
