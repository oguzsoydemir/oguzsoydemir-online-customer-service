import React from "react";

import "./ChatHeader.css";

const ChatHeader = ({ title }) => {
  return (
    <div className="heading">
      <div className="titleContainer">
        <h5>{title}</h5>
      </div>
    </div>
  );
};
export default ChatHeader;
