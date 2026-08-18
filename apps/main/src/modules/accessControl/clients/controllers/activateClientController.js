import usePatchManager from "../../../../constants/controller_templates/patch_controller_template";

export const ActivateClientManager = ({ id }) => {
  const { patchCaller, isLoading, isSuccess, error, data } = usePatchManager(
    `/clients/${id}/activate/`,
    ["clients"],
    false,
    true
  );
  const activateClient = async (details) => {
    try {
      await patchCaller(details);
    } catch (error) {
      console.error("error:", error);
    }
  };
  return {
    activateClient,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
