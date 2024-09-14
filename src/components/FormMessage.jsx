import React from "react";

const FormMessage = ({ message, type = "success" }) => {
  return (
    <p
      className={`px-5 py-3 text-sm rounded-md transition-all ${
        type === "error"
          ? "bg-red-100 text-red-500"
          : "bg-green-100 text-green-500"
      }`}
    >
      {message}
    </p>
  );
};

export default FormMessage;
