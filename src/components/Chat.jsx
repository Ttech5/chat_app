import React, { useState, useContext, useEffect } from "react";
import image from "../assets/file.png";
import { TestContext } from "../utils/testContext";

export const Chat = ({ friend, activeSetter }) => {
  const { setActiveChat, user } = useContext(TestContext);
  const friendUsername =
    user.username == friend.user_username
      ? friend.friend_username
      : friend.user_username;

  return (
    <div
      className="w-full flex items-center border-y-[1px]"
      onClick={() => setActiveChat(friend)}
    >
      <img src={image} alt="Profile Pics" className="rounded-full h-14" />
      <div className="p-2">
        <h2 className="p-0 m-0">{friendUsername}</h2>
        <p className={friend.online ? "text-[#00a884]" : ""}>
          {friend.online ? "online" : "offline"}
        </p>
      </div>
    </div>
  );
};
