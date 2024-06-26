import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaPhoneAlt, FaHeart } from "react-icons/fa";
import { ThemeContext } from "../Context/ThemeContext";
import ContactBtn from "./ContactBtn";
import ThemeToggle from "./ThemeToggle";

const BtmNav = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={
        theme === "dark"
          ? "sm:hidden fixed bottom-4 left-7 right-7 bg-gray-500 text-white p-2 rounded-full shadow-lg flex items-center justify-around max-w-md mx-auto mr-2 ml-2"
          : "sm:hidden fixed bottom-4 left-7 right-7 bg-white text-gray-700 p-2 rounded-full shadow-lg flex items-center justify-around max-w-md mx-auto mr-2 ml-2"
      }
    >
      <Link to={"/contact"}>
        <ContactBtn />
      </Link>
      <ThemeToggle />
      <Link to={"/"}>
        <FaHome size={28} />
      </Link>
      <Link to={"/fav"}>
        <FaHeart size={24} />
      </Link>
    </div>
  );
};

export default BtmNav;
