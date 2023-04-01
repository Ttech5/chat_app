import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/login";

export const Signin = () => {
  const navigator = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const { username, password } = document.forms[0];
    if (!username.value) {
      alert("Enter a username");
    } else if (!password.value) {
      alert("Enter your password");
    } else {
      const res = await loginUser(username.value, password.value);
      if (res) navigator("/");
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="border-[2px]  min-h-[200px] py-5 px-2">
          <form name="login_form" onSubmit={login}>
            <h1 className="font-bold text-center">Login</h1>
            <div className="flex  flex-col ">
              <h2 className="">Username</h2>
              <input
                name="username"
                type="text"
                className="border-[#f6f6f6] bg-inherit"
                placeholder="Username"
              />
            </div>

            <div className="flex flex-col ">
              <h2>Password</h2>
              <input
                name="password"
                type="password"
                className="outline-none bg-inherit"
                placeholder="Password"
              />
            </div>

            <div className="text-center">
              <button>Login</button>
            </div>
          </form>
          <div className="flex">
            <p className="pr-2">Don't Have an account?</p>
            <button onClick={() => navigator("/register")}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};
