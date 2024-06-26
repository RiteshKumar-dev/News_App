import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { FaMailBulk, FaPhoneAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

const ContactBtn = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="flex items-center justify-center">
      <button
        className={
          theme === "dark"
            ? "text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            : "text-gray-700 font-bold py-2 px-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        }
      >
        <FaPhoneAlt size={22} />
      </button>
    </div>
  );
};

export default ContactBtn;
