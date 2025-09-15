import { useMutation, useQueryClient } from "react-query";
import AxiosWithToken from "../api_management/MyHttpHelperWithToken";
import Axios from "../api_management/MyHttpHelper";
import { toast } from "react-toastify";

const useFormDataPostManager = (endpoint, queryKey, isAuth = true) => {
  const queryClient = useQueryClient();

  const postController = async (details) => {
    try {
      // Convert the details object to FormData
      const formData = new FormData();
      Object.keys(details).forEach((key) => {
        if (details[key] !== null && details[key] !== undefined) {
          formData.append(key, details[key]);
        }
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const [response] = isAuth
        ? [await AxiosWithToken.post(endpoint, formData, config)]
        : [await Axios.post(endpoint, formData, config)];

      return response.data;
    } catch (error) {
      throw new Error(
        `Sorry: ${error.response?.data?.message || "An error occurred"}`
      );
    }
  };

  const mutation = useMutation(postController, {
    onSuccess: async (data) => {
      toast.success(data.message);
      const updateQueryKeys = [queryKey];
      if (updateQueryKeys.length) {
        updateQueryKeys.forEach((key) => queryClient.invalidateQueries(key));
      }
    },
    onError: (error) => {
      toast.error(error?.message);
      console.error("Post error:", error);
    },
  });

  const postCaller = async (details) => {
    try {
      await mutation.mutateAsync(details);
    } catch (error) {
      console.error("Post error:", error);
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

export default useFormDataPostManager;
