import { useQuery } from "react-query";
import AxiosWithToken from "../../../../constants/api_management/MyHttpHelperWithToken";

const useGetClientById = ({id, enabled}) => {
  return useQuery([id, 'clientbyid'], async () => {
    try {
      const [response] = [await AxiosWithToken.get(`/clients/${id}`)];
      //console.log(`i am checking this ${response.status}`);
      return response.data;
    } catch (error) {
      //console.log(error.response.data);
      throw new Error(`Sorry: ${error.response.data.message}`);
    }
  },     {
    enabled: !!id
  });
};

export default useGetClientById;
