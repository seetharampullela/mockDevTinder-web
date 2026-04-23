/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

function Chat() {
  const user = useSelector((store) => store.user);
  const chatRef = useRef(null);

  const { toUserId, name } = useParams();
  const fromUserId = user?._id;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const res = await axios.get(BASE_URL + "/chat/" + toUserId, {
      withCredentials: true,
    });
    setMessages(res?.data?.message);

    // chatRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages?.length]);

  const handleChatRoomEvent = (socket) => {
    /* Emitting an event while a user joins a chat window */
    socket.emit("joinChat", {
      fromUserId,
      toUserId,
      firstName: user?.firstName,
    });
  };

  const handleReceivedMessageEvent = (socket) => {
    /* Listener when a user sends out messages */
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  };

  useEffect(() => {
    const socket = createSocketConnection();
    if (!fromUserId) return;
    handleChatRoomEvent(socket);
    handleReceivedMessageEvent(socket);

    /* removing the events for memeory leaks */
    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, [fromUserId, toUserId]);

  useEffect(() => {
    if (!fromUserId) return;
    fetchMessages();
  }, [fromUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    // if (!socket.active) {
    //   socket.connect();
    // }
    if (message.trim()) {
      socket.emit("sendMessage", {
        fromUserId,
        toUserId,
        firstName: user?.firstName,
        message,
      });
      setMessage("");
      // handleReceivedMessageEvent(socket);
    }
  };

  return (
    <div className="flex flex-col mx-auto w-3/4 border border-gray-500 h-[80vh]">
      <h1 className="border-b border-gray-500 p-5">Chat {name}</h1>
      <div className="flex-1 overflow-scroll p-5" ref={chatRef}>
        {messages?.length > 0 &&
          messages.map((message, index) => {
            return (
              <div
                key={index}
                className={
                  message.fromUserId == fromUserId ||
                  message.senderId?._id == fromUserId
                    ? "chat chat-start"
                    : "chat chat-end"
                }
              >
                <div className="chat-header">
                  {message?.firstName ?? message.senderId?.firstName}
                  <time className="text-xs opacity-50">2 hours ago</time>
                </div>
                <div className="chat-bubble">
                  {message?.message ?? message?.text}
                </div>
                <div className="chat-footer opacity-50">Seen</div>
              </div>
            );
          })}
      </div>
      <div className="p-5 border-t border-gray-400 flex">
        <input
          name="message_text"
          type="text-area"
          value={message}
          placeholder="Please type a your message here"
          className="flex-1 border border-gray-400 p-2 mr-2 rounded"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage(e.target.value);
            }
          }}
        />
        <button className="btn btn-secondary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
