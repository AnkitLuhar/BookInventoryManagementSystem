import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const Setting = () => {
  const [Value, setValue] = useState({ address: "" });
  const [profile, setProfile] = useState();
  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  const submitData = async () => {
    const res = await axios.put(
      "https://bookinventorymanagementsystem.onrender.com/update-address",
      { Value },
      { headers }
    );
    // console.log(res);
    alert(res.data.message);
  };
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "https://bookinventorymanagementsystem.onrender.com/get-user-info",
        {
          headers,
        }
      );
      //   console.log(res.data);
      setProfile(res.data);
      setValue({ address: res.data.address });
    };
    fetch();
  });
  return (
    <>
      {!profile && (
        <div className="flex items-center h-screen justify-center">
          <Loader />
        </div>
      )}
      {profile && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Setting
          </h1>
          <div className="flex gap-12">
            <div className="">
              <label htmlFor="">Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profile.username}
              </p>
            </div>
            <div className="">
              <label htmlFor="">Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profile.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="">Address</label>
            <textarea
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              rows={5}
              placeholder="Address"
              name="address"
              value={Value.address}
              onChange={change}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400"
              onClick={submitData}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Setting;
