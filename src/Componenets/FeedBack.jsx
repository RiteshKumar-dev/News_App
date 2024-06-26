import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import BtmNav from "./BtmNav";

const BASE_URL = import.meta.env.VITE_REACT_APP_FIREBASE_BASE_URL;

const FeedBack = () => {
  const [redirect, setRedirect] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    username: "",
    email: "",
    message: "",
  });
  const { userData, theme } = useContext(ThemeContext);
  // console.log(userData);

  useEffect(() => {
    if (userData) {
      setContactInfo({
        username: userData.displayName,
        email: userData.email,
        message: "",
      });
    }
  }, [userData]);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setContactInfo({
      ...contactInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/contacts.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactInfo),
      });
      if (response.ok) {
        setContactInfo({ username: "", email: "", message: "" });
        const data = await response.json();
        toast.success("Message sent...");
        setRedirect(true);
      } else {
        toast.error("Message not sent...!");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while sending the message.");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex lg:flex-row flex-col">
        {/* Left side - Security image */}
        <div className="lg:w-1/2 flex items-center justify-center p-4">
          <img
            src="https://img.freepik.com/free-vector/flat-customer-support-illustration_23-2148899114.jpg?w=740"
            alt="Security Image"
            className="max-w-xs"
          />
        </div>
        {/* Right side - Contact form */}
        <div className="lg:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-4 underline">Contact Us...</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative z-0">
              <input
                type="text"
                name="username"
                id="floating_standard_username"
                className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 dark:focus:border-blue-500 peer"
                placeholder=" "
                value={contactInfo.username}
                onChange={handleInputs}
              />
              <label
                htmlFor="floating_standard_username"
                className="absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 dark:peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Username...
              </label>
            </div>
            <div className="relative z-0">
              <input
                type="email"
                name="email"
                id="floating_standard_email"
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 dark:focus:border-blue-500 peer"
                placeholder=" "
                value={contactInfo.email}
                onChange={handleInputs}
              />
              <label
                htmlFor="floating_standard_email"
                className="absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 dark:peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email...
              </label>
            </div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Your message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
              onChange={handleInputs}
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
            >
              Send
            </button>
          </form>
          <div className="flex items-center justify-center mt-4">
            <div className="border-b border-gray-400 w-1/4"></div>
            <div className="mx-3 text-gray-800 dark:text-gray-700">or</div>
            <div className="border-b border-gray-400 w-1/4"></div>
          </div>
          <p className="text-center mt-2">
            Don't have an account?
            <Link to={"/auth"} className="font-bold underline text-red-500">
              Sign up...
            </Link>
          </p>
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
        <BtmNav />
      </div>
    </div>
  );
};

export default FeedBack;
