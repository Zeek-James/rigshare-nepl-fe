import { useCallback, useEffect, useState } from "react";
// import { uploadIcon } from "../../../assets/icons";
import CustomButton from "../generalComponents/Button";
import ModalManagement from "../generalComponents/ModalManagement";
import { uploadIcon } from "../assets/icons";
import { toast } from "react-toastify";

const DataUploadModal = ({
  modalId,
  title,
  uploadManager,
  uploading,
  isSuccess,
  accept = ".xlsx,.xls",
}) => {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  const handleFileChange = useCallback((event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setValidationErrors([]);
  }, []);

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    setDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    setValidationErrors([]);
  }, []);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    try {
      await uploadManager(file);
      setFile(null);
      setValidationErrors([]);
    } catch (uploadError) {
      console.error("Upload error:", uploadError);
      toast.error(
        "An error occurred while uploading the file. Please try again."
      );
    }
  };

  useEffect(() => {
    if (isSuccess) {
      document.getElementById(modalId).close();
      setFile(null);
    }
  }, [isSuccess, modalId]);

  const clearFile = () => {
    setFile(null);
    setValidationErrors([]);
  };

  return (
    <ModalManagement id={modalId} title={title} onClose={clearFile}>
      <div
        className={`w-auto h-auto rounded-[6px] bg-white flex flex-col pt-2 ${
          dragging ? "bg-gray-100" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className='flex flex-col items-center justify-center'>
          {file ? (
            <div className='w-[473px] h-[264px] text-center border border-gray-400 mb-4 rounded-md flex flex-col items-center justify-center'>
              <p className='mt-2 text-[14px]'>File Name: {file.name}</p>
            </div>
          ) : (
            <div className='w-[473px] h-[264px] text-center border border-dashed border-gray-400 mb-4 rounded-md flex flex-col items-center justify-center'>
              <img src={uploadIcon} className='mb-4' alt='Upload Icon' />
              <input
                type='file'
                id='fileInput'
                className='hidden'
                onChange={handleFileChange}
                accept={accept}
              />
              <label
                htmlFor='fileInput'
                className='cursor-pointer flex flex-col items-center'
              >
                <p className='text-[14px]'>
                  <span className='font-medium text-brandPurple'>
                    Click to Upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className='text-[12px] text-[#98A2B3]'>File format: .xlsx</p>
              </label>
            </div>
          )}
        </div>

        <div className='flex space-x-2 mt-4 w-full'>
          <CustomButton
            buttonText={validationErrors?.length > 0 ? "Go back" : "Cancel"}
            onClick={() => {
              document.getElementById(modalId).close();
              clearFile();
            }}
            className='bg-transparent text-brandPurple border border-brandPurple w-full'
            textColor={"#358619"}
          />

          <CustomButton
            buttonText={title}
            onClick={handleUpload}
            className='bg-brandPurple text-white px-4 py-2 rounded-md w-full'
            disabled={uploading || !file}
            isLoading={uploading}
          />
        </div>
      </div>
    </ModalManagement>
  );
};

export default DataUploadModal;
