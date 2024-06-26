import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import App_Logo from "../assets/App_Logo.png";
import { ThemeContext } from "../Context/ThemeContext";

const Navbar = () => {
  const [isClick, setIsClick] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userData, theme } = useContext(ThemeContext);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleTextClr = (prm) => {
    setIsClick(prm);
  };

  const linkClass = (path) => {
    if (theme === "dark") {
      return isClick === path
        ? "font-semibold text-blue-500 mx-2 my-1 md:my-0"
        : "font-semibold text-white mx-2 my-1 md:my-0";
    } else {
      return isClick === path
        ? "font-semibold text-blue-500 mx-2 my-1 md:my-0"
        : "font-semibold text-gray-500 mx-2 my-1 md:my-0";
    }
  };

  return (
    <div>
      <header
        className={
          theme === "dark"
            ? "lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:z-50 flex flex-wrap justify-between items-center px-4 py-2 md:px-8 md:py-4 lg:px-10 lg:py-4 bg-darkerGray lg:shadow-md mb-5 gap-2"
            : "lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:z-50 flex flex-wrap justify-between items-center px-4 py-2 md:px-8 md:py-4 lg:px-10 lg:py-4 bg-white lg:shadow-md mb-5 gap-2"
        }
      >
        <Link to={"/"} className="flex items-center text-red-500 text-semibold">
          <img
            src={App_Logo}
            alt="Nav_Logo"
            className="hidden lg:block h-12 cover object-fit"
          />
          <span className="font-bold text-3xl hidden lg:block font-playfair">
            News
          </span>
        </Link>

        <div className="hidden md:flex flex-col md:flex-row items-center justify-center w-full md:w-auto mb-2 md:mb-0">
          <Link
            to={"/ipl"}
            className={linkClass("/ipl")}
            onClick={() => handleTextClr("/ipl")}
          >
            IPL
          </Link>
          <Link
            to={"/finance"}
            className={linkClass("/finance")}
            onClick={() => handleTextClr("/finance")}
          >
            Finance
          </Link>
          <Link
            to={"/politics"}
            className={linkClass("/politics")}
            onClick={() => handleTextClr("/politics")}
          >
            Politics
          </Link>
          <Link
            to={"/fav"}
            className={linkClass("/fav")}
            onClick={() => handleTextClr("/fav")}
          >
            Interesting
          </Link>
        </div>

        <div className="hidden md:flex justify-between items-center gap-5">
          <Link
            to={userData ? "/profile" : "/auth"}
            className="hidden md:flex justify-end items-center cursor-pointer"
          >
            <img
              src={
                userData?.photoURL
                  ? userData.photoURL
                  : "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
              }
              alt="profile_pic"
              className="bg-gray-500 text-white h-12 w-12 rounded-full border-2 border-gray-300 shadow-md"
            />
          </Link>
          <ThemeToggle />
        </div>
        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center justify-between w-full">
          <Link
            to={"/"}
            className="flex items-center text-red-500 text-semibold"
          >
            <img
              src={App_Logo}
              alt="Nav_Logo"
              className="h-12 cover object-fit"
            />
          </Link>
          <div className="flex items-center justify-end cursor-pointer">
            <Link
              to={userData ? "/profile" : "/auth"}
              className="cursor-pointer text-white px-4 py-2 rounded-full"
            >
              <img
                src={
                  userData?.photoURL
                    ? userData.photoURL
                    : "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                }
                alt="profile_pic"
                className="bg-gray-500 text-white h-10 w-10 rounded-full border-2 border-gray-300 shadow-md"
              />
            </Link>
            <div className="hidden sm:flex">
              <ThemeToggle />
            </div>
            <button
              onClick={toggleMobileMenu}
              className="ml-4 text-gray-500 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke={theme === "dark" ? "white" : "gray"}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-7 6h7"
                  }
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={
            theme === "dark"
              ? "md:hidden flex flex-col items-center bg-gray shadow-md mt-2"
              : "md:hidden flex flex-col items-center bg-white shadow-md mt-2"
          }
        >
          <Link
            to={"/ipl"}
            className={linkClass("/ipl")}
            onClick={() => handleTextClr("/ipl")}
          >
            IPL
          </Link>
          <Link
            to={"/finance"}
            className={linkClass("/finance")}
            onClick={() => handleTextClr("/finance")}
          >
            Finance
          </Link>
          <Link
            to={"/politics"}
            className={linkClass("/politics")}
            onClick={() => handleTextClr("/politics")}
          >
            Politics
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
