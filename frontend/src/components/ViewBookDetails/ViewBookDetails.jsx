import React, { useEffect, useState } from "react";
import axios from "axios";
import { GrLanguage } from "react-icons/gr";
import { FaEdit, FaHeart } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://bookinventorymanagementsystem.onrender.com/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourite = async () => {
    const response = await axios.post(
      "https://bookinventorymanagementsystem.onrender.com/add-book-to-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put(
      "https://bookinventorymanagementsystem.onrender.com/add-to-cart",
      {},
      { headers }
    );

    alert(response.data.message);
  };
  return (
    <>
      {Data && (
        <div className="px-12 py-8 bg-zinc-900 flex ap-8">
          <div className="bg-zinc-800 rounded px-4 py-12 h-screen w-1/2  flex items-start justify-around gap-8">
            <img src={Data.url} alt="data" className="h-auto" />

            {isLoggedIn === true && role === "user" && (
              <>
                {" "}
                <div className="flex md:flex-col gap-4">
                  <button onClick={handleFavourite}>
                    <FaHeart className="bg-white rounded-full text-4xl p-2 text-red-500" />
                  </button>
                  <button onClick={handleCart}>
                    <FaCartArrowDown className="bg-white rounded-full text-4xl p-2 text-blue-500" />
                  </button>
                </div>
              </>
            )}
            {isLoggedIn === true && role === "admin" && (
              <>
                {" "}
                <div className="flex md:flex-col gap-4">
                  <button
                  // onClick={handleEdit}
                  >
                    <FaEdit className="bg-white rounded-full text-4xl p-2 text-black" />
                  </button>
                  <button
                  // onClick={handleDelete}
                  >
                    <MdDeleteOutline className="bg-white rounded-full text-4xl p-2 text-blue-500" />
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="pt-8 pl-36 flex flex-col items-start  w-1/2">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {Data.title}
            </h1>
            <p className="text-zinc-400 mt-1"> by {Data.author}</p>
            <p className="text-zinc-500 mt-5 text-xl">{Data.desc}</p>
            <p className="text-zinc-400 mt-4 items-center justify-start flex ">
              <GrLanguage className="me-3" />
              {Data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              price : ₹ {Data.price}{" "}
            </p>
          </div>
        </div>
      )}

      {!Data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
