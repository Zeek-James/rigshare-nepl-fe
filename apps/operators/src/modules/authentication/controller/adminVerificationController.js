import { useMutation } from "react-query";
import Axios from "../../../constants/api_management/MyHttpHelper";
import { toast } from "react-toastify";

const useAdminVerificationManager = () => {
  const resetPasswordController = async (details) => {
    try {
      const [response] = [await Axios.post(`/auth/mfa/verify`, details)];
      // console.log(`i am checking this ${response.status}`);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      throw new Error(`Sorry: ${error.response.data.message}`);
    }
  };

  const mutation = useMutation(resetPasswordController, {
    onSuccess: async (data) => {
      const token = data.data.token;
      const clientType = data.data.client_type;
      // console.log(`token: ${token}`);

      localStorage.setItem("token", token);
      localStorage.setItem("client_type", clientType);

      await new Promise((resolve) => {
        // Check for token in localStorage every 100 milliseconds
        const intervalId = setInterval(() => {
          if (localStorage.getItem("token") === token) {
            clearInterval(intervalId);
            resolve();
          }
        }, 100);
      });

      // console.log(`this is the token ${localStorage.getItem("token")} `);
      // Need to resolve first time login status
      if (data?.data?.first_time_login) {
        // Redirect to the change password page if this is the first login
        window.location.href = `/first-password-reset?email=${data?.data?.user?.email}`;
      } else if (data?.data?.is_name_changed === false) {
        // Redirect to settings if name has not been changed
        window.location.href = "/settings";
      } else if (clientType === "VENDOR") {
        // Redirect vendor users to vendor profile
        window.location.href = "/vendor/profile";
      } else {
        // Navigate to dashboard for other users
        window.location.href = "/dashboard";
      }
    },

    onError: (error) => {
      // Handle error if necessary
      toast.error(error?.message);
      console.error("Signup error:", error.message);
    },
  });

  const postCaller = async (details) => {
    try {
      await mutation.mutateAsync(details);
    } catch (error) {
      // Handle error if necessary
      console.error("signup error:", error);
    }
  };

  return {
    postCaller,
    data: mutation.data,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};

export default useAdminVerificationManager;
