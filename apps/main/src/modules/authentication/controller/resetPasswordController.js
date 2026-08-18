import { toast } from "react-toastify";
import usePostManager from "./post_controller_template";
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS

export const ResetPasswordManager = () => {
  const { postCaller, isLoading, isSuccess, error, data } = usePostManager(
    `/auth/forgot-password/confirm`,
    [""],
    true
  );

  const changePassword = async (details) => {
    try {
      const response = await postCaller(details);

      if (response) {
        toast.success("Password has been successfully reset!"); // Success toast
      }
    } catch (error) {
      console.error("error:", error);
      toast.error("Error resetting password. Please try again."); // Error toast
    }
  };

  return {
    changePassword,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
