import React, { useEffect, useState, useContext, Suspense } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { ThemeContext } from "../Context/ThemeContext";
import { toast } from "react-toastify";
import ContactBtn from "./ContactBtn";
import BtmNav from "./BtmNav";

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
const BASE_URL = import.meta.env.VITE_REACT_APP_FIREBASE_BASE_URL;

const FavNews = () => {
  const [cards, setCards] = useState([]);
  const [allCards, setAllCards] = useState([]); // To store all data from Firebase
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("Birds");
  const { userData, setUserData, theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${searchTerm}&from=2024-06-24&sortBy=popularity&pageSize=100&apiKey=${API_KEY}`
      );
      // console.log(response.data);
      localStorage.setItem("favdata", JSON.stringify(response.data));
      const articles = response.data.articles.map((article) => ({
        title: article.title || "",
        image: article.urlToImage || "",
        para: article.description || "",
        description: article.content || "",
        url: article.url || "",
        date: new Date(article.publishedAt).toLocaleDateString() || "",
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

  useEffect(() => {
    if (userData) {
      setUserData(userData);
    }
    // fetchData();
    fetchFirebaseData();
  }, []);

  const handleAuth = () => {
    toast.warn("You don't have an account...");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();
    if (trimmedSearchTerm) {
      // console.log(trimmedSearchTerm);
      setIsPopupOpen(false);
      setSearchTerm(trimmedSearchTerm);
      filterData(trimmedSearchTerm); // Filter data based on the search term
      toast.success(searchTerm);
    } else {
      toast.warn("Search term is empty...");
    }
  };

  /// Store data in Firebase
  const storeData = async (articles) => {
    try {
      const response = await fetch(`${BASE_URL}/newsfavData.json`, {
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
      const response = await fetch(`${BASE_URL}/newsfavData.json`);
      if (!response.ok) {
        throw new Error("Failed to fetch data from Firebase");
      }
      const data = await response.json();
      const articles = Object.values(data).flatMap((item) => item.articles);
      localStorage.setItem("favdata", JSON.stringify(articles));
      setAllCards(articles); // Store all data in state
      setCards(articles); // Initially display all data
      // console.log("from firebase", articles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
      setError("Error fetching data from Firebase. Please try again later.");
      setLoading(false);
    }
  };

  // Filter data based on the search term
  const filterData = (searchTerm) => {
    const filteredArticles = allCards.filter((article) => {
      const title = article.title ? article.title.toLowerCase() : "";
      const para = article.para ? article.para.toLowerCase() : "";
      const description = article.description
        ? article.description.toLowerCase()
        : "";

      return (
        title.includes(searchTerm) ||
        para.includes(searchTerm) ||
        description.includes(searchTerm)
      );
    });
    setCards(filteredArticles);
  };

  const FallbackComponent = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 p-6 bg-white shadow-lg rounded-lg">
        <CircularProgress />
        <p className="text-gray-500 mt-4">Loading...</p>
      </div>
    </div>
  );

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
                    card.date &&
                    card.url
                )
                .map((card, index) => (
                  <Suspense key={index} fallback={<FallbackComponent />}>
                    <Link
                      to={userData ? `/articles/${index}` : "/auth"}
                      key={index}
                      className="cursor-pointer bg-white rounded-lg overflow-hidden object-cover transform hover:scale-105 transition-transform duration-200 ease-out"
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
          <div
            className={
              theme === "dark"
                ? "fixed bottom-4 right-4 cursor-pointer text-gray-600 py-2 px-2 bg-white rounded-full z-50  hidden sm:flex"
                : "fixed bottom-4 right-4 cursor-pointer py-2 px-2 bg-gray-600 rounded-full z-50 text-white  hidden sm:flex"
            }
          >
            <Link to={"/contact"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-8"
              >
                <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
              </svg>
            </Link>
          </div>
          <div className="fixed bottom-4 right-4">
            <BtmNav />
          </div>
          <button
            className={
              theme === "dark"
                ? "fixed top-20 left-4 text-black py-2 px-2 bg-white rounded-full z-50"
                : "fixed top-20 left-4 text-white py-2 px-2 bg-gray-400 rounded-full z-50"
            }
            onClick={() => {
              setIsPopupOpen(true);
              if (!userData) handleAuth();
            }}
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
                    placeholder="Search..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchTerm.trim() === "") {
                        e.preventDefault();
                        toast.warn("Search term is empty...");
                      }
                    }}
                  />
                  <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
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

export default FavNews;
