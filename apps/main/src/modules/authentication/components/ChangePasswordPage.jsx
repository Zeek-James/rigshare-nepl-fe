import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logo } from "../../../assets/images";
import LeftSideComponent from "./LeftSideComponent";
import CustomButton from "../../../generalComponents/Button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import InputWithFullBoarder from "../../../generalComponents/InputWithFullBoarder";
import usePostChangePasswordManager from "../controller/postChangePasswordController";

const ChangePasswordPage = () => {
  const navigate = useNavigate()
  const [viewPassword, setViewPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);

  const { postCaller, isLoading, isSuccess } = usePostChangePasswordManager();

  useEffect(() => {
    if (passwordChanged && isSuccess) {
      toast.success("Password changed successfully");
      window.location.href = "/dashboard";
    }
  }, [passwordChanged, isSuccess]);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    const passwordData = {
      old_password: oldPassword,
      new_password: newPassword,
    };

    try {
      await postCaller(passwordData);
      setPasswordChanged(true); 
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      setError(errorMessage);
      console.error("Error changing password:", errorMessage);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboard')
        }
  }, [isSuccess, navigate]);


  return (
    <div className="flex flex-col md:flex-row sm:h-screen">
      <LeftSideComponent />

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-8">
      <div className="md:w-[599px] h-auto rounded-[6px] relative bg-white flex flex-col pt-6">
      <img
            src={logo}
            alt="EMMS Logo"
            className="mb-[105px] mx-auto h-[62px] w-auto object-contain"
          />
          <h2 className="text-2xl md:text-3xl font-bold mb-2 mt-3 text-center">
            Change to Your Password
          </h2>
          <p className="text-14px text-[#645D5D] mb-6 text-center">
            Kindly Change your password
          </p>
          {error && <p className="text-red-500 text-center">{error}</p>}          <div className="flex flex-col md:flex-row md:space-x-2">
            <div className="flex-1">
              <InputWithFullBoarder
                label={"Old Password"}
                hasSuffix={true}
                type={viewPassword ? "text" : "password"}
                placeholder="Enter Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="h-[56px]"
                required
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
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-2">
            <div className="flex-1">
              <InputWithFullBoarder
                label={"New Password"}
                hasSuffix={true}
                type={viewPassword ? "text" : "password"}
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-[56px]"
                required
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
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-2">
            <div className="flex-1">
              <InputWithFullBoarder
                label={"Confirm New Password"}
                hasSuffix={true}
                type={viewPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-[56px]"
                required
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
            </div>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="flex justify-end space-x-2 mt-4 w-full">
            <CustomButton
            isLoading={isLoading}
              buttonText={"Change Password"}
              className="h-[55px] w-auto"
              onClick={handleChangePassword}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
