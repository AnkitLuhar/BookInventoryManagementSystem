import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();
  const Change = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const submit = async () => {
    try {
      if (
        values.username === "" ||
        values.email === "" ||
        values.password === "" ||
        values.address === ""
      ) {
        alert("all fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:8080/sign-up",
          values
        );
        alert(response.data.message);
        navigate("/login");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <div className="h-auto  bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-1/2  ">
        <p className="text-zinc-200 text-xl">Sign Up</p>
        <div className="mt-4">
          <div className="">
            <label htmlFor="" className="text-zinc-400">
              Username
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="username"
              name="username"
              required
              value={values.username}
              onChange={Change}
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="">
            <label htmlFor="" className="text-zinc-400">
              Email
            </label>
            <input
              type="email"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="xyz@example.com"
              name="email"
              required
              value={values.email}
              onChange={Change}
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="">
            <label htmlFor="" className="text-zinc-400">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="password"
              name="password"
              required
              value={values.password}
              onChange={Change}
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="">
            <label htmlFor="" className="text-zinc-400">
              Address
            </label>
            <textarea
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              rows={5}
              placeholder="address"
              name="address"
              required
              value={values.address}
              onChange={Change}
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={submit}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-800"
          >
            SignUp
          </button>
        </div>
        <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
          Or
        </p>
        <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
          Already have an account? &nbsp;
          <Link to={"/login"} className="hover:text-blue-500">
            <u>Login</u>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
