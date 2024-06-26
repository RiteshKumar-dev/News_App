import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import BtmNav from "./BtmNav";

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
const BASE_URL = import.meta.env.VITE_REACT_APP_FIREBASE_BASE_URL;

const IPL = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=ipl&from=2024-06-22&sortBy=popularity&apiKey=${API_KEY}`
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
      // storeData(articles);
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
  // Store data in Firebase
  const storeData = async (articles) => {
    try {
      const response = await fetch(`${BASE_URL}/newsIplData.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ articles }),
      });
      if (!response.ok) {
        throw new Error("Failed to store data in Firebase");
      }
      console.log("Data stored successfully in Firebase");
      console.log(response);
    } catch (error) {
      console.error("Error storing data in Firebase:", error);
    }
  };
  // Fetch data from Firebase
  const fetchFirebaseData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/newsIplData.json`);
      if (!response.ok) {
        throw new Error("Failed to fetch data from Firebase");
      }
      const data = await response.json();
      const articles = Object.values(data).flatMap((item) => item.articles);
      localStorage.setItem("ipldata", JSON.stringify(articles));
      setCards(articles);
      // console.log("from firebase", articles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
      setError("Error fetching data from Firebase. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchData();
    fetchFirebaseData();
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
          {cards
            .filter(
              (card) =>
                card.title &&
                card.image &&
                card.para &&
                card.description &&
                card.date
            )
            .map((card, index) => (
              <div
                key={index}
                className="cursor-pointer bg-white rounded-lg overflow-hidden object-cover  transform hover:scale-105 transition-transform duration-200 ease-out"
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
                  <p className="text-gray-500 mt-2">
                    Published on: {card.date}
                  </p>
                  {/* <hr className="border-0 h-1 bg-gray-300 rounded-full mt-1 mb-1" /> */}

                  <Link
                    to={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block bg-red-400 text-white py-2 px-4 rounded-2xl hover:bg-red-500 transition duration-300"
                  >
                    Read more!...
                  </Link>
                </div>
              </div>
            ))}
        </div>
      )}
      <div className="fixed bottom-4 right-4">
        <BtmNav />
      </div>
    </div>
  );
};

export default IPL;
