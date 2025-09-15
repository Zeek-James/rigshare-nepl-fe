import React, { useEffect, useState } from "react";
import { CreateTicketManager } from "../controllers/createTicketController";
import ModalManagement from "../../../generalComponents/ModalManagement";
import CustomButton from "../../../generalComponents/Button";
import InputWithFullBoarder from "../../../generalComponents/InputWithFullBoarder";
import { AiOutlinePaperClip } from "react-icons/ai";
import SelectWithFullBorder from "../../../generalComponents/SelectWithFullBorder";

const CreateTicketModals = ({ details }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    module: "",
    priority: "",
    body: "",
  });

  const moduleOptions = [
    { name: "Performance", id: "performance" },
    { name: "Division User Management", id: "division" },
  ].map((role) => ({
    label: role.name,
    value: role.id,
  }));

  const priorityOptions = [
    { name: "High", id: "high" },
    { name: "Medium", id: "medium" },
    { name: "Low", id: "low" },
  ].map((role) => ({
    label: role.name,
    value: role.id,
  }));

  const { createTicket, isLoading, isSuccess } = CreateTicketManager();

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const clearFields = () => {
    setFormData({
      title: "",
      module: "",
      priority: "",
      body: "",
    });
    setFile(null);
    setFileName("");
  };

  const handleCreateTicket = async () => {
    const ticketData = {
      ...formData,
      attachment: file,
    };

    await createTicket(ticketData);
  };
  useEffect(() => {
    if (isSuccess) {
      clearFields();
      document.getElementById("create_ticket").close();
    }
  }, [isSuccess]);

  return (
    <div>
      <ModalManagement
        id={"create_ticket"}
        title={"Create a new ticket"}
        onClose={clearFields}
      >
        <div className='md:w-[599px] h-auto rounded-[6px] relative bg-white flex flex-col pt-6'>
          <div className='flex flex-col md:flex-row md:space-x-2'>
            <div className='flex-1'>
              <InputWithFullBoarder
                label={"Ticket Title"}
                placeholder={"Enter Subject"}
                type={"text"}
                required
                value={formData.title}
                onChange={handleChange("title")}
              />
            </div>
            <div className='flex-1'>
              <SelectWithFullBorder
                label={"Module"}
                selectOptions={moduleOptions}
                value={formData.module}
                onChange={handleChange("module")}
                placeholder='Select Input Field'
                required
              />
            </div>
          </div>
          <div className='flex flex-col md:flex-row md:space-x-2'>
            <div className='flex-1'>
              <SelectWithFullBorder
                label={"Priority Level"}
                selectOptions={priorityOptions}
                value={formData.priority}
                onChange={handleChange("priority")}
                placeholder='Select Input Field'
                required
              />
            </div>
          </div>
          <div className='flex flex-col md:flex-row md:space-x-2'>
            <div className='flex-1'>
              <InputWithFullBoarder
                label={"Description"}
                placeholder={"Enter Your Message"}
                type={"text"}
                isTextArea
                value={formData.body}
                onChange={handleChange("body")}
                required
              />
            </div>
          </div>
          {/* Attachment Section */}
          <div className='flex items-center justify-end mt-2 space-x-2'>
            <label
              htmlFor='file-upload'
              className='flex items-center text-brandPurple cursor-pointer'
            >
              <AiOutlinePaperClip size={20} />
              <span className='ml-1'>Attach File</span>
            </label>
            <input
              type='file'
              id='file-upload'
              className='hidden'
              onChange={handleFileChange}
              accept='.png, .jpeg, .jpg, .pdf'
            />
            {fileName && (
              <span className='text-sm text-gray-500'>{fileName}</span>
            )}
          </div>
          <div className='flex justify-end space-x-2 mt-4 w-full'>
            <CustomButton
              buttonText={"Cancel"}
              textColor={"#344054"}
              className='bg-white border border-gray-600'
              onClick={() => {
                document.getElementById("create_ticket").close();
                clearFields();
              }}
            />
            <CustomButton
              buttonText={"Create Ticket"}
              onClick={handleCreateTicket}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ModalManagement>
    </div>
  );
};

export default CreateTicketModals;
