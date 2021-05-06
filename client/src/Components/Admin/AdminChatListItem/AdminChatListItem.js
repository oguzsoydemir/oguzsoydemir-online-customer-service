import React from "react";
import "./AdminChatListItem.css";

const AdminChatListItem = ({ room, selectRoom, setOda }) => {
  return (
    <div onClick={(e) => selectRoom(e)} onMouseOver={() => setOda(room.roomID)}>
      <div className="adminMessageContainer  justifyEnd">
        <p className="adminSentText pr-10">{room.name}</p>
        <div className="adminMessageBox backgroundLightBlue">
          <p className="adminMessageText colorDark">Yeni bir mesaj var</p>
        </div>
      </div>
    </div>
  );
};
export default AdminChatListItem;
