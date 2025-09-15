import useUpdateManager from "../../../../constants/controller_templates/put_controller_template";

export const UpdateStaffManager = ({ id }) => {
  const { updateCaller, isLoading, isSuccess, error, data } = useUpdateManager(
    `/clients/staffs/${id}/`,
    ["users"],
    false,
    true
  );
  const updateStaff = async (details) => {
    try {
      await updateCaller(details);
    } catch (error) {
      console.error("error:", error);
    }
  };
  return {
    updateStaff,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
