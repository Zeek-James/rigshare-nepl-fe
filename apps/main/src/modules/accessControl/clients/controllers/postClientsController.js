import usePostManager from "../../../../constants/controller_templates/post_controller_template";

export const PostClientsManager = () => {
  const { postCaller, isLoading, isSuccess, error, data } = usePostManager(
    `/clients`,
    ["clients"],
    true
  );
  const postClient = async (details) => {
    try {
      await postCaller(details);
    } catch (error) {
      console.error("error:", error);
    }
  };
  return {
    postClient,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
