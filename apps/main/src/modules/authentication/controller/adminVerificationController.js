import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Axios from "../../../constants/api_management/MyHttpHelper";
import { toast } from "react-toastify";
import { useAuth } from "@rigshare/shared-auth";

const useAdminVerificationManager = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const resetPasswordController = async (details) => {
    try {
      const [response] = [await Axios.post(`/auth/mfa/verify`, details)];
      // console.log(`i am checking this ${response.status}`);
      return response.data;
    } catch (error) {
      console.log(error?.response?.data);
      throw new Error(`Sorry: ${error?.response?.data?.message}`);
    }
  };

  const mutation = useMutation(resetPasswordController, {
    onSuccess: async (data) => {
      const token = data.data.token;
      const clientType = data.data.client_type;
      // console.log(`token: ${token}`);

      login(token, clientType);

      // Need to resolve first time login status
      if (data?.data?.first_time_login) {
        // Redirect to the change password page if this is the first login
        navigate(`/first-password-reset?email=${data?.data?.user?.email}`);
      } else if (data?.data?.is_name_changed === false) {
        // Redirect to settings if name has not been changed
        navigate("/settings");
      } else if (clientType === "VENDOR") {
        // Redirect vendor users to vendor profile
        navigate("/vendor/profile");
      } else {
        // Navigate to dashboard for other users
        navigate("/dashboard");
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
