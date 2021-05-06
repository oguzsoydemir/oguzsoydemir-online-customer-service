import React from "react";

import "./ChatInput.css";

const ChatInput = ({ message, setMessage, sendMessage }) => (
  <form className="form">
    <input className="chat-input" type="text" placeholder="Mesajınız..." value={message} onChange={({ target: { value } }) => setMessage(value)} onKeyPress={(event) => (event.key === "Enter" ? sendMessage(event) : null)} />
    <button className="sendButton" onClick={(e) => sendMessage(e)}>
      Gönder
    </button>
  </form>
);
export default ChatInput;
