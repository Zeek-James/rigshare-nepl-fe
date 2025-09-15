import { useQuery } from "react-query";
import AxiosWithToken from "../api_management/MyHttpHelperWithToken";

const useGetRemitaTransaction = ({ id }) => {
  return useQuery(
    [id, "auction"],
    async () => {
      try {
        const [response] = [
          await AxiosWithToken.get(
            `/auctions/${id}/transactions/remita/initiate/`
          ),
        ];
        return response.data;
      } catch (error) {
        throw new Error(`Sorry: ${error.response.data.message}`);
      }
    },
    {
      enabled: false, // Disable automatic fetching
      retry: false, // Don't retry on failure
    }
  );
};

export default useGetRemitaTransaction;
