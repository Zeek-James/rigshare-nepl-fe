import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ModalManagement from "../../../generalComponents/ModalManagement";
import InputWithFullBoarder from "../../../generalComponents/InputWithFullBoarder";
import CustomButton from "../../../generalComponents/Button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import usePostManager from "../controller/post_controller_template";

const ChangePasswordModal = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);


  const { postCaller, isLoading, isSuccess } = usePostManager(
    "/api/v1/users/password",
    "password"
  );

  useEffect(() => {
    if (passwordChanged && isSuccess) {
      // Redirect after a successful password change
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
      if (isSuccess) {
        document.getElementById("change_password").close();
        toast.success("Password changed successfully");
        setPasswordChanged(true);
      }
    } catch (error) {
      // Handle unexpected errors
      const errorMessage =
        error?.response?.message || "An unexpected error occurred";
      //   toast.error(errorMessage);
      setError(errorMessage);
      console.error("Error changing password:", errorMessage);
    }
  };


  return (
    <div className="modal-overlay bg-black" id="modal-overlay">
      <div className="modal-content">
              <ModalManagement id={"change_password"} title={"Change Password"}>
        <div className="md:w-[599px] h-auto rounded-[6px] relative bg-white flex flex-col pt-6">
          <div className="flex flex-col md:flex-row md:space-x-2">
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
              buttonText={"Cancel"}
              textColor={"#344054"}
              className="bg-white border border-gray-600 h-[55px] w-[187px]"
              onClick={() => document.getElementById("change_password").close()}
            />
            <CustomButton
              buttonText={"Change Password"}
              className="h-[55px] w-auto"
              onClick={handleChangePassword}
              disabled={isLoading}
            />
          </div>
        </div>
      </ModalManagement>
    </div>
    </div>
  );
};

export default ChangePasswordModal;
