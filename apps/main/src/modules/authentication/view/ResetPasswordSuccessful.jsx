import React from "react";
import { authLogo } from "../../../assets/images";
import CustomButton from "../../../generalComponents/Button";

import { useNavigate } from "react-router-dom";

const ResetPasswordSuccessful = () => {
  const navigate = useNavigate();

  const handlePasswordReset = () => {
    navigate("/login");
  };

  return (
    <div className='flex flex-col md:flex-row sm:h-screen'>
      {/* Right side with login form */}
      <div className='w-full flex flex-col justify-center items-center bg-white p-8 h-screen'>
        <div className='w-full max-w-[600px] h-fit'>
          <div className='w-fit mr-auto'>
            <img
              src={authLogo}
              alt='performance-dialogue Logo'
              className='mb-[5px] mx-auto h-[141px] w-auto object-contain'
            />
          </div>
          <div className='md:border rounded-[20px] md:p-[60px] border-bordersOrDivider mt-8'>
            <h2 className='text-2xl md:text-[24px] font-bold mb-2'>
              Password Reset Successful!
            </h2>
            <p className='text-14px text-[#6C757D] mb-6'>
              Your password has been updated. You can now log in with your new
              credentials.
            </p>

            <div>
              <div className='flex flex-col md:flex-row md:space-x-2'>
                {/* <div className='flex-1'>
                  <InputWithFullBoarder
                    label={"Enter Token"}
                    type='Token'
                    placeholder='Enter Token'
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className='h-[42px]'
                    required
                  />
                </div> */}
              </div>
            </div>

            <div className='flex justify-between space-x-2 mt-4 w-full'>
              <CustomButton
                buttonText={"Login"}
                onClick={handlePasswordReset}
                className={"w-full"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordSuccessful;
