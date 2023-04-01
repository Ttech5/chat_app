import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "./login";
import axios from "axios";
import { toast } from "react-toastify";

export const TestContext = createContext();

export const ContextProvider = ({ children }) => {
  const navigator = useNavigate();
  const [user, setUser] = useState();
  const [friends, setFriends] = useState([]);
  const [websocket, setWebsocket] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [chatMessages, setChatMessages] = useState({});

  const getActiveChat = () => {
    console.log(activeChat);
    return activeChat;
  };

  const handleNewMessage = (event) => {
    let data = JSON.parse(event.data);
    if (data.state) {
      toast.success(`${data.username} is ${data.state}`, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return;
    }
    chatMessages[data.chat_id].push(data);
    setChatMessages({ ...chatMessages });
  };
  const retrieveUser = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) navigator("/login");
    try {
      const res = await axios.get("http://localhost:8000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUser(res.data.user);
      setFriends(res.data.friends);

      const ws = new WebSocket(
        `ws://localhost:8000/api/ws?access_token=${accessToken}`
      );
      ws.onopen = function (e) {};
      ws.onmessage = handleNewMessage;
      setWebsocket(ws);
      return ws;
    } catch (e) {
      console.log(e);
      let errMsg = e.response.data.detail;
      if (errMsg == "Could not validate credentials") {
        navigator("/login");
      }
    }
  };

  const sendMessageToChat = async (content, chat) => {
    console.log(activeChat);
    const accessToken = getAccessToken();
    let chatId = chat.id;

    const receiver =
      user.username == chat.user_username
        ? chat.friend_username
        : chat.user_username;

    try {
      const res = await axios.post(
        "http://localhost:8000/api/message",
        { chatId, content, receiver },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      chatMessages[chatId].push(res.data);
      const copy = { ...chat };
      setActiveChat(copy);
    } catch (e) {
      console.log(e);
    }
  };

  const getChatMessages = async (chatId) => {
    let chatMsgs = chatMessages[chatId];
    if (!chatMsgs || chatMsgs.length === 0) {
      let newMSgs = await fetchChatMessages(chatId);
      if (!newMSgs) {
        return [];
      }
      chatMessages[chatId] = newMSgs;
      return newMSgs;
    } else {
      return chatMsgs;
    }
  };
  const fetchChatMessages = async (chatId) => {
    console.log("Fetching New Messages");
    const accessToken = getAccessToken();
    try {
      const res = await axios.get(
        `http://localhost:8000/api/message/?chat_id=${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  const getMostRecentMessage = (chatId) => {
    let messages = chatMessages[chatId];
    return messages[messages.length - 1];
  };

  return (
    <TestContext.Provider
      value={{
        retrieveUser,
        user,
        friends,
        sendMessageToChat,
        setActiveChat,
        activeChat,
        getChatMessages,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};
