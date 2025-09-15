import React, { useState } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";

const AttachmentUpload = ({
  className = "my-5",
  onFileChange,
  fileName,
  accept = ".png, .jpeg, .jpg, .pdf",
  fileFormat = "PNG, JPG",
  description = "Choose a File or drag and drop it here (2MB)",
  title,
  required,
}) => {
  const inputId = React.useId(); // ensures unique input id

  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileChange({ target: { files: e.dataTransfer.files } });
    }
  };

  return (
    <div className={className}>
      <label className='text-13px md:text-14px font-medium mb-2'>
        {title && (
          <>
            {title}
            {required && <span className='text-red-700 text-[14px]'>*</span>}
          </>
        )}
      </label>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={`text-sm text-gray-500 flex flex-col items-center justify-center max-h-[123px] p-2 py-5 border rounded-md ${
          isDragOver ? "border-dashed border-brandPurple bg-gray-50" : ""
        } `}
      >
        <div className='mb-[4px] text-xs'>{description} </div>
        <p className='text-xs text-brandPurple'>{fileFormat}</p>
        <div className='flex items-center justify-end mt-2 space-x-2 '>
          <label
            htmlFor={inputId}
            className='flex items-center p-2 rounded-lg cursor-pointer border'
          >
            <AiOutlinePaperClip size={20} />
            <span className='ml-1'>Select File</span>
          </label>

          <input
            type='file'
            id={inputId}
            className='hidden'
            onChange={onFileChange}
            accept={accept}
          />

          {fileName && (
            <span className='text-sm text-gray-500'>{fileName}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttachmentUpload;
