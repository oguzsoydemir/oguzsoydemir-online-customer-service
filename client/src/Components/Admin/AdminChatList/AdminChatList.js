import React from "react";
import AdminChatListItem from "../AdminChatListItem/AdminChatListItem";
import "./AdminChatList.css";

const AdminChatList = ({ rooms, selectRoom, setOda }) => (
  <div className="adminMessages">
    {rooms.map((room, i) => (
      <div key={i}>
        {
          <AdminChatListItem
            room={room}
            selectRoom={selectRoom}
            setOda={setOda}
          />
        }
      </div>
    ))}
  </div>
);
export default AdminChatList;
