import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import ChatItem from "../ChatItem/ChatItem";
import "./ChatBody.css";

const ChatBody = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => (
      <div key={i}>
        <ChatItem message={message} name={name} />
      </div>
    ))}
  </ScrollToBottom>
);
export default ChatBody;
