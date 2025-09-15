import { useQuery } from "react-query";
import AxiosWithToken from "../../../../constants/api_management/MyHttpHelperWithToken";

const useGetPermissionsManager = (enabled = true) => {
  return useQuery(
    ["permissions"],
    async () => {
      try {
        const [response] = [await AxiosWithToken.get("/modules/permissions")];
        //console.log(`i am checking this ${response.status}`);
        return response.data;
      } catch (error) {
        //console.log(error.response.data);
        throw new Error(`Sorry: ${error.response.data.message}`);
      }
    },
    {
      enabled: enabled, // The query won't run if this is false
    }
  );
};

export default useGetPermissionsManager;
