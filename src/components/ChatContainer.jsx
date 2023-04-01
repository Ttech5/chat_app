import { React, useEffect, useState, createContext, useContext } from "react";
import { getUserDetails } from "../utils/login";
import { Chat } from "./Chat";
import { Dialog } from "./Dialog";
import { SearchBar } from "./SearchBar";
import { TestContext } from "../utils/testContext";

export const ChatContainer = () => {
  const { friends, activeChat } = useContext(TestContext);
  // const [activeChat, setActiveChat] = useState(null);

  return (
    <>
      {activeChat ? (
        <Dialog />
      ) : (
        <>
          <SearchBar />
          <div className="w-full p-2">
            {friends.map((friend, index) => (
              <Chat key={index} friend={friend} />
            ))}
          </div>
        </>
      )}
    </>
  );
};
