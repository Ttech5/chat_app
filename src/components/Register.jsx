import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { url } from "../config";

export const Register = () => {
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
        const res = await axios.post(`${url}/api/auth/register`, {
          email,
          username,
          password,
        });
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
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-black underline">
          Signup
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-800"
            >
              Username
            </label>
            <input
              name="username"
              type="text"
              id="username"
              placeholder="Username"
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-black focus:ring-none focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="Email address"
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:borderblack  focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              name="password"
              id="password"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:borderblack  focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="confirm_password"
              className="block text-sm font-semibold text-gray-800"
            >
              Confirm Password
            </label>
            <input
              name="confirm_password"
              id="confirm_password"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:borderblack  focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-[#3a3938] focus:outline-none">
              Register
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <Link to="/login" className="font-medium text-black hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
