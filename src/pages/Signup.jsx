import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  FormContainer,
  FormHeading,
  InputField,
  LoadingBtn,
  ProfileInputFiled,
} from "../components";
import { useSignup } from "../features/auth/authHookes";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const { mutate: signup, isPending } = useSignup();

  function handleSubmit(e) {
    e.preventDefault();
    signup(formData);
  }

  function handleOnchanged(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <FormContainer>
      <ProfileInputFiled
        onChange={(e) =>
          setFormData({ ...formData, imgFile: e.target.files[0] })
        }
      />
      <FormHeading text="Sign Up" />
      <div className="grid sm:grid-cols-2 sm:gap-2">
        <InputField
          onChange={handleOnchanged}
          label="First name"
          inputType="text"
          placeholder="Enter your first name"
          required={true}
          inputName="firstName"
        />
        <InputField
          onChange={handleOnchanged}
          label="Last name"
          inputType="text"
          placeholder="Enter your last name"
          required={true}
          inputName="lastName"
        />
      </div>
      <InputField
        onChange={handleOnchanged}
        inputName="email"
        label="Email"
        inputType="email"
        placeholder="name@gmail.com"
        required={true}
      />
      {/* <div className="grid sm:grid-cols-2 sm:gap-2"> */}
      <InputField
        onChange={handleOnchanged}
        inputName="password"
        label="Password"
        inputType="password"
        placeholder="Enter your password"
        required={true}
      />
      <InputField
        onChange={handleOnchanged}
        inputName="confirmPassword"
        label="Confirm password"
        inputType="password"
        placeholder="Enter your confirm password"
        required={true}
      />
      {/* </div> */}
      {isPending ? (
        <LoadingBtn />
      ) : (
        <Button onClick={handleSubmit} text="Sign Up" />
      )}
      <div className="flex items-center justify-center flex-col text-sm mt-2">
        <p>
          Alrady have an account?{" "}
          <Link
            className="text-blue-600 hover:underline cursor-pointer"
            to="/login"
          >
            Login
          </Link>{" "}
        </p>
      </div>
    </FormContainer>
  );
};

export default Signup;
