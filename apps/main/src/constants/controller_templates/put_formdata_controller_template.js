import { useMutation, useQueryClient } from "react-query";
import AxiosWithToken from "../api_management/MyHttpHelperWithToken";
import { toast } from "react-toastify";
import { Axios } from "axios";

const useFormDataUpdateManager = (
  endpoint,
  queryKey,
  isMulti = false,
  isAuth = true,
  showSuccessToast = true
) => {
  const queryClient = useQueryClient();

  const updateController = async (data) => {
    try {
      // Convert the data object to FormData
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const [response] = isAuth
        ? [await AxiosWithToken.put(endpoint, formData, config)]
        : [await Axios.put(endpoint, formData, config)];

      return response.data;
    } catch (error) {
      throw new Error(
        `Sorry: ${error.response?.data?.message || "An error occurred"}`
      );
    }
  };

  const mutation = useMutation(updateController, {
    onSuccess: async (data) => {
      if (showSuccessToast) {
        toast.success(data.message);
      }

      const updateQueryKeys = isMulti ? queryKey : [queryKey];
      if (updateQueryKeys.length) {
        updateQueryKeys.forEach((key) => queryClient.invalidateQueries(key));
      }
    },
    onError: (error) => {
      toast.error(error.message);
      console.error("Update error:", error);
    },
  });

  const updateCaller = async (details) => {
    try {
      await mutation.mutateAsync(details);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return {
    updateCaller,
    data: mutation.data,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};

export default useFormDataUpdateManager;
