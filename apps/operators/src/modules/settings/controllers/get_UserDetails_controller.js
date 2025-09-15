import { useQuery } from "react-query";
import AxiosWithToken from "../../../constants/api_management/MyHttpHelperWithToken";

const useGetUserDetailsManager = (enabled = true) => {
  return useQuery(
    ["user"],
    async () => {
      try {
        const [response] = [
          await AxiosWithToken.get(`/clients/staffs/profile/`),
        ];

        //console.log(`i am checking this ${response.data.data.user.role.name}`);
        return response.data;
      } catch (error) {
        //console.log(error.response.data);
        throw new Error(`Sorry: ${error.response.data.message}`);
      }
    },
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  );
};

export default useGetUserDetailsManager;
