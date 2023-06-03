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

  messageRef.current?.scrollIntoView({
    behavior: "smooth",
  });

  useEffect(() => {
    messageRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chatMessages]);

  useEffect(() => {
    messageRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  const sendMessage = async () => {
    let msg = inputRef.current.value;
    if (!msg) return;
    await sendMessageToChat(msg, activeChat);
    inputRef.current.value = null;
  };

  useEffect(() => {
    async function fetchData() {
      let newmessages = await getChatMessages(activeChat.id);
      setChatMessages(newmessages);
    }
    fetchData();
  }, []);

  return (
    <div className="h-screen flex flex-col ">
      <Header />

      <div
        className="flex pb-12  flex-col flex-grow-0  overflow-y-scroll"
        ref={messageRef}
      >
        {messages.map((message, index) => (
          <div key={message.message_id} ref={messageRef}>
            <Message message={message} />
          </div>
        ))}
      </div>

      <div className="ml-1 rounded-xl fixed w-[98%] bottom-0  h-12 flex-shrink-0   bg-black bg-opacity-40  flex justify-between  ">
        <input
          className="caret-blue-500 pl-2   cursor-text w-full  color-blue bg-[#d1d7db] focus:ring-blue-200 ring-offset-2	 focus:ring-2	 rounded-xl outline-none"
          ref={inputRef}
          placeHolder="New Message"
        />
        <img
          src={send}
          alt="send message"
          onClick={() => sendMessage()}
          className=" fixed  right-2  lg:pr-4"
        />
      </div>
    </div>
  );
};
