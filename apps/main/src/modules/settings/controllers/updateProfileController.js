import useFormDataUpdateManager from "../../../constants/controller_templates/put_formdata_controller_template";

export const UpdateProfileManager = () => {
  const { updateCaller, isLoading, isSuccess, error, data } =
    useFormDataUpdateManager(`/clients/staffs/profile/`, ["user"], false, true);
  const updateProfile = async (details) => {
    try {
      await updateCaller(details);
    } catch (error) {
      console.error("error:", error);
    }
  };
  return {
    updateProfile,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
