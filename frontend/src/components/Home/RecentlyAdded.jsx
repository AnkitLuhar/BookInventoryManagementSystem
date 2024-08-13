import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCart from "../BookCart/BookCart";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookinventorymanagementsystem.onrender.com/get-recent-books"
      );
      setData(response.data.data);
      // console.log(response.data.data);
    };
    fetch();
  });
  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-yellow-100">Recently added books</h4>
      {!Data && (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
      <div className="my-8 grid   grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Data &&
          Data.map((items, i) => (
            <div className="" key={i}>
              <BookCart data={items} />{" "}
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;
