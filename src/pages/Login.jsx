import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, FormContainer, InputField, LoadingBtn } from "../components";
import { useLogin } from "../features/auth/authHookes";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [formData, setFormData] = useState(initialState);
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { mutate: login, isPending } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <FormContainer>
      <h1 className="self-center text-3xl  pb-3 font-bold">Login</h1>
      {/* {message && <FormMessage type={messageType} message={message} />} */}
      <InputField
        inputValue={formData.email}
        onChange={handleOnChange}
        label="Your email"
        inputType="email"
        inputName="email"
        placeholder="name@gmail.com"
        required={true}
      />
      <InputField
        inputValue={formData.password}
        onChange={handleOnChange}
        inputName="password"
        label="Your password"
        inputType="password"
        placeholder="Enter your password"
        required={true}
      />

      <p className="text-sm mb-1">
        <Link
          className="text-blue-600 hover:underline cursor-pointer"
          to="/reset-password"
        >
          Forgot password?
        </Link>
      </p>
      {isPending ? (
        <LoadingBtn />
      ) : (
        <Button onClick={handleSubmit} text="Login" />
      )}
      <p className="text-sm mt-1">
        You don&apos;t have any account?{" "}
        <Link
          className="text-blue-600 hover:underline cursor-pointer"
          to="/signup"
        >
          Create an account.
        </Link>{" "}
      </p>
    </FormContainer>
  );
};

export default Login;
