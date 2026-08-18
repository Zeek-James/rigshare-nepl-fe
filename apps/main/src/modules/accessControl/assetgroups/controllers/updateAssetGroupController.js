import useUpdateManager from "../../../../constants/controller_templates/put_controller_template";

export const UpdateAssetGroupManager = ({ id }) => {
  const { updateCaller, isLoading, isSuccess, error, data } = useUpdateManager(
    `/clients/asset-groups/${id}/`,
    ["assetgroups"],
    false,
    true
  );
  const updateAssetGroup = async (details) => {
    try {
      await updateCaller(details);
    } catch (error) {
      console.error("error:", error);
    }
  };
  return {
    updateAssetGroup,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
