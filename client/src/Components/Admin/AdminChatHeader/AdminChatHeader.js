import React from "react";
import "./AdminChatHeader.css";
import OnlineIcon from "../../icons/onlineIcon.png";

const AdminChatHeader = ({ title }) => (
  <div className="headerBar">
    <div className="leftChatContainer">
      <h4 className="title">{title}</h4>
    </div>
    <div className="rightChatContainer">
      <img src={OnlineIcon} className="online" alt="online icon" />
    </div>
  </div>
);
export default AdminChatHeader;
