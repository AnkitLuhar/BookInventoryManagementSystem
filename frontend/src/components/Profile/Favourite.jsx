import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCart from "../BookCart/BookCart";
import { GoBookmarkSlashFill } from "react-icons/go";

const Favourite = () => {
  const [favourites, setFavourites] = useState([]);
  const [prod, setProd] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:8080/get-favourite-books",
        { headers }
      );
      setFavourites(response.data.data);
      //   console.log(response.data.data);
    };
    fetch();
  }, [favourites]);

  return (
    <>
      {favourites.length === 0 && (
        <div className="text-5xl font-semibold h-screen pb-20 text-zinc-500 flex flex-col items-center justify-center w-full">
          No Favourites Books
          <GoBookmarkSlashFill className="mt-8 h-32" size={100} />
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {favourites.map((item, i) => (
          <div key={i}>
            <div className="bg-white gap-8">
              <BookCart data={item} favourite="true" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Favourite;
