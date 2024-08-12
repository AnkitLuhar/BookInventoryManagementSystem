import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const change = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const submit = async () => {
    try {
      if (values.username === "" || values.password === "") {
        alert("all fields are required");
      }
      const response = await axios.post(
        "http://localhost:8080/sign-in",
        values
      );
      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role));
      // console.log(response.data);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      navigate("/profile");
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <div className=" bg-zinc-900 px-12 py-8 flex items-center justify-center h-screen ">
      <div className="bg-zinc-800 rounded-lg px-8 py-5  ">
        <p className="text-zinc-200 text-xl">Login</p>
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
              onChange={change}
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
              onChange={change}
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={submit}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-800"
          >
            Login
          </button>
        </div>
        <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
          Or
        </p>
        <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
          Don't have an account? &nbsp;
          <Link to={"/Signup"} className="hover:text-blue-500">
            <u>Sign Up</u>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
