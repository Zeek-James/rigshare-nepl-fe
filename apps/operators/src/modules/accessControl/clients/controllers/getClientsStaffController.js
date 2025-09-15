import { useQuery } from "react-query";
import AxiosWithToken from "../../../../constants/api_management/MyHttpHelperWithToken";

const useGetClientsStaffManager = (id) => {
  return useQuery(['clients'], async () => {
    try {
      const [response] = [await AxiosWithToken.get(`/clients/staffs/${id}/`)];
      //console.log(`i am checking this ${response.status}`);
      return response.data;
    } catch (error) {
      //console.log(error.response.data);
      throw new Error(`Sorry: ${error.response.data.message}`);
    }
  });
};

export default useGetClientsStaffManager;
