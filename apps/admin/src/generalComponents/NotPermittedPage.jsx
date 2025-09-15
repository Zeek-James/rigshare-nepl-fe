import React from "react";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import BaseDashboardNavigation from "./BaseDashboardNavigation";
import ButtonWithIcon from "./ButtonWithIcon";

const NotPermittedPage = () => {
  const navigate = useNavigate();

  return (
    <BaseDashboardNavigation>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <svg
              className="w-24 h-24 mx-auto text-red-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4"
              />
              <circle cx="12" cy="16" r="1" fill="currentColor" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>

          <p className="text-gray-600 mb-8">
            Sorry, you don't have permission to access this page. Please contact
            your administrator if you believe this is a mistake.
          </p>

          <ButtonWithIcon
            buttonText="Go Back"
            icon={BiArrowBack}
            radius="md"
            onClick={() => navigate(-1)}
            className="mx-auto"
          />
        </div>
      </div>
    </BaseDashboardNavigation>
  );
};

export default NotPermittedPage;
