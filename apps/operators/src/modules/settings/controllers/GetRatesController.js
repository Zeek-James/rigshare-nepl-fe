import { useQuery } from "react-query";
import AxiosWithToken from "../../../constants/api_management/MyHttpHelperWithToken";

const useGetRatesManager = (enabled = true) => {
  return useQuery(
    ["rate", enabled],
    async () => {
      try {
        const [response] = [await AxiosWithToken.get(`/modules/config`)];

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

export default useGetRatesManager;
