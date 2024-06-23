import React, { useEffect, useState, useContext, Suspense } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { ThemeContext } from "../Context/ThemeContext";
import { toast } from "react-toastify";

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

const Index = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("Trending");
  const { userData, setUserData, theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${searchTerm}&from=2024-06-22&sortBy=popularity&pageSize=100&apiKey=${API_KEY}`
      );
      localStorage.setItem("data", JSON.stringify(response.data));
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
  useEffect(() => {
    if (userData) {
      setUserData(userData);
    }
    fetchData();
    // fetchNews();
  }, []);

  const handleAuth = () => {
    window.alert("You don't have an account...");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm) {
      console.log(trimmedSearchTerm);
      setIsPopupOpen(false);
      setSearchTerm(trimmedSearchTerm);
      fetchData();
      toast.success(searchTerm);
    } else {
      toast.warn("Search term is empty...");
    }
  };

  return (
    <div className="relative py-4 px-8">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <>
          {cards.length === 0 ? (
            <div className="flex justify-center items-center h-screen">
              <p className="text-gray-500">No search results found.</p>
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
                  <Suspense key={index} fallback={<CircularProgress />}>
                    <Link
                      to={userData ? `/articles/${index}` : "/auth"}
                      key={index}
                      className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden object-cover hover:shadow-xl transform hover:scale-105 transition-transform duration-200 ease-out"
                      onClick={() => {
                        if (!userData) handleAuth();
                      }}
                    >
                      <img
                        src={card.image || "https://via.placeholder.com/300"}
                        alt={card.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h2 className="text-xl font-bold mb-2">{card.title}</h2>
                        <p className="text-gray-700 mb-2 truncate">
                          {card.para}
                        </p>
                        <p className="text-gray-600 truncate leading-5">
                          {card.description}
                        </p>
                        <p className="text-gray-500 mt-2">
                          Published on: {card.date}
                        </p>
                      </div>
                    </Link>
                  </Suspense>
                ))}
            </div>
          )}
          <div className="fixed bottom-4 right-4">{/* <ThemeToggle /> */}</div>
          <button
            className={
              theme === "dark"
                ? "fixed top-20 left-4 text-black py-2 px-2 bg-white rounded-full z-50"
                : "fixed top-20 left-4 text-white py-2 px-2 bg-gray-400 rounded-full z-50"
            }
            onClick={() => setIsPopupOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
          {isPopupOpen && userData && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg relative">
                <button
                  className="absolute top-2 right-2 text-gray-600"
                  onClick={() => setIsPopupOpen(false)}
                >
                  &times;
                </button>
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded-lg w-full"
                    placeholder="Search..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearchSubmit(e);
                      }
                    }}
                  />
                  <button
                    type="submit"
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Index;
