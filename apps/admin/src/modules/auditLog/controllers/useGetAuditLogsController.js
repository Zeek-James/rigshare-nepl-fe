import { useQuery } from "react-query";
import AxiosWithToken from "../../../constants/api_management/MyHttpHelperWithToken";

const useGetAuditLogManager = ({
  page = "",
  searchQuery = "",
  status = "",
  pageSize = "15",
  enabled = true,
}) => {
  return useQuery(
    ["log", page, searchQuery, pageSize, status],
    async () => {
      try {
        const [response] = [
          await AxiosWithToken.get(
            `/users/activities?page=${page}&size=${pageSize}${status}${searchQuery}`
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

export default useGetAuditLogManager;
