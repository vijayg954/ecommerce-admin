/* eslint-disable react/prop-types */

import axios from "axios";
import { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/v1/user/admin", {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
      }else{
        toast.error(response.data.message)
        
    }
} catch (error) {
    console.log(error);
    toast.error(error.message)
    }
  };

  return (
    <div className="flex items-center min-h-screen justify-center w-full">
      <div className="bg-white shadow-md  rounded-lg px-8 py6 max-w-md">
        <h1 className=" text-2xl mb-4 font-bold">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email "
              placeholder="enter email"
              required
            ></input>
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="password "
              placeholder="enter password"
              required
            ></input>
          </div>
          <button
            className="mt-2 w-full py-2 rounded-md px-4 bg-black text-white"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
