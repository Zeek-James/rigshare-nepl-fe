import useDeleteManager from "../../../../constants/controller_templates/delete_controller_template";

export const DeleteAssetGroupManager = ({ id }) => {
  const { deleteCaller, isLoading, isSuccess, error, data } = useDeleteManager(
    `/clients/asset-groups/${id}`,
    ["assetgroups"]
  );
  const deleteAssetGroup = async () => {
    try {
      await deleteCaller();
    } catch (error) {
      console.error("error:", error);
    }
  };
  return {
    deleteAssetGroup,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
