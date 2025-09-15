import useFormDataPostManager from "../../../constants/controller_templates/post_formdata_controller_template";

export const CreateTicketManager = () => {
  const { postCaller, isLoading, isSuccess, error, data } =
    useFormDataPostManager("/support/tickets", ["support"], true);
  const createTicket = async (details) => {
    try {
      await postCaller(details);
    } catch (error) {
      console.error("error:", error);
    }
  };
  return {
    createTicket,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
