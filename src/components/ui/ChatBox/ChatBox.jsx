import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { API_PUBLIC_DIR_URL } from "../../../config/config";
import defaultProfilePic from '../../../assets/images/UserProfiling/profile_default.jfif'


import { getUser } from "../../../services/User/user";
import { getMessages,addMessage } from "../../../services/Chat/chat";
import "./ChatBox.css";

import { format } from "timeago.js";

const ChatBox = ({ chat, currentUser, setSendMessage,  receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (e)=> {

    setNewMessage(e.target.value)
  }

  // for chatbox header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const data  = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);



  // fetching messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const  data  = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);


  // Always scroll to last Message
  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])



  // Send Message
  const handleSend = async(e)=> {
    e.preventDefault()
    const message = {
      senderId : currentUser,
      text: newMessage,
      chatId: chat._id,
  }
  const receiverId = chat.members.find((id)=>id!==currentUser);
  // send message to socket server
  setSendMessage({...message, receiverId})
  // send message to database
  try {
    const data = await addMessage(message);
    setMessages([...messages, data]);
    setNewMessage("");
  }
  catch(error)
  {
    console.log(error)
  }
}

// Receive Message from parent component
useEffect(()=> {
  if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
    setMessages([...messages, receivedMessage]);
  }
},[receivedMessage])



  const scroll = useRef();
  return (
    <>
      <div className="ChatBox-container ">
        {chat ? (
          <>
            {/* Chat Header */}
            <div className="chat-header p-2 pt-3 shadow-sm border-r-4 ">
              <div className="follower pl-4">
                <div>
                  <img
                    src={userData?.profilePicture? API_PUBLIC_DIR_URL + userData.profilePicture : defaultProfilePic 
                    }
                    alt="Profile"
                    className="max-w-12 max-h-12 rounded-full resize"     
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {userData?.firstName} {userData?.lastName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Chat Body */}
            <div className="chat-body " >
              {messages.map((message) => (
                <>
                  <div ref={scroll}
                    key={message._id}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message other"
                    }
                  >
                    <span className="text-sm">{message.text}</span>{" "}
                    <span className="text-xs">{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            {/* Chat Sender */}
            <div className="chat-sender  ">
              <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={handleChange}
                class="border rounded  px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-200"
              />
              <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSend}>Send</button>
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Click on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
