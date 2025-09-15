import React, { useState } from "react";
import { rigShareLogo } from "../../../assets/images";
import InputWithFullBoarder from "../../../generalComponents/InputWithFullBoarder";
import CustomButton from "../../../generalComponents/Button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useLoginManager from "../controller/loginController";
import { RxPerson } from "react-icons/rx";
import { RigShareAuthBg } from "../components/RigShareAuthBg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState();
  const [errors, setErrors] = useState({ email: "", password: "" }); // NEW ERROR STATE

  // Validation function
  const validateInputs = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email! Please try again.";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (password.length < 7) {
      newErrors.password = "Invalid password! Please try again.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const { login, isLoading, isSuccess } = useLoginManager(email);

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const details = {
      email: email,
      password: password,
    };

    try {
      await login(details);
    } catch (err) {
      setErrors({
        ...errors,
        password: "Login failed. Please check your credentials.",
      });
    }

    if (isSuccess) {
      setEmail("");
      setPassword("");
    }
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
              <h2 className='font-semibold text-2xl'>Welcome Back!</h2>
              <p className='text-14px px-3'>
                Enter your login details to access your dashboard.
              </p>
            </div>

            <div>
              <form onSubmit={handleSubmission}>
                <InputWithFullBoarder
                  hasPrefix={true}
                  type='email'
                  placeholder='Enter your email address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='h-[42px]'
                  // required
                  label={"Email"}
                  icon={<RxPerson />}
                  errorMessage={errors.email} // Pass error message
                />
                <InputWithFullBoarder
                  hasPrefix={true}
                  type={viewPassword ? `text` : `password`}
                  placeholder='Enter your password'
                  label='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='h-[42px]'
                  // required
                  errorMessage={errors.password} // Pass error message
                  icon={
                    viewPassword ? (
                      <AiOutlineEyeInvisible
                        onClick={() => setViewPassword(!viewPassword)}
                      />
                    ) : (
                      <AiOutlineEye
                        onClick={() => setViewPassword(!viewPassword)}
                      />
                    )
                  }
                />
                <div className='flex items-center justify-end mb-6'>
                  {/* <CustomCheckBox
                text={"Remember me"}
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              /> */}
                  <div className='text-[#969393] text-xs'>
                    Forgot password? {"  "}
                    <a
                      className='text-xs text-brandPurple'
                      href='/forgot-password'
                    >
                      Request password?
                    </a>
                  </div>
                </div>
                <CustomButton
                  buttonText={"Login"}
                  isLoading={isLoading}
                  radius={"md"}
                  className='w-full'
                  type='submit'
                />
              </form>
              <div className='text-center text-xs mt-4 text-[#969393]'>
                Don't have an account?{" "}
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  href='#'
                  className='underline underline-offset-4  text-[#006600B5]'
                >
                  Sign Up
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

export default Login;
