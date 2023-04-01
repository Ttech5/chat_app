import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Signup } from "./components/Signup";
import { Signin } from "./components/Signin";
import { ChatBox } from "./components/ChatBox";
import { ContextProvider } from "./utils/testContext";
import { Login } from "./components/Login2";
function App() {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <ContextProvider>
              <ChatBox />
            </ContextProvider>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        {/* <Route path="/chat" element={<ChatBox />} /> */}
        <Route path="*" element={<p> Page Not Found </p>} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
