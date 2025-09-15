import { useQuery } from "react-query";
import AxiosWithToken from "../../../../constants/api_management/MyHttpHelperWithToken";

const useGetRoleById = ({ id, enabled }) => {
  return useQuery(
    [id, "roles"],
    async () => {
      try {
        const [response] = [await AxiosWithToken.get(`/clients/roles/${id}`)];
        //console.log(`i am checking this ${response.status}`);
        return response.data;
      } catch (error) {
        //console.log(error.response.data);
        throw new Error(`Sorry: ${error.response.data.message}`);
      }
    },
    {
      enabled: !!id,
    }
  );
};

export default useGetRoleById;
