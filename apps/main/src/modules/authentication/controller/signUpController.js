import { useMutation } from "react-query";

import { toast } from "react-toastify";
import Axios from "../../../constants/api_management/MyHttpHelper";

const useSignUpManager = (email) => {
  const signUpController = async (details) => {
    try {
      const response = await Axios.post(`/auth/signUp`, details);
      // console.log({ response });

      return response?.data;
    } catch (error) {
      throw new Error(`${error?.response?.data?.message}`);
    }
  };

  const mutation = useMutation(signUpController, {
    onSuccess: async () => {
      window.location.href = `/otp?email=${email}&mode=sign-up`;
    },
    onError: (error) => {
      toast.error(error?.message);
      // console.error("signUp error:", error);
    },
  });

  const signUp = async (details) => {
    try {
      await mutation.mutateAsync(details);
    } catch (error) {
      // Handle error if necessary
      console.error("Sign Up error:", error);
    }
  };

  return {
    signUp,
    data: mutation?.data,
    isLoading: mutation?.isLoading,
    isSuccess: mutation?.isSuccess,
    error: mutation?.error,
  };
};

export default useSignUpManager;
