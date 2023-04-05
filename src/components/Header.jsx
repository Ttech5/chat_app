import { React, useState, useContext } from "react";
import profilePics from "../assets/file.png";
import menu_close from "../assets/menu_close.png";
import addFriend from "../assets/add_friend.png";
import menu_open from "../assets/menu_open.png";
import { AddFriendodal } from "./addFriendodal";
import { TestContext } from "../utils/testContext";

export const Header = () => {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const { user } = useContext(TestContext);
  console.log(user);
  return (
    <>
      <div className="pt-2 bg-[#02a698] flex justify-between px-2">
        <div>
          <img
            src={profilePics}
            alt="Profile Pics"
            className="rounded-full h-10"
          />
          {user && <h2>{user.username}</h2>}
        </div>
        <div className="flex ">
          <img
            src={addFriend}
            alt="Profile Pics"
            className="h-10 pr-4"
            onClick={() => setShowAddFriend(true)}
          />
          <img
            src={menu_close}
            alt="Profile Pics"
            className="rounded-full h-10"
          />
          {/* <img src={menu_open} alt="Profile Pics" className="rounded-full h-10" /> */}
        </div>
      </div>
      {showAddFriend && <AddFriendodal setter={setShowAddFriend} />}
    </>
  );
};
