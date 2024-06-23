import React from "react";
import { Link, useParams } from "react-router-dom";

const Articles = () => {
  const { index } = useParams();
  const cardIndex = parseInt(index, 10);
  const data = JSON.parse(localStorage.getItem("data"));
  const theme = localStorage.getItem("theme");

  if (
    !data ||
    isNaN(cardIndex) ||
    cardIndex < 0 ||
    cardIndex >= data.articles.length
  ) {
    return <div>Invalid card index</div>;
  }

  const card = data.articles[cardIndex];

  if (!card) {
    return <div>Card data not found</div>;
  }

  return (
    <div className="py-8 px-4 lg:px-8 rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
      <img
        src={card.urlToImage || "https://via.placeholder.com/300"}
        alt={card.title}
        className="w-full h-48 object-cover lg:h-auto lg:rounded-lg lg:h-full"
      />
      <div className="flex flex-col justify-between p-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-red-500">
            <span
              className={
                theme === "dark" ? "text-white mr-2" : "text-black mr-2"
              }
            >
              Author:
            </span>
            {card.author}
          </h2>
          <h2
            className={
              theme === "dark"
                ? "text-2xl font-bold mb-4 text-white"
                : "text-2xl font-bold mb-4"
            }
          >
            {card.title}
          </h2>
          <p
            className={
              theme === "dark" ? "text-white mb-4" : "text-gray-700 mb-4"
            }
          >
            {card.description}
          </p>
          <p
            className={
              theme === "dark" ? "text-white mb-4" : "text-gray-600 mb-4"
            }
          >
            {card.content}
          </p>
        </div>
        <div>
          <p
            className={
              theme === "dark" ? "text-white mb-4" : "text-gray-500 mb-4"
            }
          >
            <span
              className={
                theme === "dark" ? "text-white mr-2" : "text-black mr-2"
              }
            >
              Published on:
            </span>
            {new Date(card.publishedAt).toLocaleDateString()}
          </p>
          <Link
            to={card.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Read more!...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Articles;
