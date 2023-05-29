import React, { useRef, useState, useContext, useEffect } from "react";
import image from "../assets/file.png";
import { Message } from "./Message";
import arrow_back from "../assets/arrow_back.png";
import send from "../assets/send.png";
import { TestContext } from "../utils/testContext";

const Header = () => {
  const { activeChat, setActiveChat, user } = useContext(TestContext);
  const friendUsername =
    user.username == activeChat.user_username
      ? activeChat.friend_username
      : activeChat.user_username;
  return (
    <div className="flex bg-[#d1d7db]">
      <img
        src={arrow_back}
        alt="back arrow"
        width="50px"
        onClick={() => setActiveChat(null)}
      />
      <img src={image} alt="Profile Pics" className="rounded-full h-10" />
      <div>
        <h2 className="p-0 m-0">{friendUsername}</h2>
        <p className="">online</p>
      </div>
    </div>
  );
};

export const Dialog = () => {
  const [messages, setChatMessages] = useState([]);
  const { sendMessageToChat, activeChat, chatMessages, getChatMessages } =
    useContext(TestContext);

  const messageRef = useRef(null);
  const inputRef = useRef(null);

  const sendMessage = async () => {
    let msg = inputRef.current.value;
    if (!msg) return;
    await sendMessageToChat(msg, activeChat);
    inputRef.current.value = null;
  };

  useEffect(() => {
    console.log("Chat messages change");
    messageRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chatMessages]);

  useEffect(() => {
    async function fetchData() {
      let messages = await getChatMessages(activeChat.id);
      setChatMessages(messages);
    }
    fetchData();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="flex  flex-col  flex-grow w-full ">
        <div className="flex-grow overflow-y-scroll">
          <div className="flex  flex-col ">
            {messages.map((message) => (
              <div key={message.message_id} ref={messageRef}>
                <Message message={message} />
              </div>
            ))}
          </div>
        </div>

        <div className="  w-full h-12   bg-gray-100  flex justify-between ">
          <input className="w-[90%] rounded-14" ref={inputRef} />
          <img src={send} alt="send message" onClick={() => sendMessage()} />
        </div>
      </div>
    </div>
  );
};
