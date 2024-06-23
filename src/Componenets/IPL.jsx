import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

const IPL = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=ipl&from=2024-06-18&sortBy=popularity&apiKey=${API_KEY}`
        );
        // console.log(response);
        const articles = response.data.articles.map((article) => ({
          title: article.title,
          image: article.urlToImage,
          para: article.description,
          description: article.content,
          url: article.url,
          date: new Date(article.publishedAt).toLocaleDateString(),
        }));
        setCards(articles);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 426) {
          setError(
            "Upgrade required. Please upgrade your plan to access this content."
          );
        } else {
          setError("Error fetching data. Please try again later.");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-4 px-8">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden object-cover hover:shadow-xl transform hover:scale-105 transition-transform duration-200 ease-out"
            >
              <img
                src={card.image || "https://via.placeholder.com/300"}
                alt={card.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 truncate">
                  {card.title}
                </h2>
                <p className="text-gray-700 mb-2 truncate">{card.para}</p>
                <p className="text-gray-600 truncate leading-5">
                  {card.description}
                </p>
                <p className="text-gray-500 mt-2">Published on: {card.date}</p>
                <hr className="border-0 h-1 bg-gray-300 rounded-full mt-1 mb-1" />

                <Link
                  to={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-red-500 text-white py-2 px-4 rounded-2xl hover:bg-red-600 transition duration-300"
                >
                  Read more!...
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IPL;
