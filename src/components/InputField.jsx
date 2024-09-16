import { useId } from "react";

const InputField = ({
  inputName,
  inputValue,
  onChange,
  label,
  inputType = "text",
  placeholder,
  labelClass,
  inputClass,
  containerClass,
  required = false,
  atributes = [],
}) => {
  const id = useId();
  return (
    <div className={`mb-3 ${containerClass}`}>
      <label
        htmlFor={id}
      className={`block mb-2  font-medium text-medium text-lg ${labelClass}`}
      >
        {label}
      </label>
      <input
        value={inputValue}
        onChange={onChange}
        type={inputType}
        id={id}
        className={`border  text-sm rounded-lg block w-full p-2.5  font-medium text-md bg-white outline-none ${inputClass}`}
        placeholder={placeholder}
        required={required}
        name={inputName}
        {...atributes}
      />
    </div>
  );
};

export default InputField;
