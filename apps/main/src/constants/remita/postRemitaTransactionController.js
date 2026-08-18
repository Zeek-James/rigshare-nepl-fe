import usePostManager from "../controller_templates/post_controller_template";

export const PostRemitaTransaction = ({ id }) => {
  const { postCaller, isLoading, isSuccess, error, data } = usePostManager(
    `/auctions/${id}/transactions/remita/verify/`,
    ["auction"],
    true
  );
  const verifyRemita = async (details) => {
    try {
      await postCaller(details);
    } catch (error) {
      console.error("error:", error);
    }
  };
  return {
    verifyRemita,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
