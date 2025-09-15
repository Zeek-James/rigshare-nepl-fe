import useUpdateManager from "../../../constants/controller_templates/put_controller_template";

export const UpdateRolePermissionsManager = ({ id }) => {
  const { updateCaller, isLoading, isSuccess, error, data } = useUpdateManager(
    `/clients/roles/${id}/`,
    ["roles"],
    false,
    true
  );
  const updateRolePermissions = async (details) => {
    try {
      await updateCaller(details);
    } catch (error) {
      console.error("error:", error);
    }
  };
  return {
    updateRolePermissions,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
