import useDeleteManager from "../../../../constants/controller_templates/delete_controller_template";

export const DeleteRoleManager = ({ id }) => {
  const { deleteCaller, isLoading, isSuccess, error, data } = useDeleteManager(
    `/clients/roles/${id}`,
    ["roles"]
  );
  const deleteRole = async () => {
    try {
      await deleteCaller();
    } catch (error) {
      console.error("error:", error);
    }
  };
  return {
    deleteRole,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
