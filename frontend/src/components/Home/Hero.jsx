import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-[75vh] flex">
      <div className=" w-full lg:w-1/2 flex   flex-col items-center lg:items-start justify-center">
        <h1 className="lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left text-4xl">
          Discover Your Next Great Read!
        </h1>
        <p className="mt-4 text-xl text-zinc-300 text-center lg:text-left">
          {" "}
          uncover captiviting stories,enriching knowledge, and endless
          inspiration in our curated collection of books
        </p>
        <div className="mt-8">
          <Link
            to={"/all-books"}
            className=" text-yellow-100  text-xl lg:text-2xl font-semibold rounded-full  border border-yellow-100 px-10 py-3 hover:bg-zinc-800"
          >
            Discover Books
          </Link>
        </div>
      </div>
      <div className=" mt-52 ml-28 w-[100%] lg:w-[40%] h-4 lg:h-4 flex items-center justify-center ">
        <img src="./Hero.png" alt="hero"></img>
      </div>
    </div>
  );
};

export default Hero;
