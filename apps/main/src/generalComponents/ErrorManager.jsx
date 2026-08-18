import React from "react";

const ErrorManager = ({ errorMessage }) => {
  return (
    <div className="flex w-full h-[100vh] justify-center items-center text-white">
      {errorMessage}
    </div>
  );
};

export default ErrorManager;
