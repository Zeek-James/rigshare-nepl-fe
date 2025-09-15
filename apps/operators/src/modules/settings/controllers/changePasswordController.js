import usePostManager from "../../authentication/controller/post_controller_template";

export const ChangePasswordManager = () => {
  const { postCaller, isLoading, isSuccess, error, data } = usePostManager(
    `/users/password`,
    [""],
    true
  );
  const changePassword = async (details) => {
    try {
      await postCaller(details);
    } catch (error) {
      console.error("error:", error);
    }
  };
  return {
    changePassword,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
