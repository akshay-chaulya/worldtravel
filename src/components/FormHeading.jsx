const FormHeading = ({ className, text }) => {
  return (
    <h1 className={`self-center text-3xl  pb-3 font-bold ${className}`}>
      {text}
    </h1>
  );
};

export default FormHeading;
