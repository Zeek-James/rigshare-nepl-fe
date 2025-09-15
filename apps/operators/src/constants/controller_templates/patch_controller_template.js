import { useMutation, useQueryClient } from "react-query";

// import Axios from "../../../constants/api_management/MyHttpHelper";
import AxiosWithToken from "../api_management/MyHttpHelperWithToken";
import { toast } from "react-toastify";
import { Axios } from "axios";

const usePatchManager = (
  endpoint,
  queryKey,
  isMulti = false,
  isAuth = true,
  showSuccessToast = true
) => {
  const queryClient = useQueryClient();

  const patchController = async (data) => {
    try {
      const [response] = isAuth
        ? [await AxiosWithToken.patch(endpoint, data)]
        : [await Axios.put(endpoint, data)];
      // //console.log(`i am checking this ${response.status}`);
      return response.data;
    } catch (error) {
      //console.log(error.response.data);
      throw new Error(`Sorry: ${error?.response?.data?.message}`);
    }
  };

  const mutation = useMutation(patchController, {
    onSuccess: async (data) => {
      // Update other caches using useQuery
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
      // Handle error if necessary
      console.error("Update error:", error);
    },
  });

  const patchCaller = async (details) => {
    try {
      await mutation.mutateAsync(details);
    } catch (error) {
      // Handle error if necessary
      console.error("Update error:", error);
    }
  };

  return {
    patchCaller,
    data: mutation.data,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};

export default usePatchManager;
