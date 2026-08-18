import usePatchManager from "../../../constants/controller_templates/patch_controller_template";

export const FreightCostManager = (id) => {
  const { patchCaller, isLoading, isSuccess, error, data } = usePatchManager(
    `/clients/profile/`,
    ["config"],
    false,
    true
  );
  const updateFreightCost = async (details) => {
    try {
      await patchCaller(details);
    } catch (error) {
      console.error("error:", error);
    }
  };
  return {
    updateFreightCost,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
