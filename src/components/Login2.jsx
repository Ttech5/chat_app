import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../utils/login";
import { toast } from "react-toastify";

export const Login = () => {
  const navigator = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (!username) {
      toast.error("Enter Valid Username", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (!password) {
      toast.error("Enter your password", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const res = await loginUser(username, password);
      if (res) navigator("/");
    }
  };
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-black underline">
          Login
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-800"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-black focus:ring-none focus:outline-none focus:ring focus:ring-opacity-40"
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
              id="password"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:borderblack  focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6">
            <button
              onClick={handleFormSubmit}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-[#3a3938] focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-black hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
