import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import AxiosWithToken from "../api_management/MyHttpHelperWithToken";

const useUploadFileManager = (endpoint, queryKey) => {
  const queryClient = useQueryClient();

  const uploadController = async (file) => {
    const formData = new FormData();
    formData.append('file', file); // Append the file to FormData

    try {
      const response = await AxiosWithToken.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set Content-Type for file upload
        },
      });
      return response.data;
    } catch (error) {
      // Throw the entire error object to handle it properly later
      throw error;
    }
  };

  const mutation = useMutation(uploadController, {
    onSuccess: async (data) => {
      toast.success(data.message);
      const updateQueryKeys = [queryKey];
      if (updateQueryKeys.length) {
        updateQueryKeys.forEach((key) => queryClient.invalidateQueries(key));
      }
    },
    onError: (error) => {
      // Handle error if necessary
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
      console.error("Upload error:", error);
    },
  });

  const uploadCaller = async (file) => {
    try {
      await mutation.mutateAsync(file);
    } catch (error) {
      // Handle error if necessary
      console.error("Upload error:", error);
      // Propagate the error to be caught by the component
      throw error;
    }
  };

  return {
    uploadCaller,
    data: mutation.data,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};

export default useUploadFileManager;