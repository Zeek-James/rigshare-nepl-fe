import React, { useState } from "react";
import { rigShareLogo } from "../../../assets/images";
import InputWithFullBoarder from "../../../generalComponents/InputWithFullBoarder";
import CustomButton from "../../../generalComponents/Button";
import useLoginManager from "../controller/loginController";
import { RxPerson } from "react-icons/rx";
import AttachmentUpload from "../../../generalComponents/AttachmentUpload";
import { RigShareAuthBg } from "../components/RigShareAuthBg";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" }); // NEW ERROR STATE

  // Validation function
  const validateInputs = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    // if (!email) {
    //   newErrors.email = "Email is required.";
    //   valid = false;
    // } else if (!/\S+@\S+\.\S+/.test(email)) {
    //   newErrors.email = "Please enter a valid email! Please try again.";
    //   valid = false;
    // }

    // if (!password) {
    //   newErrors.password = "Password is required.";
    //   valid = false;
    // } else if (password.length < 7) {
    //   newErrors.password = "Invalid password! Please try again.";
    //   valid = false;
    // }

    setErrors(newErrors);
    return valid;
  };

  const { login, isLoading, isSuccess } = useLoginManager(email);

  const handleSubmission = async (e) => {
    e.preventDefault();
    return (window.location.href = `/email-otp?email=${email}&mode=sign-up`);

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
        password: "SignUp failed. Please check your credentials.",
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
                alt='Rig share Logo'
                className='mb-[5px] mx-auto h-[60px] max-w-[60px] w-auto object-contain'
              />
              <p className='font-semibold text-xl text-[#006600B5]'>
                Rig Share 247
              </p>
            </div>
            <div className='flex justify-center items-center flex-col text-center'>
              <h2 className='font-semibold text-2xl'>
                Register Your Company on Rigshare
              </h2>
              <p className='text-14px px-3'>
                Provide valid business and compliance information. Your
                registration will be reviewed by our team.
              </p>
            </div>

            <div className=''>
              <form onSubmit={handleSubmission}>
                <InputWithFullBoarder
                  hasPrefix={true}
                  type='text'
                  placeholder='Enter your company name'
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  className='h-[42px]'
                  // required
                  label={"Company Name"}
                  icon={<RxPerson />}
                  // errorMessage={errors.email} // Pass error message
                />
                <InputWithFullBoarder
                  hasPrefix={true}
                  type='email'
                  placeholder='Enter your company email address'
                  // value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='h-[42px]'
                  // required
                  label={"Company Email Address"}
                  icon={<RxPerson />}
                  errorMessage={errors.email} // Pass error message
                />
                <InputWithFullBoarder
                  hasPrefix={true}
                  type='phone'
                  placeholder='Enter your phone number'
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  className='h-[42px]'
                  // required
                  label={"Phone Number"}
                  icon={<RxPerson />}
                  // errorMessage={errors.email} // Pass error message
                />
                <div className=''>
                  <label
                    className='text-13px md:text-14px font-medium mb-2'
                    // htmlFor={id}
                  >
                    Upload Logo
                  </label>
                  <AttachmentUpload
                    className='mt-2 mb-4'
                    description='Choose a File or drag and drop it here (2MB)'
                  />
                </div>{" "}
                <div className=''>
                  <label
                    className='text-13px md:text-14px font-medium'
                    // htmlFor={id}
                  >
                    Upload Compliance Documents
                  </label>
                  <AttachmentUpload
                    className='mt-2 mb-4'
                    description='Drop your files here or click here to upload (2MB)'
                    fileFormat='PDF, PPTX, XLSX'
                  />
                </div>
                <CustomButton
                  buttonText={"Submit Registration"}
                  isLoading={isLoading}
                  radius={"md"}
                  className='w-full'
                  type='submit'
                />
              </form>
              <div className='text-center text-sm mt-4'>
                Already have an account?{" "}
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  href='#'
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

export default SignUp;
