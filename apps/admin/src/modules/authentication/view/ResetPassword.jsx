import React, { useEffect, useState } from "react";
import { rigShareLogo } from "../../../assets/images";
import CustomButton from "../../../generalComponents/Button";
import InputWithFullBoarder from "../../../generalComponents/InputWithFullBoarder";
import {
  AiOutlineCheck,
  AiOutlineCloseCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { ResetPasswordManager } from "../controller/resetPasswordController";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import ShowPasswordStrength from "../components/ShowPasswordStrength";
import { passwordStrength } from "check-password-strength";
import { checkPasswordRules } from "../../../utils/checkPasswordRules";
import { RigShareAuthBg } from "../components/RigShareAuthBg";

const ResetPassword = () => {
  const [viewNewPassword, setViewNewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [strength, setStrength] = useState(0);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  // const [token, setToken] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const { changePassword, isLoading } = ResetPasswordManager();

  const handlePasswordReset = async () => {
    if (confirmPassword === newPassword) {
      await changePassword({
        email,
        token,
        new_password: newPassword,
        confirm_password: confirmPassword,
      }).then(() => {
        navigate("/reset-successful");
      });
    } else {
      toast.error("Your new password and confirm password do not match");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    setPasswordCriteria(checkPasswordRules(value));
  };

  useEffect(() => {
    setStrength(passwordStrength(newPassword));
  }, [newPassword]);

  return (
    <div className='grid min-h-svh lg:grid-cols-7'>
      <div className='flex flex-col md:flex-row col-span-3'>
        <div className='w-full flex flex-col justify-center items-center bg-white p-8 h-screen'>
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
              <h2 className='font-semibold text-2xl text-[#333333]'>
                Forgot Password?
              </h2>
              <p className='text-14px px-3'>
                Enter your registered email to receive reset instructions.
              </p>
            </div>
            <div>
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
                <div className='flex flex-col md:flex-row md:space-x-2'>
                  <div className='flex-1'>
                    <InputWithFullBoarder
                      label={"Password"}
                      hasPrefix={true}
                      type={viewNewPassword ? "text" : "password"}
                      placeholder='Enter New Password'
                      value={newPassword}
                      onChange={(e) => handlePasswordChange(e)}
                      className='h-[42px]'
                      required
                      icon={
                        viewNewPassword ? (
                          <AiOutlineEyeInvisible
                            onClick={() => setViewNewPassword(!viewNewPassword)}
                          />
                        ) : (
                          <AiOutlineEye
                            onClick={() => setViewNewPassword(!viewNewPassword)}
                          />
                        )
                      }
                    />
                  </div>
                </div>
                <div className=''>
                  <ShowPasswordStrength strength={strength} />
                </div>

                <div className='flex flex-col md:flex-row md:space-x-2'>
                  <div className='flex-1'>
                    <InputWithFullBoarder
                      label={"Confirm Password"}
                      hasPrefix={true}
                      type={viewConfirmPassword ? "text" : "password"}
                      placeholder='Re-enter your new password'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className='h-[42px]'
                      required
                      icon={
                        viewConfirmPassword ? (
                          <AiOutlineEyeInvisible
                            onClick={() =>
                              setViewConfirmPassword(!viewConfirmPassword)
                            }
                          />
                        ) : (
                          <AiOutlineEye
                            onClick={() =>
                              setViewConfirmPassword(!viewConfirmPassword)
                            }
                          />
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              <ul className='mt-4 text-sm'>
                <li className='flex items-center gap-2'>
                  {passwordCriteria.length ? (
                    <AiOutlineCheck className='text-[24px] text-green-600' />
                  ) : newPassword ? (
                    <AiOutlineCloseCircle className='text-[24px] text-red-500' />
                  ) : (
                    <AiOutlineCloseCircle className='text-[24px] text-gray-400' />
                  )}
                  <span
                    className={`${
                      passwordCriteria.length
                        ? "text-green-600"
                        : newPassword
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  >
                    Minimum 8 characters
                  </span>
                </li>

                <li className='flex items-center gap-2'>
                  {passwordCriteria.uppercase ? (
                    <AiOutlineCheck className='text-[24px] text-green-600' />
                  ) : newPassword ? (
                    <AiOutlineCloseCircle className='text-[24px] text-red-500' />
                  ) : (
                    <AiOutlineCloseCircle className='text-[24px] text-gray-400' />
                  )}
                  <span
                    className={`${
                      passwordCriteria.uppercase
                        ? "text-green-600"
                        : newPassword
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  >
                    At least one uppercase letter
                  </span>
                </li>

                <li className='flex items-center gap-2'>
                  {passwordCriteria.number ? (
                    <AiOutlineCheck className='text-[24px] text-green-600' />
                  ) : newPassword ? (
                    <AiOutlineCloseCircle className='text-[24px] text-red-500' />
                  ) : (
                    <AiOutlineCloseCircle className='text-[24px] text-gray-400' />
                  )}
                  <span
                    className={`${
                      passwordCriteria.number
                        ? "text-green-600"
                        : newPassword
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  >
                    At least one number
                  </span>
                </li>

                <li className='flex items-center gap-2'>
                  {passwordCriteria.specialChar ? (
                    <AiOutlineCheck className='text-[24px] text-green-600' />
                  ) : newPassword ? (
                    <AiOutlineCloseCircle className='text-[24px] text-red-500' />
                  ) : (
                    <AiOutlineCloseCircle className='text-[24px] text-gray-400' />
                  )}
                  <span
                    className={`${
                      passwordCriteria.specialChar
                        ? "text-green-600"
                        : newPassword
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  >
                    At least one special character (@$!%*?&)
                  </span>
                </li>
              </ul>
              <div className='flex justify-between space-x-2 mt-4 w-full'>
                <CustomButton
                  buttonText={"Send OTP"}
                  isLoading={isLoading}
                  onClick={handlePasswordReset}
                  className={"w-full"}
                  disabled={!Object.values(passwordCriteria).every(Boolean)}
                />
              </div>
              <div className='text-center text-xs mt-4 text-[#969393]'>
                Remembered your password?{" "}
                <a
                  href='/login'
                  className='underline underline-offset-4  text-[#006600B5]'
                >
                  Log In
                </a>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
      <RigShareAuthBg />
    </div>
  );
};

export default ResetPassword;
