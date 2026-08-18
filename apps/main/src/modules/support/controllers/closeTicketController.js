import usePatchManager from "../../../constants/controller_templates/patch_controller_template";

export const CloseTicketManager = ({ id }) => {
  const { patchCaller, isLoading, isSuccess, error, data } = usePatchManager(
    `/support/ticket/${id}/close`,
    ["support", id],
    false,
    true
  );
  const closeTicket = async (details) => {
    try {
      await patchCaller(details);
    } catch (error) {
      console.error("error:", error);
    }
  };
  return {
    closeTicket,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
