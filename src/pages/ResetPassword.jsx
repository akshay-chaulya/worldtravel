import { useState } from "react";
import { Button, FormContainer, FormHeading, FormMessage } from "../components";
import { useSelector } from "react-redux";
import { selectFeedbackStates } from "../features/ui/feedbackSelectors";
import { useResetPassword } from "../features/auth/authHookes";

const ResetPassword = () => {
  const { type, message } = useSelector(selectFeedbackStates);
  const [email, setEmail] = useState("");
  const { mutate: resetPassword } = useResetPassword();

  function handleSubmit(e) {
    e.preventDefault();
    resetPassword(email);
  }

  return (
    <FormContainer>
      <FormHeading text="Forgot passowrd" />
      {message && (
        <FormMessage
          message={
            type === "info"
              ? message
              : "Reset password link sended in your email.Go to your email and reset your password!"
          }
        />
      )}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300  text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  font-medium text-md bg-white"
        type="text"
        placeholder="Enter your email"
      />
      <Button onClick={handleSubmit} />
    </FormContainer>
  );
};

export default ResetPassword;
