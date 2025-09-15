import usePostManager from "../../../../constants/controller_templates/post_controller_template";

export const PostRolesandPermissionsManager = () => {
  const { postCaller, isLoading, isSuccess, error, data } = usePostManager(
    `/clients/roles/`,
    ["roles"],
    true
  );
  const postRolesandPermissions = async (details) => {
    try {
      await postCaller(details);
    } catch (error) {
      console.error("error:", error);
    }
  };
  return {
    postRolesandPermissions,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
