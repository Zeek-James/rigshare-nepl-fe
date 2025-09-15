import useUpdateManager from "../../../../constants/controller_templates/put_controller_template";

export const UpdateClientsPermissionsController = ({id}) => {
  const { updateCaller, isLoading, isSuccess, error, data } = useUpdateManager(
    `/clients/${id}/`,
    ["clientPermissions"],
    false,
    true
  );
  const updateClientPermissions = async (details) => {
    try {
      await updateCaller(details);
    } catch (error) {
      console.error("error:", error);
    }
  };
  return {
    updateClientPermissions,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
