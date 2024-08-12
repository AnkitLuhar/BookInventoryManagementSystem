import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BookCart = ({ data, favourite }) => {
  // console.log(data);
  const [prod, setProd] = useState({});
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data,
  };

  const handleFavourites = async () => {
    const response = await axios.post(
      "http://localhost:8080/delete-book-from-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col">
      {favourite ? (
        <>
          <Link to={`/view-book-details/${data._id}`}>
            <div className="">
              <div className="bg-zinc-900 rounded flex items-center justify-center">
                <img src={data.url} alt="books" className="h-[20vh]" />
              </div>
              <h2 className="mt-4 text  font-semibold">{data.title}</h2>
              <p className="mt-2 text-zinc-400 font-semibold">
                by {data.author}
              </p>
              <p className="mt-2 text-zinc-200 font-semibold text-xl">
                ₹ {data.price}
              </p>
            </div>
          </Link>
          <button
            onClick={handleFavourites}
            className=" bg-yellow-50 mt-4 px-4  py-2 rounded border border-yellow-500 text-yellow-500"
          >
            Remove from favourites
          </button>
        </>
      ) : (
        <>
          <Link to={`/view-book-details/${data._id}`}>
            <div className="">
              <div className="bg-zinc-900 rounded flex items-center justify-center">
                <img src={data.url} alt="books" className="h-[20vh]" />
              </div>
              <h2 className="mt-4 text  font-semibold">{data.title}</h2>
              <p className="mt-2 text-zinc-400 font-semibold">
                by {data.author}
              </p>
              <p className="mt-2 text-zinc-200 font-semibold text-xl">
                ₹ {data.price}
              </p>
            </div>
          </Link>
        </>
      )}
    </div>
  );
};

export default BookCart;
