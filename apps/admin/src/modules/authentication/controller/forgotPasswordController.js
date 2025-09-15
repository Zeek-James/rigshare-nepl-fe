import { useMutation } from "react-query";

import { toast } from "react-toastify";
import Axios from "../../../constants/api_management/MyHttpHelper";

const useForgotPasswordManager = (email) => {
  const forgotPasswordController = async (details) => {
    try {
      const response = await Axios.post(`/auth/forgot-password`, details);

      return response?.data;
    } catch (error) {
      throw new Error(`${error?.response?.data?.message}`);
    }
  };

  const mutation = useMutation(forgotPasswordController, {
    // onSuccess: async () => {
    //   window.location.href = `/otp?email=${email}&mode=login`;
    // },
    // onError: (error) => {
    //   toast.error(error?.message);
    //   // console.error("Login error:", error);
    // },
  });

  const forgotPassword = async (details) => {
    try {
      await mutation.mutateAsync(details);
    } catch (error) {
      // Handle error if necessary
      console.error("error:", error);
    }
  };

  return {
    forgotPassword,
    data: mutation?.data,
    isLoading: mutation?.isLoading,
    isSuccess: mutation?.isSuccess,
    error: mutation?.error,
  };
};

export default useForgotPasswordManager;
