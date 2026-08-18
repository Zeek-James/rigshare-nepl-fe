import useUpdateManager from "../../../../constants/controller_templates/put_controller_template";

export const UpdateRoleManager = ({ id }) => {
  const { updateCaller, isLoading, isSuccess, error, data } = useUpdateManager(
    `/clients/roles/${id}/`,
    ["roles"],
    false,
    true
  );
  const updateClient = async (details) => {
    try {
      await updateCaller(details);
    } catch (error) {
      console.error("error:", error);
    }
  };
  return {
    updateClient,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
