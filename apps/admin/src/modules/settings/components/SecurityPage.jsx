import React, { useState } from "react";
import InputWithFullBoarder from "../../../generalComponents/InputWithFullBoarder";
import CustomButton from "../../../generalComponents/Button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ChangePasswordManager } from "../controllers/changePasswordController";
import { toast } from "react-toastify";

const SecurityPage = () => {
  const [viewOldPassword, setViewOldPassword] = useState(false);
  const [viewNewPassword, setViewNewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { changePassword, isLoading } = ChangePasswordManager();
  return (
    <div className="w-[624px] h-[504px] bg-white rounded-md flex">
      <div className="flex m-auto">
        <div className="md:w-[499px] h-auto rounded-[6px] relative bg-white flex flex-col">
          <h4 className="text-20px mb-10 font-medium">Change Password</h4>
          <div className="flex flex-col md:flex-row md:space-x-2">
            <div className="flex-1">
              <InputWithFullBoarder
                label={"Old Password"}
                hasSuffix={true}
                type={viewOldPassword ? "text" : "password"}
                placeholder="Enter Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="h-[56px]"
                required
                icon={
                  viewOldPassword ? (
                    <AiOutlineEyeInvisible
                      onClick={() => setViewOldPassword(!viewOldPassword)}
                    />
                  ) : (
                    <AiOutlineEye
                      onClick={() => setViewOldPassword(!viewOldPassword)}
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
                type={viewNewPassword ? "text" : "password"}
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-[56px]"
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

          <div className="flex flex-col md:flex-row md:space-x-2">
            <div className="flex-1">
              <InputWithFullBoarder
                label={"Confirm New Password"}
                hasSuffix={true}
                type={viewConfirmPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-[56px]"
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
          <div className="flex justify-end space-x-2 mt-4 w-full">
            <CustomButton
              buttonText={"Cancel"}
              textColor={"#344054"}
              className="bg-white border border-gray-600"
              onClick={() => {
                setConfirmPassword("");
                setNewPassword("");
                setOldPassword("");
              }}
            />
            <CustomButton
              buttonText={"Update Password"}
              isLoading={isLoading}
              onClick={() => {
                if (confirmPassword === newPassword) {
                  changePassword({
                    old_password: oldPassword,
                    new_password: newPassword,
                  });
                } else {
                  toast.error(
                    "Your new password and your confirm password do not match"
                  );
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
