import React from "react";
import MessageItem from "../MessageItem/MessageItem";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Messages.css";
/*<div key={i}>
  <MessageItem message={message} />
</div>;*/
const Messages = ({ messages, name }) => (
  <ScrollToBottom className="adminMessages2">
    {messages.map((message, i) => (
      <div key={i}>
        <MessageItem message={message} name={name} />
      </div>
    ))}
  </ScrollToBottom>
);
export default Messages;
