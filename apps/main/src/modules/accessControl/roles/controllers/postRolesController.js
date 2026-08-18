import usePostManager from "../../../../constants/controller_templates/post_controller_template";

export const PostRolesManager = () => {
  const { postCaller, isLoading, isSuccess, error, data } = usePostManager(
    `/clients/roles/`,
    ["roles"],
    true
  );
  const postRole = async (details) => {
    try {
      await postCaller(details);
    } catch (error) {
      console.error("error:", error);
    }
  };
  return {
    postRole,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
