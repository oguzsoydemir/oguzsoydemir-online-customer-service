import React from "react";
import AdminChatHeader from "../AdminChatHeader/AdminChatHeader";
import Messages from "../Messages/Messages";
import AdminChatInput from "../AdminChatInput/AdminChatInput";
import "./AdminChatBody.css";

const AdminChatBody = ({
  message,
  messages,
  setMessage,
  sendMessage,
  roomInfo,
  name,
}) => {
  /*
  console.log(roomInfo.title);*/
  return (
    <div className="chatContainer">
      <AdminChatHeader title={roomInfo.title} />
      <Messages messages={messages} name={name} />
      <AdminChatInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};
export default AdminChatBody;
