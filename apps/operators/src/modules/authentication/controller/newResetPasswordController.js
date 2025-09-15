import { useMutation } from "react-query";

import Axios from "../../../constants/api_management/MyHttpHelper";

const useResetPasswordManager = (email) => {
  const resetPasswordController = async (details) => {
    try {
      const response = await Axios.post(
        `/auth/password/reset/first-login`,
        details
      );

      return response?.data;
    } catch (error) {
      throw new Error(`${error?.response?.data?.message}`);
    }
  };

  const mutation = useMutation(resetPasswordController, {
    // onSuccess: async () => {
    //   window.location.href = `/otp?email=${email}&mode=login`;
    // },
    // onError: (error) => {
    //   toast.error(error?.message);
    //   // console.error("Login error:", error);
    // },
  });

  const resetPassword = async (details) => {
    try {
      await mutation.mutateAsync(details);
    } catch (error) {
      // Handle error if necessary
      console.error("Login error:", error);
    }
  };

  return {
    resetPassword,
    data: mutation?.data,
    isLoading: mutation?.isLoading,
    isSuccess: mutation?.isSuccess,
    error: mutation?.error,
  };
};

export default useResetPasswordManager;
