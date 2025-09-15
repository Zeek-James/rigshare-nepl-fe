import { useMutation } from "react-query";
// import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import Axios from "../../../constants/api_management/MyHttpHelper";

const usePasswordResetManager = (email) => {
  // const navigate = useNavigate();
  const loginController = async (details) => {
    try {
      const response = await Axios.get(
        `/auth/password/reset?email=${email}`,
        details
      );

      return response?.data;
    } catch (error) {
      throw new Error(`${error?.response?.data?.message}`);
    }
  };

  const mutation = useMutation(loginController, {
    onSuccess: async () => {
      toast.success("Kindly check your email");

      // navigate(`/reset-password?email=${email}`);
      // window.location.href = `/otp?email=${email}&mode=reset`;
    },

    onError: (error) => {
      // Handle error if necessary
      toast.error(error?.message);
      console.error("Login error:", error);
    },
  });

  const login = async (details) => {
    try {
      await mutation.mutateAsync(details);
    } catch (error) {
      // Handle error if necessary
      console.error("Login error:", error);
    }
  };

  return {
    login,
    data: mutation?.data,
    isLoading: mutation?.isLoading,
    isSuccess: mutation?.isSuccess,
    error: mutation?.error,
  };
};

export default usePasswordResetManager;
