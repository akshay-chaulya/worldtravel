import { useSelector } from "react-redux";
import { Button, FormContainer, FormHeading, FormMessage } from "../components";
import { selectFeedbackStates } from "../features/ui/feedbackSelectors";
import { useState } from "react";
import { useVerifyEmail } from "../features/auth/authHookes";

const VerifyEmail = () => {
  const { type, message } = useSelector(selectFeedbackStates);
  const [code, setCode] = useState("");
  const { mutate: verifyEmail } = useVerifyEmail();

  function handleSubmit(e) {
    e.preventDefault();
    verifyEmail(code);
  }

  return (
    <FormContainer>
      <FormHeading text="OTP Verification" />
      <FormMessage
        message={
          type === "info"
            ? message
            : "Account created successfully. Now go to your email and verify your account!"
        }
      />
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  font-medium text-md bg-white"
        type="text"
        placeholder="Enter your Verification code"
      />
      <Button onClick={handleSubmit} />
    </FormContainer>
  );
};

export default VerifyEmail;
