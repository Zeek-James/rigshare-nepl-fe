import usePostManager from "../../../../constants/controller_templates/post_controller_template";

export const PostStaffManager = () => {
  const { postCaller, isLoading, isSuccess, error, data } = usePostManager(
    `/clients/staffs/`,
    ["users"],
    true
  );
  const postStaff = async (details) => {
    try {
      await postCaller(details);
    } catch (error) {
      console.error("error:", error);
    }
  };
  return {
    postStaff,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
