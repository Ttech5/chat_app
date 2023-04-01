import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Signup = () => {
  const navigator = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let { username, email, password, confirm_password } = document.forms[0];
    username = username.value.trim();
    email = email.value.trim();
    password = password.value.trim();
    confirm_password = confirm_password.value.trim();

    if (!username) alert("Please enter a username");
    else if (!email) alert("Please enter your email address");
    else if (!password) alert("Please enter your Password");
    else if (!confirm_password) alert("Please confirm your Password");
    else if (password != confirm_password) alert("Password Mismatch");
    else {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/auth/register",
          {
            email,
            username,
            password,
          }
        );
        alert("Registered Successfully");
        navigator("/login");
      } catch (e) {
        console.log(e);
        let errMsg = e.response.data.detail;
        if (!errMsg) {
          let errDat = e.response.data.errors[0];
          if (errDat.path == "password") errMsg = "Password not strong enough";
          else {
            errMsg = "Unknown Error occured";
          }
        }
        alert(errMsg);
      }
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <form onSubmit={handleSubmit}>
          <div className="border-[2px]  min-h-[200px] py-5 px-2 ">
            <h1 className="font-bold text-center">Signup</h1>
            <div className="flex  flex-col ">
              <h2 className="">Username</h2>
              <input
                name="username"
                type="text"
                className="border-[#f6f6f6] bg-inherit"
                placeholder="Username"
              />
            </div>

            <div className="flex flex-col">
              <h2>Email</h2>
              <input
                name="email"
                type="text"
                className="outline-none bg-inherit"
                placeholder="Email Address"
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

            <div className="flex flex-col ">
              <h2>Confirm Passowrd</h2>
              <input
                name="confirm_password"
                type="password"
                className="outline-none bg-inherit"
                placeholder="Confirm Passowrd"
              />
            </div>
            {/* <h1 className="font-bold text-center">Signup</h1> */}
            <div className="text-center">
              <button>Register</button>
            </div>

            <div className="flex">
              <p className="pr-2">Already Have An Account?</p>
              <button type="button" onClick={() => navigator("/login")}>
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
