import usePostManager from "../../../../constants/controller_templates/post_controller_template";

export const CreateAssetGroupManager = () => {
  const { postCaller, isLoading, isSuccess, error, data } = usePostManager(
    "/clients/asset-groups/",
    ["assetgroups"],
    true
  );
  const createAssetGroup = async (details) => {
    try {
      await postCaller(details);
    } catch (error) {
      console.error("error:", error);
    }
  };
  return {
    createAssetGroup,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
