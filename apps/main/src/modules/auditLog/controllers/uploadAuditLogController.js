import useUploadFileManager from "../../../constants/controller_templates/post_upload_file_controller";

export const UploadFinancialDataManager = () => {
  const { uploadCaller, data, isLoading, isSuccess, error } =
    useUploadFileManager(`/financial/upload/`, ["financial"]);

  const uploadFinancialData = async (file) => {
    try {
      await uploadCaller(file);
    } catch (error) {
      console.error("error:", error);
    }
  };

  return {
    uploadFinancialData,
    data,
    isLoading,
    isSuccess,
    error,
  };
};
