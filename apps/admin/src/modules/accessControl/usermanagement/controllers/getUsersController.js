import { useQuery } from "react-query";
import AxiosWithToken from "../../../../constants/api_management/MyHttpHelperWithToken";

const useGetStaffManager = ({
  page = 1,
  searchQuery = "",
  enabled = true,
  pageSize = "15",
  role = "",
}) => {
  return useQuery(
    ["users", page, role, searchQuery],
    async () => {
      try {
        const [response] = [
          await AxiosWithToken.get(
            `/clients/staffs/?page=${page}&role=${role}&size=${pageSize}${searchQuery}`
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

export default useGetStaffManager;
