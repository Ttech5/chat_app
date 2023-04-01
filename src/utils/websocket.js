import { getAccessToken } from "./login";

export const getWebSocket = () => {
  const token = getAccessToken();
  //   console.log(token);
  const ws = new WebSocket(`ws://localhost:8000/api/ws?access_token=${token}`);
  ws.onopen = function (e) {
    console.log("Connection established");
  };
  return ws;
};
