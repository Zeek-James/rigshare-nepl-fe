import { useMutation } from "react-query";

import { toast } from "react-toastify";
import Axios from "../../../constants/api_management/MyHttpHelper";

const useLoginManager = (email) => {
  const loginController = async (details) => {
    try {
      const response = await Axios.post(`/auth/login`, details);
      // console.log({ response });

      return response?.data;
    } catch (error) {
      throw new Error(`${error?.response?.data?.message}`);
    }
  };

  const mutation = useMutation(loginController, {
    onSuccess: async () => {
      window.location.href = `/otp?email=${email}&mode=login`;
    },
    onError: (error) => {
      toast.error(error?.message);
      // console.error("Login error:", error);
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

export default useLoginManager;
