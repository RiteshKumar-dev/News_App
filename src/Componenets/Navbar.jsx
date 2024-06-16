import React, { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <header className="lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:z-50 flex flex-wrap justify-between items-center px-4 py-2 md:px-8 md:py-4 lg:px-10 lg:py-4 bg-white lg:shadow-md mb-5 gap-2">
        <Link to={"/"} className="flex items-center text-red-500 text-semibold">
          <img
            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-design-template-313c490708614645a9c2b3ea001baf33_screen.jpg?ts=1676407444"
            alt="Nav_Logo"
            className="h-12 cover object-fit"
          />
          <span className="font-bold text-3xl hidden lg:block">News</span>
        </Link>

        <div className="hidden md:flex flex-col md:flex-row items-center justify-center w-full md:w-auto mb-2 md:mb-0">
          <Link
            to={"/ipl"}
            className="font-semibold text-gray-500 mx-2 my-1 md:my-0"
          >
            IPL
          </Link>
          <Link
            to={"/finance"}
            className="font-semibold text-gray-500 mx-2 my-1 md:my-0"
          >
            Finance
          </Link>
          <Link
            to={"/politics"}
            className="font-semibold text-gray-500 mx-2 my-1 md:my-0"
          >
            Politics
          </Link>
        </div>

        <div className="flex justify-end items-center cursor-pointer">
          <p className="bg-red-500 text-white px-4 py-2 rounded-full">LogIn</p>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
