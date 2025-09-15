import { useQuery } from "react-query";
import AxiosWithToken from "../../../../constants/api_management/MyHttpHelperWithToken";

const useGetAssetGroupsManager = ({
  page,
  searchQuery = "",
  enabled = true,
  pageSize = "15",
  contract_type = "",
}) => {
  return useQuery(
    ["assetgroups", page, searchQuery, contract_type],
    async () => {
      try {
        const [response] = [
          await AxiosWithToken.get(
            `/clients/asset-groups/?page=${page}&size=${pageSize}${searchQuery}${contract_type}`
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

export default useGetAssetGroupsManager;
