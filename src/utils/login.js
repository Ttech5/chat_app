import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../config";
export const getAccessToken = () => {
  return sessionStorage.getItem("accessToken");
};

export const activeSession = () => {
  return getAccessToken() ? True : False;
};

export const getUserDetails = async () => {
  const access_token = getAccessToken();
  console.log(access_token);
  try {
    const res = await axios.get(`${url}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (e) {
    let errMsg = e.response.data.detail;
    console.log(e.response);
    if (errMsg == "Could not validate credentials") {
      console.log("Error validing credentials");
    }
  }
};

export const loginUser = async (username, password) => {
  // const base_url = process.env.BASE_URL;
  try {
    console.log("About to login");
    console.log(`${url}/api/auth/login`);
    const res = await axios.post(
      `${url}/api/auth/login`,
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const access_token = res.data.access_token;

    sessionStorage.setItem("accessToken", access_token);
    console.log("Access token");
    return true;
  } catch (e) {
    let errMsg = e.response.data.detail;
    console.log(errMsg);
    toast.error(errMsg, { position: toast.POSITION.TOP_CENTER });
  }
};
