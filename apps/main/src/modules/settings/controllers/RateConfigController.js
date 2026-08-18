import usePatchManager from "../../../constants/controller_templates/patch_controller_template";

export const RateConfigManager = (id) => {
  const { patchCaller, isLoading, isSuccess, error, data } = usePatchManager(
    `/modules/config`,
    ["config"],
    false,
    true
  );
  const configureRate = async (details) => {
    try {
      await patchCaller(details);
    } catch (error) {
      console.error("error:", error);
    }
  };
  return {
    configureRate,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
