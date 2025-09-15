import { useQuery } from "react-query";
import Axios from "../api_management/MyHttpHelper";
import AxiosWithToken from "../api_management/MyHttpHelperWithToken";

const useGetManager = (eventId) => {
  return useQuery(["enterKeyHere"], async () => {
    try {
      const [response] = [await AxiosWithToken.get(`endpoint`)];
      //console.log(`i am checking this ${response.status}`);
      return response.data;
    } catch (error) {
      //console.log(error.response.data);
      throw new Error(`Sorry: ${error.response.data.message}`);
    }
  });
};

export default useGetManager;
