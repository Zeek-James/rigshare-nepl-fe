import React from "react";
import BaseDashboardNavigation from "../../../generalComponents/BaseDashboardNavigation";
import PageHeading from "../../../generalComponents/PageHeading";
import SearchField from "../../../generalComponents/SearchField";
import ChatTile from "../../../generalComponents/ChatTile";
import { sendMessage } from "../../../assets/icons";
import MessageInput from "../../../generalComponents/MessageInput";

const MessagingPage = () => {
  // const [newMessage, setNewMessage] = useState("");

  // const handleSendMessage = () => {
  //   // Logic to send message
  //   console.log(newMessage);
  //   setNewMessage("");
  // };
  const chats = [
    {
      name: "LORRA",
      message: "Thank you very much, I am wai...",
      time: "12:35 PM",
    },
    {
      name: "MUSA",
      message: "Thank you very much, I am wai...",
      time: "12:35 PM",
    },
    {
      name: "SEPLAT",
      message: "Thank you very much, I am wai...",
      time: "12:35 PM",
    },
  ];

  const messages = [
    { text: "Lorem ipsumLorem", time: "12:24 PM", isSent: false },
    {
      text: "Lorem ipsum dolor sit amet consectetur. Egestas sit cras in erat lobortis cursus.",
      time: "12:25 PM",
      isSent: false,
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur. Viverra quisque ut a arcu libero a.",
      time: "12:28 PM",
      isSent: true,
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur. Praesent malesuada et orci justo in orci.",
      time: "12:35 PM",
      isSent: false,
    },
  ];

  return (
    <BaseDashboardNavigation>
      <div className='w-full pt-8 gap-9 flex flex-col relative'>
        <PageHeading title={"Chat"} />
        <div className='w-full flex items-center rounded-[10px] h-[80vh] bg-whiteColor   border border-gray-300'>
          <div className='max-w-[30%] px-5 mx-auto pt-5 h-full w-full border-r border-r-gray-300 relative flex flex-col gap-4'>
            <ChatTile
              chat={{
                name: "Super Admin",
              }}
            />
            <SearchField />
            {chats.map((chat, index) => (
              <ChatTile chat={chat} key={index} />
            ))}
          </div>
          <div className='max-w-[70%] w-full flex flex-col justify-between h-full pr-10'>
            <div className='w-full h-[84px] flex items-center justify-start border-b border-b-gray-300'>
              <ChatTile
                chat={{
                  name: "LORRA",
                }}
              />
            </div>
            <div className='flex-1 overflow-y-auto w-full px-3 flex-col items-end justify-end h-[50vh]'>
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
            </div>
            <div className='w-full h-[114px] flex items-center justify-start border-t border-b-gray-300 gap-3 px-3'>
              <MessageInput />
              <img src={sendMessage} alt='Item' />
            </div>
          </div>
        </div>
      </div>
    </BaseDashboardNavigation>
  );
};

export default MessagingPage;

const ChatMessage = ({ message }) => {
  return (
    <div
      className={`flex flex-col w-full mb-4 ${
        message.isSent ? "justify-end items-end" : "justify-start items-start"
      }`}
    >
      <div
        className={`max-w-xs p-2 ${
          message.isSent
            ? "bg-brandPurple text-white rounded-tr-[0px] rounded-tl-[10px] rounded-br-[10px] rounded-bl-[10px]"
            : "bg-[#EDF4EA] text-black rounded-tl-[0px] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
        }`}
      >
        {message.text}
      </div>
      <div className='text-xs text-gray-300 mt-1'>{message.time}</div>
    </div>
  );
};
