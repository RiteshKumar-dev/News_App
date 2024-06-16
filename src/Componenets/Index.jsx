import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

const Index = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=IPL&from=2024-05-16&sortBy=publishedAt&pageSize=100&apiKey=${API_KEY}`
        );
        const articles = response.data.articles.map((article) => ({
          title: article.title,
          image: article.urlToImage,
          para: article.description,
          description: article.content,
          date: new Date(article.publishedAt).toLocaleDateString(),
        }));
        setCards(articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
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
                <h2 className="text-xl font-bold mb-2">{card.title}</h2>
                <p className="text-gray-700 mb-2 truncate">{card.para}</p>
                <p className="text-gray-600 truncate leading-5">
                  {card.description}
                </p>
                <p className="text-gray-500 mt-2">Published on: {card.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
