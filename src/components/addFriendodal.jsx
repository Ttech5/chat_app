import React, { useContext, useState } from "react";
import axios from "axios";
import addIcon from "../assets/add.png";
import { getUserDetails, getAccessToken } from "../utils/login";
import { TestContext } from "../utils/testContext";

const Friend = ({ username, setter }) => {
  const { retrieveUser } = useContext(TestContext);
  const [canAdd, setCanAdd] = useState(true);
  const addFriend = async () => {
    const accessToken = getAccessToken();

    try {
      const res = await axios.post(
        `http://localhost:8000/api/friend/request?fiend_user_name=${username}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      await retrieveUser();
      setCanAdd(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className=" py-2 flex justify-between ">
      <div>
        <h1>{username}</h1>
      </div>
      <div>
        {canAdd && (
          <button onClick={addFriend}>
            <img src={addIcon} alt="add icon" width="30px" />
          </button>
        )}
      </div>
    </div>
  );
};

export const AddFriendodal = ({ setter }) => {
  const [showAdd, setShowAdd] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const { friends, user } = useContext(TestContext);

  const handleSearch = async (event) => {
    const username = event.target.value.trim();
    if (!username) {
      setSearchResult([]);
      return;
    }

    try {
      const timer = setTimeout(async () => {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/users?username=${username}`
        );

        let friendsUsername = friends.map((friend) =>
          friend.user_username == user.username
            ? friend.friend_username
            : friend.user_username
        );

        let filteredRes = res.data.filter(
          (friend) =>
            friend.username != user.username &&
            friendsUsername.indexOf(friend.username) == -1
        );
        setSearchResult(filteredRes);
      }, 500);
      return () => clearTimeout(timer);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="p-5 border-b border-solid border-slate-200 rounded-t text-center">
              <h3 className="text-3xl font-normal ">Add Friend</h3>
            </div>
            {/*body*/}
            {showAdd ? (
              <div className="relative p-6 flex-auto flex flex-row">
                <label htmlFor="addFriend">
                  <h1 className="pr-4">Username:</h1>
                </label>
                <input
                  id="addFriend"
                  className="bg-inherit outline-none"
                  placeholder="friend username"
                  onChange={handleSearch}
                  // onchange={fetchUser(event)}

                  // onchange={fetchUser(e)}
                />
              </div>
            ) : null}

            <div className=" items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              {/* <h1>Fetching</h1> */}
              {searchResult.map((result) => (
                <Friend key={result.id} username={result.username} />
              ))}
            </div>

            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setter(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
