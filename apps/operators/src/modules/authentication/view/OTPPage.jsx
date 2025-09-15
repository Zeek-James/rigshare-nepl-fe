import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { rigShareLogo } from "../../../assets/images";
import CustomButton from "../../../generalComponents/Button";
import ChangePasswordModal from "../components/ChangePasswordModal";
import OTPInput from "react-otp-input";
import useAdminVerificationManager from "../controller/adminVerificationController";

import { RigShareAuthBg } from "../components/RigShareAuthBg";

const OTPPage = () => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const navigate = useNavigate();
  const { postCaller, isSuccess, isLoading } = useAdminVerificationManager();

  const handleSubmission = async (e) => {
    e.preventDefault();
    const details = {
      email: email,
      totp: otp,
    };
    await postCaller(details);

    if (isSuccess) {
      setOtp("");
      if (mode === "login") {
        navigate("/"); // Redirect to dashboard for login
      } else if (mode === "reset") {
        navigate(`/reset-password?email=${email}`); // Redirect to reset password page
      }
    }
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const mode = searchParams.get("mode"); // "login" or "reset"

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

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
                Verify Your Identity{" "}
              </h2>
              <p className='text-14px px-3'>
                Enter the OTP sent to your email. {email}
              </p>
            </div>

            <div className=''>
              <form onSubmit={handleSubmission}>
                <OTPInput
                  containerStyle='w-full items-center justify-center mt-2 flex mb-4'
                  inputStyle={{
                    backgroundColor: "#F4F4F4",
                    width: 40,
                    height: 40,
                    borderRadius: "5px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: 1,
                    borderColor: "#000000",
                  }}
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span className='mr-3'></span>}
                  renderInput={(props) => <input {...props} />}
                />
                <div className='flex flex-col items-center mb-10'>
                  <p className='text-10px text-[#333333]'>
                    OTP will expire in
                    {timeLeft > 0 && (
                      <span className='text-12px font-semibold text-black ml-2 mt-4'>
                        {formatTime(timeLeft)}
                      </span>
                    )}
                  </p>
                  <div className='flex text-[#969393] text-12px items-center justify-end mt-4 w-full'>
                    Didn’t receive it?{"  "}
                    <a
                      className='text-[12px] font-semibold text-brandPurple underline ml-2'
                      href='/login'
                    >
                      Resend OTP
                    </a>
                  </div>
                </div>

                <CustomButton
                  buttonText={"Verify"}
                  isLoading={isLoading}
                  radius={"md"}
                  className='w-full'
                  type='submit'
                />
                <div className='flex justify-center mt-4 items-center text-center w-full'>
                  <a
                    className='inline-block align-baseline text-14px text-center'
                    href={mode === "login" ? "/login" : "forgot-password"}
                  >
                    Back to{"  "}
                    <span className='underline underline-offset-4  text-[#006600B5]'>
                      Log in
                    </span>
                    <br />
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ChangePasswordModal />
      </div>
      <RigShareAuthBg />
    </div>
  );
};

export default OTPPage;
