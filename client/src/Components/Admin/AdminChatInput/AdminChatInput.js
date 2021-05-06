import React from "react";

import "./AdminChatInput.css";

const AdminChatInput = ({ message, setMessage, sendMessage }) => (
  <form className="adminForm">
    <input className="adminInput" type="text" value={message} onChange={({ target: { value } }) => setMessage(value)} placeholder="Mesajınızı yazın..." onKeyPress={(event) => (event.key === "Enter" ? sendMessage(event) : null)} />
    <button className="adminSendButton" onClick={(e) => sendMessage(e)}>
      <b className="bold">Gönder</b>
    </button>
  </form>
);
export default AdminChatInput;
