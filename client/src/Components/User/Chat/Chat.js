import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import ChatHeader from "../ChatHeader/ChatHeader";
import ChatBody from "../ChatBody/ChatBody";
import ChatInput from "../ChatInput/ChatInput";

import "./Chat.css";
let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomID, setRoomID] = useState("");
  const SocketPort = "localhost:5000";

  useEffect(() => {
    const { name, surname, email, title } = queryString.parse(location.search);
    socket = io(SocketPort);
    setName(name);
    setTitle(title);
    socket.emit("join", { name, surname, email, title }, () => {
      return () => {
        socket.emit("disconnect");
        socket.off();
      };
    });
  }, [SocketPort, location.search]);

  useEffect(() => {
    socket.on("room", (roomID) => {
      console.log(roomID);
      setRoomID(roomID);
    });
    return () => {
      socket.off("room");
    };
  }, [roomID]);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(roomID);
      //console.log(roomID === message.senderRoomID);
      if (roomID === message.senderRoomID||message.user==="admin") {
        setMessages([...messages, message]);
      }
    });
    return () => {
      socket.off("message");
    };
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", { message, name, roomID }, () =>
        setMessage("")
      );
      setMessage("");
    }
  };

  return (
    <>
      <div className="mainContainer">
        <div className="innerContainer">
          <ChatHeader title={title} />
          <ChatBody name={name} messages={messages} />
          <ChatInput
            message={message}
            sendMessage={sendMessage}
            setMessage={setMessage}
          />
        </div>
      </div>
    </>
  );
};
export default Chat;
