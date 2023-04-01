import React, { useContext } from "react";
import { TestContext } from "../utils/testContext";
export const Message = ({ message }) => {
  const { user } = useContext(TestContext);
  let position = message.sender_id == user.user_id ? "right" : null;

  return (
    <div>
      <div
        className={`rounded-r-[10px]   rounded-tl-[20px]  w-fit px-2  my-[0.5px] py-2 ${
          position ? `float-right mr-4 bg-[#00a884]` : "bg-[#e9edef] "
        }`}
      >
        <p className="">{message.content}</p>
      </div>
    </div>
  );
};
