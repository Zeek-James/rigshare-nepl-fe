import useDeleteManager from "../../../../constants/controller_templates/delete_controller_template";

export const DeleteUserManager = ({ id }) => {
  const { deleteCaller, isLoading, isSuccess, error, data } = useDeleteManager(
    `/clients/staffs/${id}`,
    ["users"]
  );
  const deleteUser = async () => {
    try {
      await deleteCaller();
    } catch (error) {
      console.error("error:", error);
    }
  };
  return {
    deleteUser,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
