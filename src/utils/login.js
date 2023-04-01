import axios from "axios";
import { toast } from "react-toastify";
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
    const res = await axios.get("http://localhost:8000/api/auth/me", {
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
  const base_url = process.env.BASE_URL;
  try {
    const res = await axios.post(
      `${base_url}/api/auth/login`,
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

    return true;
  } catch (e) {
    let errMsg = e.response.data.detail;
    toast.error(errMsg, { position: toast.POSITION.TOP_CENTER });
  }
};
