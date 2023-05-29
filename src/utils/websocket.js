import { websocker_url } from "../config";
import { getAccessToken } from "./login";

export const getWebSocket = () => {
  const token = getAccessToken();
  //   console.log(token);
  const ws = new WebSocket(`${websocker_url}/api/ws?access_token=${token}`);
  ws.onopen = function (e) {
    console.log("Connection established");
  };
  return ws;
};
