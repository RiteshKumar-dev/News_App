import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
import { toast } from "react-toastify";
import BtmNav from "./BtmNav";

const Profile = () => {
  const { userData, setUserData, theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  // console.log(theme);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    toast.warn("Authentication remove");
    setUserData(null);
    navigate("/auth");
  };

  return (
    <div
      className={
        theme === "dark"
          ? "flex justify-center items-center min-h-screen bg-darkerGray"
          : "flex justify-center items-center min-h-screen bg-white"
      }
    >
      <div
        className={
          theme === "dark"
            ? "w-full max-w-sm my-10 p-6 bg-darkerGray rounded-lg"
            : "w-full max-w-sm my-10 p-6 bg-white rounded-lg"
        }
      >
        {userData ? (
          <div className="flex flex-col items-center">
            <img
              src={userData.photoURL}
              alt="Profile"
              className="w-32 h-32 rounded-full"
            />
            <h2
              className={
                theme === "dark"
                  ? "text-center text-2xl font-bold mt-4 text-white"
                  : "text-center text-2xl font-bold mt-4"
              }
            >
              {userData.displayName}
            </h2>
            <p
              className={
                theme === "dark"
                  ? "text-center mt-2 text-white"
                  : "text-center mt-2"
              }
            >
              {userData.email}
            </p>
            <button
              onClick={handleLogout}
              className="mt-6 w-full bg-red-500 text-white py-2 font-semibold rounded-full"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-600">No user data available.</p>
        )}
      </div>
      <div className="fixed bottom-4 right-4">
        <BtmNav />
      </div>
    </div>
  );
};

export default Profile;
