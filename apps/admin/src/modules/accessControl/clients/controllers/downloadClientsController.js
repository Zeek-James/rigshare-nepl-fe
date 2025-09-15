import { useQuery } from "react-query";
import AxiosWithToken from "../../../../constants/api_management/MyHttpHelperWithToken";

const useDownloadClientsManager = ({ type = "" }) => {
  return useQuery(["clients", (type = "")], async () => {
    try {
      const [response] = [
        await AxiosWithToken.get(`/clients/export/?type=${type}`),
      ];

      //console.log(`i am checking this ${response.data.data.user.role.name}`);
      return response.data;
    } catch (error) {
      //console.log(error.response.data);
      throw new Error(`Sorry: ${error.response.data.message}`);
    }
  });
};

export default useDownloadClientsManager;
