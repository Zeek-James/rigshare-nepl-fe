import { useQuery } from "react-query";
import AxiosWithToken from "../../../constants/api_management/MyHttpHelperWithToken";

const useGetTicketsManager = ({
  page = 1,
  searchValue = "",
  enabled = true,
  pageSize = "15",
  status = "",
  is_mine = "",
  priority,
}) => {
  return useQuery(
    ["support", page, searchValue, status, is_mine, priority],
    async () => {
      try {
        const [response] = [
          await AxiosWithToken.get(
            // `/support/tickets?status=${status}&is_mine=${is_mine}&page=${page}&size=${pageSize}${searchValue}`
            `/support/tickets?status=${status}&page=${page}&size=${pageSize}${searchValue}${priority}`
          ),
        ];

        return response.data;
      } catch (error) {
        throw new Error(`Sorry: ${error.response.data.message}`);
      }
    },

    {
      enabled: enabled,
      refetchOnWindowFocus: true,
    }
  );
};

export default useGetTicketsManager;
