import { useQuery } from "react-query";
import Axios from "../../../constants/api_management/MyHttpHelper";

const useGetPosts = ({ enabled, ...params }) => {
  return useQuery(
    ["posts", enabled, params.title],
    async () => {
      try {
        const [response] = [await Axios.get(`/posts`, { params })];
        //console.log(`this is the current subscription status ${response}`);
        return response.data;
      } catch (error) {
        //console.log(error.response.data);
        throw new Error(`Sorry: ${error.response.data.message}`);
      }
    },
    { enabled: enabled }
  );
};

export default useGetPosts;
