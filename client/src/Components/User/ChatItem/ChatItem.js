import React from "react";
import "./ChatItem.css";

const ChatItem = ({ message: { text, user }, name }) => {
  console.log(text);
  const senderUser = name.trim();
  if (user === "admin") {
    return (
      <div className="adminContainer justifyCenter">
        <div className="adminBox backgroundGray">
          <p className="messageText colorDarkGrey alignCenter">
            <u>{text}</u>
          </p>
        </div>
      </div>
    );
  } else if (senderUser === user) {
    return (
      <div className="messageContainer justifyEnd">
        <div className="messageBox backgroundBeige">
          <p className="messageText colorBlack">{text}</p>
          <p className="senderName justifyEnd colorBlack">
            <u>{user}</u>
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="messageContainer justifyStart">
        <div className="messageBox backgroundBeige">
          <p className="messageText colorBlack">{text}</p>
          <p className="senderName justifyStart colorBlack">
            <u>{user}</u>
          </p>
        </div>
      </div>
    );
  }
};

export default ChatItem;
