import { useState } from "react";
import { Button, FormContainer, FormHeading, InputField } from "../components";
import { useParams } from "react-router-dom";
import { useCreateNewPassword } from "../features/auth/authHookes";

const CreateNewPassword = () => {
  const [passwords, setPasswords] = useState({});
  const { token } = useParams();
  const { mutate: createNewPassword } = useCreateNewPassword();

  function handleSubmit(e) {
    e.preventDefault();
    createNewPassword({ token, passwords });
  }

  function handleOnchanged(e) {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  }

  return (
    <FormContainer>
      <FormHeading text="Reset password" />
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
      <Button onClick={handleSubmit} text="Submit" type="submit" />
    </FormContainer>
  );
};

export default CreateNewPassword;
