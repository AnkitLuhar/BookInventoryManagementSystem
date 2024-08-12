import React, { useState } from "react";
import { TbBooks } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [mobile, setMobile] = useState("hidden");

  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "About Us",
      link: "/about-us",
    },

    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
  ];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === false) {
    links.splice(2, 3);
  }
  return (
    <>
      <div className="bg-zinc-800 text-white z-50  px-8 py-2 relative justify-between items-center flex">
        <div className="flex items-center">
          <TbBooks className=" pr-1 h-14 w-14 " />
          <h1 className="text-2xl font-semibold">BookStore</h1>
        </div>
        <div className="nav-links-bookstore block md:flex gap-2 items-center">
          <div className=" hidden md:flex gap-8">
            {links.map((items, i) => (
              <Link
                to={items.link}
                className="hover:text-blue-500 transition-all duration-300"
                key={i}
              >
                {items.title}
              </Link>
            ))}
          </div>
          {isLoggedIn === false && (
            <>
              <div className=" hidden md:flex gap-6 pl-5">
                <Link
                  to={"/LogIn"}
                  className="px-4 py-1 border text-white border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                >
                  LogIn
                </Link>

                <Link
                  to={"/SignUp"}
                  className="px-4 py-1 rounded bg-blue-500   hover:bg-white hover: text-zinc-800 transition-all duration-300"
                >
                  SignUp
                </Link>
              </div>
            </>
          )}
          <button
            className="text-white text-2xl hover:text-zinc-400 md:hidden"
            onClick={() =>
              mobile === "hidden" ? setMobile("block") : setMobile("hidden")
            }
          >
            <RxHamburgerMenu />
          </button>
        </div>
      </div>
      {/* {for mobile-view} */}
      <div
        className={`${mobile} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((items, i) => (
          <Link
            to={items.link}
            className=" text-white text-3xl font-semibold mb-8 hover:text-blue-500 transition-all duration-300"
            key={i}
            onClick={() =>
              mobile === "hidden" ? setMobile("block") : setMobile("hidden")
            }
          >
            {items.title}
          </Link>
        ))}

        {isLoggedIn === false && (
          <>
            {" "}
            <Link
              to={"/LogIn"}
              className="px-8  mb-8 py-2  text-2xl font-semibold border text-white border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              onClick={() =>
                mobile === "hidden" ? setMobile("block") : setMobile("hidden")
              }
            >
              LogIn
            </Link>
            <Link
              to={"/SignUp"}
              className="px-8 mb-8 py-2 rounded text-2xl font-semibold bg-blue-500   hover:bg-white hover: text-zinc-800 transition-all duration-300"
              onClick={() =>
                mobile === "hidden" ? setMobile("block") : setMobile("hidden")
              }
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
