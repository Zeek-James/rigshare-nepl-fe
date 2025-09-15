import usePostManager from "../../../../constants/controller_templates/post_controller_template";

export const PostBulkClientsManager = () => {
  const { postCaller, isLoading, isSuccess, error, data } = usePostManager(
    `/clients/bulk/upload/`,
    ["clients"],
    true
  );
  const postBulkClients = async (details) => {
    try {
      await postCaller(details);
    } catch (error) {
      console.error("error:", error);
    }
  };
  return {
    postBulkClients,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
