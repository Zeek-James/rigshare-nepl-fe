import { useMutation, useQueryClient } from "react-query";
import AxiosWithToken from "../../../constants/api_management/MyHttpHelperWithToken";
import Axios from "../../../constants/api_management/MyHttpHelper";
import { toast } from "react-toastify";

const usePostChangePasswordManager = (endpoint, queryKey, isAuth = true) => {
  const queryClient = useQueryClient();
  const postController = async (details) => {
    try {
      const [response] = isAuth
        ? [await AxiosWithToken.post("/users/password", details)]
        : [await Axios.post("/users/password", details)];
      // console.log(`i am checking this ${response.data}`);
      return response.data;
    } catch (error) {
      console.log(error?.response?.data?.message);
      throw new Error(`Sorry 1: ${error.response?.data?.message}`);
    }
  };

  const mutation = useMutation(postController, {
    onSuccess: async (data) => {
      // Update other caches using useQuery
      toast.success(data.message);
      const updateQueryKeys = [queryKey];
      if (updateQueryKeys.length) {
        updateQueryKeys.forEach((key) => queryClient.invalidateQueries(key));
      }
    },
    onError: (error) => {
      // Handle error if necessary
      toast.error(error.data.message);
      console.error("Post error 2:", error.data.message);
    },
  });

  const postCaller = async (details) => {
    try {
      await mutation.mutateAsync(details);
    } catch (error) {
      // Handle error if necessary
      console.error("Post error 3:", error);
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

export default usePostChangePasswordManager;
