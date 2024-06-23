// src/components/ThemeToggle.jsx
import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full focus:outline-none flex items-center justify-center"
      style={{
        backgroundColor: theme === "light" ? "#333" : "#f8f8f8",
        color: theme === "light" ? "#f8f8f8" : "#333",
      }}
    >
      {theme === "light" ? <FaMoon size={24} /> : <FaSun size={24} />}
    </button>
  );
};

export default ThemeToggle;
