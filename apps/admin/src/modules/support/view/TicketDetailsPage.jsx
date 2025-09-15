import React, { useEffect, useState } from "react";
import BaseDashboardNavigation from "../../../generalComponents/BaseDashboardNavigation";
import GoBackButton from "../../../generalComponents/GoBackButton";
import { userIcon } from "../../../assets/icons";
import ButtonWithIcon from "../../../generalComponents/ButtonWithIcon";
import { useParams } from "react-router-dom";
import useGetThreadsManager from "../controllers/getThreadsController";
import { BiSend } from "react-icons/bi";
import { CreateThreadsManager } from "../controllers/postThreadsController";
import StatusButton from "../../../generalComponents/StatusButton";
import { MdAttachment } from "react-icons/md";
import { AiOutlinePaperClip } from "react-icons/ai";
import { CloseTicketManager } from "../controllers/closeTicketController";
import InputWithFullBorder from "../../../generalComponents/InputWithFullBoarder";

const TicketDetailsPage = () => {
  const { id } = useParams();
  const { data } = useGetThreadsManager({ id: id });
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const {
    postThread,
    isLoading: posting,
    isSuccess,
  } = CreateThreadsManager(id);

  const { closeTicket, isLoading: closingTicket } = CloseTicketManager({
    id: id,
  });

  // First message is the initial ticket
  const ticketDetails = data?.[0] || {};
  // All subsequent messages are replies
  const replies = data || [];
  // const replies = data?.slice(1) || [];

  const handlePostThread = () => {
    if (!newMessage.trim()) return;
    postThread({ body: newMessage, ticket_id: id, attachment: file });
    setNewMessage("");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleCloseTicket = (id) => {
    closeTicket({ id });
  };

  useEffect(() => {
    if (isSuccess) {
      setFile(null);
      setFileName("");
      setNewMessage("");
    }
  }, [isSuccess]);

  return (
    <BaseDashboardNavigation>
      <div className='max-w-[1240px] w-full flex flex-col text-blackColor bg-[#f7f9fc] mx-auto relative'>
        <div className='justify-between items-center flex flex-col bg-[#f7f9fc] w-full top-0 z-10 pt-4'>
          <GoBackButton />
        </div>

        <div className='w-[800px] mx-auto'>
          {/* Ticket Header Section */}
          <div className='flex flex-col md:flex-row md:justify-between md:items-center pb-3 pt-8 gap-4'>
            <h1 className='text-2xl font-semibold text-gray-800'>
              Ticket: {ticketDetails.ticket?.ticket_id}
            </h1>
            <div className='flex gap-3'>
              <StatusButton status={ticketDetails.ticket?.status} />
              {ticketDetails.ticket?.status === "open" && (
                <ButtonWithIcon
                  buttonText={"Mark as Resolved"}
                  isLoading={closingTicket}
                  onClick={() => handleCloseTicket(id)}
                />
              )}
            </div>
          </div>

          {/* Ticket Details Card */}
          <div className='w-full bg-white border border-[#E5E7EB] rounded-lg shadow-sm p-6 mb-6'>
            <div className='grid grid-cols-2 gap-y-4 mb-6'>
              <div>
                <p className='text-sm text-gray-500 font-medium'>Subject</p>
                <p className='text-base text-gray-800 font-medium'>
                  {ticketDetails.ticket?.subject || "Issues with transactions"}
                </p>
              </div>
              <div>
                <p className='text-sm text-gray-500 font-medium'>Email</p>
                <p className='text-base text-gray-800 font-medium'>
                  {ticketDetails?.created_by?.email}
                </p>
              </div>
              <div>
                <p className='text-sm text-gray-500 font-medium'>
                  Date Created
                </p>
                <p className='text-base text-gray-800'>
                  {new Date(
                    ticketDetails.created_datetime
                  ).toLocaleDateString()}{" "}
                  {new Date(ticketDetails.created_datetime).toLocaleTimeString(
                    [],
                    { hour: "2-digit", minute: "2-digit" }
                  )}
                </p>
              </div>
              <div>
                <p className='text-sm text-gray-500 font-medium'>
                  Last Updated
                </p>
                <p className='text-base text-gray-800'>
                  {replies.length > 0
                    ? `${new Date(
                        replies[replies.length - 1].created_datetime
                      ).toLocaleDateString()} ${new Date(
                        replies[replies.length - 1].created_datetime
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className='border-t border-gray-200 pt-4'>
              <div className='p-4 bg-gray-50 rounded-lg'>
                <p className='text-base text-gray-700 whitespace-pre-wrap'>
                  {ticketDetails.body}
                </p>
                {ticketDetails.attachment &&
                  ticketDetails.attachment !== "{}" && (
                    <div className='mt-3 p-2 bg-white rounded-md border border-gray-200 flex items-center'>
                      <ButtonWithIcon
                        buttonText={"View Attachment"}
                        icon={MdAttachment}
                        textColor={"brandGreen"}
                        onClick={() => {
                          if (typeof ticketDetails.attachment === "string") {
                            window.open(
                              ticketDetails.attachment,
                              "_blank",
                              "noopener,noreferrer"
                            );
                          }
                        }}
                        className='text-sm text-brandPurple hover:underline cursor-pointer bg-transparent border-none p-0'
                      >
                        View Attachment
                      </ButtonWithIcon>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Message Thread */}
          <div className='w-full bg-white border border-[#E5E7EB] rounded-lg shadow-sm p-6 mb-6'>
            <div className='space-y-6'>
              {replies?.map((reply) => {
                const isStaff = !!reply.created_by;
                return (
                  <div
                    key={reply.id}
                    className={`flex ${
                      isStaff ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] ${
                        isStaff ? "order-1" : "order-2"
                      }`}
                    >
                      <div className='flex items-center gap-2 mb-1'>
                        <img
                          src={userIcon}
                          alt='Profile'
                          className='w-8 h-8 rounded-full bg-gray-200'
                        />
                        <div>
                          <p className='text-sm font-semibold text-gray-800'>
                            {isStaff
                              ? `${reply.created_by.first_name} ${reply.created_by.last_name}`
                              : "Customer"}
                          </p>
                          <p className='text-xs text-gray-500'>
                            {new Date(
                              reply.created_datetime
                            ).toLocaleDateString()}{" "}
                            {new Date(
                              reply.created_datetime
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`p-4 rounded-lg ${
                          isStaff
                            ? "bg-blue-50 border border-blue-100"
                            : "bg-gray-50 border border-gray-100"
                        }`}
                      >
                        <p className='text-sm md:text-base text-gray-700 whitespace-pre-wrap'>
                          {reply.body}
                        </p>
                        {reply.attachment && reply.attachment !== "{}" && (
                          <div className='mt-3 p-2 bg-white rounded-md border border-gray-200 flex items-center'>
                            <ButtonWithIcon
                              buttonText={"View Attachment"}
                              icon={MdAttachment}
                              textColor={"brandGreen"}
                              onClick={() => {
                                if (
                                  typeof ticketDetails.attachment === "string"
                                ) {
                                  window.open(
                                    ticketDetails.attachment,
                                    "_blank",
                                    "noopener,noreferrer"
                                  );
                                }
                              }}
                              className='text-sm text-brandPurple hover:underline cursor-pointer bg-transparent border-none p-0'
                            >
                              View Attachment
                            </ButtonWithIcon>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* No messages state */}
            {replies.length === 0 && (
              <div className='text-center py-8'>
                <p className='text-gray-500'>
                  No replies yet. Be the first to respond.
                </p>
              </div>
            )}
          </div>

          {/* Reply Box */}
          {ticketDetails.ticket?.status === "open" && (
            <div className='w-full bg-white border border-[#E5E7EB] rounded-lg shadow-sm p-4 mb-6'>
              <div className='flex flex-col'>
                <div className='relative w-full'>
                  <InputWithFullBorder
                    isTextArea
                    className='w-full border border-gray-300 rounded-lg p-3 pl-10 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-brandPurple focus:border-transparent resize-none'
                    placeholder='Enter your message...'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                </div>

                <div className='flex items-center justify-end mt-3 space-x-3'>
                  {/* Attachment Section */}
                  <div className='flex items-center'>
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
                      <span className='ml-2 text-sm text-gray-500'>
                        {fileName}
                      </span>
                    )}
                  </div>

                  <ButtonWithIcon
                    buttonText={"Send"}
                    icon={BiSend}
                    onClick={handlePostThread}
                    isLoading={posting}
                    disabled={!newMessage.trim()}
                    className='text-white flex items-center justify-center transition-colors'
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </BaseDashboardNavigation>
  );
};

export default TicketDetailsPage;
