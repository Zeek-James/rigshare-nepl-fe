import React, { useState } from "react";
import { rigShareLogo } from "../../../assets/images";
import CustomButton from "../../../generalComponents/Button";
import { IoMailOutline } from "react-icons/io5";
import InputWithFullBoarder from "../../../generalComponents/InputWithFullBoarder";
import usePasswordResetManager from "../controller/getPasswordResetController";
import { RigShareAuthBg } from "../components/RigShareAuthBg";
// import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  // const navigate = useNavigate();
  const [errors, setErrors] = useState({ email: "" }); // NEW ERROR STATE

  const { login, isLoading } = usePasswordResetManager(email);

  // Validation function
  const validateInputs = () => {
    let valid = true;
    const newErrors = { email: "" };

    if (!email) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email! Please try again.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    const details = {
      email: email,
    };

    await login(details);
  };

  return (
    <div className='grid min-h-svh lg:grid-cols-7'>
      <div className='flex flex-col md:flex-row col-span-3'>
        <div className='w-full flex flex-col justify-center items-center bg-white p-4 lg:p-12'>
          <div className='w-full max-w-[460px] flex flex-col gap-10 h-fit'>
            <div className='w-fit mx-auto'>
              <img
                src={rigShareLogo}
                alt='performance-dialogue Logo'
                className='mb-[5px] mx-auto h-[60px] max-w-[60px] w-auto object-contain'
              />
              <p className='font-semibold text-xl text-[#006600B5]'>
                Rig Share 247
              </p>
            </div>
            <div className='flex justify-center items-center flex-col text-center'>
              <h2 className='font-semibold text-2xl'>Forgot Password?</h2>
              <p className='text-14px px-3'>
                Enter your registered email to receive reset instructions.
              </p>
            </div>

            <div>
              <form onSubmit={handleSubmission}>
                <InputWithFullBoarder
                  type='email'
                  placeholder='Enter your email address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='h-[42px]'
                  hasPrefix={true}
                  label={"Email Address"}
                  icon={<IoMailOutline />}
                  errorMessage={errors.email} // Pass error message
                />

                <CustomButton
                  buttonText={"Send OTP"}
                  isLoading={isLoading}
                  radius={"md"}
                  className='w-full mt-8'
                  type='submit'
                />
              </form>
              <div className='text-center text-xs mt-4 text-[#969393]'>
                Remembered your password?{" "}
                <a
                  href='/login'
                  className='underline underline-offset-4  text-[#006600B5]'
                >
                  Log In
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RigShareAuthBg />
    </div>
  );
};

export default ForgotPassword;
