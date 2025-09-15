import { useQuery } from "react-query";
import AxiosWithToken from "../../../../constants/api_management/MyHttpHelperWithToken";

const useGetRolesManager = ({
  page,
  searchQuery = "",
  enabled = true,
  pageSize = "15",
}) => {
  return useQuery(
    ["roles", page, searchQuery],
    async () => {
      try {
        const [response] = [
          await AxiosWithToken.get(
            `/clients/roles/?page=${page}&size=${pageSize}${searchQuery}`
          ),
        ];
        //console.log(`i am checking this ${response.status}`);
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

export default useGetRolesManager;
