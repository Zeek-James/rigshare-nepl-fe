import useFormDataPostManager from "../../../constants/controller_templates/post_formdata_controller_template";

export const CreateThreadsManager = (id) => {
  const { postCaller, isLoading, isSuccess, error, data } =
    useFormDataPostManager(
      `/support/ticket/${id}/threads`,
      ["support", id],
      true
    );
  const postThread = async (details) => {
    try {
      await postCaller(details);
    } catch (error) {
      console.error("error:", error);
    }
  };
  return {
    postThread,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
