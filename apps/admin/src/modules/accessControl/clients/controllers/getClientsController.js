import { useQuery } from "react-query";
import AxiosWithToken from "../../../../constants/api_management/MyHttpHelperWithToken";

const useGetClientsManager = ({
  type,
  page = "",
  searchQuery = "",
  enabled = true,
  pageSize = "15",
}) => {
  return useQuery(
    ["clients", page, type, searchQuery],
    async () => {
      try {
        const [response] = [
          await AxiosWithToken.get(
            `/clients?type=${type}&page=${page}&size=${pageSize}${searchQuery}`
          ),
        ];

        //console.log(`i am checking this ${response.data.data.user.role.name}`);
        return response.data;
      } catch (error) {
        //console.log(error.response.data);
        throw new Error(`Sorry: ${error.response.data.message}`);
      }
    },
    {
      enabled: enabled,
      refetchOnWindowFocus: false,
    }
  );
};

export default useGetClientsManager;
