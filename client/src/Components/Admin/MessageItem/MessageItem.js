import React from "react";
import "./MessageItem.css";

const MessageItem = ({ message: { user, text }, name }) => {
  //console.log("message=>", message);
  return (user !== name) ? (
    <div className="messageContainer justifyStart">
      <p className="sentText pr-10">{user}</p>
      <div className="messageBox2 backgroundBeige">
        <p className="messageText colorDark">{text}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyEnd">
      <div className="messageBox2 backgroundBlue">
        <p className="messageText colorDark">{text}</p>
      </div>
      <p className="sentText pr-10">{user}</p>
    </div>
  );
};
export default MessageItem;
