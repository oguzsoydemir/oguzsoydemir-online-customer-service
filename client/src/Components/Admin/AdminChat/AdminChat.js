import React, { useState, useEffect } from "react";
import AdminChatList from "../AdminChatList/AdminChatList";
import AdminChatBody from "../AdminChatBody/AdminChatBody";
import "./AdminChat.css";
import io from "socket.io-client";
let socket;

const AdminChat = ({ location }) => {
  class messageModel {
    constructor(_message) {
      this.message = _message.message;
      this.userName = _message.name;
    }
  }
  //const [adminid, setAdminID] = useState(0);
  const [odalar, setOdalar] = useState([]);
  const [oda, setOda] = useState("");
  const [roomInfo, setRoomInfo] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const SocketPort = "http://localhost:5000";

  useEffect(() => {
    const { state } = location;
    const adminID = state.adminID;

    console.log(state.name);
    socket = io(SocketPort);
    socket.emit("adminJoin", { adminID }, () => {
      return () => {
        socket.emit("disconnect");
        socket.off();
      };
    });
    return () => {
      socket.off("adminJoin");
    };
  }, [SocketPort, location]);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message.senderRoomID === roomInfo.roomID);
      if (message.senderRoomID === roomInfo.roomID) {
        addMessage(message);
      }
    });

    return () => {
      socket.off("message");
    };
  }, [messages]);

  useEffect(() => {
    socket.on("messagesOfRoom", (messagesOfRoom) => {
      add(messagesOfRoom);
    });
    return () => {
      socket.off("messagesOfRoom");
    };
  }, [messages, roomInfo]);

  useEffect(() => {
    socket.on("getRooms", (rooms) => {
      setOdalar(rooms.rooms);
    });
    return () => {
      socket.off("getRooms");
    };
  }, [odalar]);

  const addMessage = (message) => {
    setMessages([...messages, { user: message.user, text: message.text }]);
  };

  const selectRoom = (event) => {
    event.preventDefault();
    /*setOda(roomID);
    console.log(roomID);*/
    if (oda) {
      socket.emit("selectRoom", oda);
    }
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit(
        "sendMessage",
        {
          message: message,
          name: location.state.name,
          roomID: roomInfo.roomID,
        },
        () => setMessage("")
      );
      setMessage("");
    }
  };

  const add = (messagesOfRoom) => {
    var { messages, roomInfo } = messagesOfRoom;
    //setMessages([]);
    var tempMessageArray = [];
    messages.forEach((message) => {
      tempMessageArray.push(message);
      //setMessages([...messages, message]);
    });
    /*var index =messages.indexOf
    console.log(messages[messages.length-1]);
    console.log(tempMessageArray);*/
    setMessages(tempMessageArray);
    setRoomInfo(roomInfo);
  };

  return (
    <div className="container2">
      <div className="chatList">
        <AdminChatList rooms={odalar} selectRoom={selectRoom} setOda={setOda} />
      </div>
      <div className="chatBox">
        <AdminChatBody
          message={message}
          setMessage={setMessage}
          messages={messages}
          sendMessage={sendMessage}
          roomInfo={roomInfo}
          name={location.state.name}
        />
      </div>
    </div>
  );
};
export default AdminChat;
