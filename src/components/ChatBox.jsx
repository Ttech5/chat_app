import React, { useContext, useEffect } from "react";
import { Header } from "./Header";
import { ChatContainer } from "./ChatContainer";
import { TestContext } from "../utils/testContext";

export function ChatBox() {
  const { retrieveUser } = useContext(TestContext);
  let ws;
  useEffect(() => {
    async function fetchData() {
      ws = await retrieveUser();
    }
    fetchData();
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return (
    <div className="h-screen w-full bg-white">
      <Header />
      <ChatContainer />
    </div>
  );
}
