import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BtmNav from "./BtmNav";
import { ThemeContext } from "../Context/ThemeContext";

const Articles = () => {
  const { index } = useParams();
  const cardIndex = parseInt(index, 10);
  const data = JSON.parse(localStorage.getItem("data"));
  const { theme } = useContext(ThemeContext); // Theme context for dynamic theme changes

  const [currentTheme, setCurrentTheme] = useState(theme); // State to track current theme

  useEffect(() => {
    setCurrentTheme(theme); // Update currentTheme state when theme changes
  }, [theme]);

  if (!data || isNaN(cardIndex) || cardIndex < 0 || cardIndex >= data.length) {
    return <div>Invalid card index</div>;
  }

  const card = data[cardIndex];

  if (!card) {
    return <div>Card data not found</div>;
  }

  return (
    <div className="py-8 px-4 lg:px-8 rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
      <img
        src={card.image || "https://via.placeholder.com/300"}
        alt={card.title}
        className="w-full h-48 object-cover lg:rounded-lg lg:h-full"
      />
      <div className="flex flex-col justify-between p-6">
        <div>
          <h2
            className={`text-2xl font-bold mb-2 ${
              currentTheme === "dark" ? "text-white" : "text-black"
            }`}
          >
            <span
              className={
                currentTheme === "dark"
                  ? "mr-2 text-gray-400"
                  : "mr-2 text-gray-400"
              }
            >
              Author:
            </span>
            {card.author || "The Times Of India..."}
          </h2>
          <h2
            className={`text-2xl font-bold mb-4 ${
              currentTheme === "dark" ? "text-white" : ""
            }`}
          >
            {card.title}
          </h2>
          <p
            className={`mb-4 ${
              currentTheme === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            {card.description}
          </p>
          <p
            className={`mb-4 ${
              currentTheme === "dark" ? "text-white" : "text-gray-600"
            }`}
          >
            {card.content}
          </p>
        </div>
        <div>
          <p
            className={`mb-4 ${
              currentTheme === "dark" ? "text-white" : "text-gray-500"
            }`}
          >
            <span
              className={
                currentTheme === "dark"
                  ? "mr-2 text-gray-400"
                  : "mr-2 text-gray-400"
              }
            >
              Published on:
            </span>
            {new Date(card.date).toLocaleDateString()}
          </p>
          <Link
            to={
              card.url ? card.url : "https://timesofindia.indiatimes.com/news"
            }
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300`}
          >
            Read more!...
          </Link>
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
        <BtmNav />
      </div>
    </div>
  );
};

export default Articles;
