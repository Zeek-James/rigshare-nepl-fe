import usePatchManager from "../../../../constants/controller_templates/patch_controller_template";

export const DeactivateClientManager = ({ id }) => {
  const { patchCaller, isLoading, isSuccess, error, data } = usePatchManager(
    `/clients/${id}/deactivate/`,
    ["clients"],
    false,
    true
  );
  const deactivateClient = async (details) => {
    try {
      await patchCaller(details);
    } catch (error) {
      console.error("error:", error);
    }
  };
  return {
    deactivateClient,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
