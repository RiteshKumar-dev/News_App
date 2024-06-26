import React, { useEffect, useState, useContext } from "react";
import { auth, provider } from "../FbConfig";
import { signInWithPopup } from "firebase/auth";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { ThemeContext } from "../Context/ThemeContext";
import BtmNav from "./BtmNav";

const SignUp = () => {
  const [credentials, setCredentials] = useState("");
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleAuth = () => {
    signInWithPopup(auth, provider).then((data) => {
      const user = data.user;
      const userData = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      };
      setCredentials(user.email);
      localStorage.setItem("userData", JSON.stringify(userData));
    });
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setCredentials(userData.email);
    }
  }, []);

  const handleRed = () => {
    toast.success("Authentication successfull");
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    if (credentials) {
      handleRed();
    }
  }, [credentials]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex lg:flex-row flex-col">
        {/* Left side - Security image */}
        <div className="lg:w-1/2 flex items-center justify-center">
          <img
            src="https://img.freepik.com/free-photo/computer-security-with-login-password-padlock_107791-16191.jpg?w=900&t=st=1711897760~exp=1711898360~hmac=e48e4251d9c6974dbe476ca3789f8617340403c1c9b337c758e999d003c552cd"
            alt="Security Image"
            className="max-w-xs"
          />
        </div>
        {/* Right side - Login form */}
        <div className="lg:w-1/2 bg-white p-8">
          <h2 className="text-2xl font-bold mb-4 underline">Login...</h2>
          {/* <div className="flex items-center justify-center mb-4">
            <div className="border-b border-gray-400 w-1/4"></div>
            <div className="mx-3 text-gray-800">or</div>
            <div className="border-b border-gray-400 w-1/4"></div>
          </div> */}

          <div className="mb-2">
            {credentials ? (
              <Navigate to="/" />
            ) : (
              <button
                onClick={handleAuth}
                className="bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-300 shadow-lg transform hover:scale-105 flex items-center mb-2"
              >
                <FcGoogle className="ml-2 mr-4" size={26} />
                Continue with Google
              </button>
            )}
          </div>

          <button
            onClick={handleAuth}
            className="bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-300 shadow-lg transform hover:scale-105 flex items-center"
          >
            <AiFillGithub className="ml-2 mr-4" size={26} />
            Continue with Github
          </button>
          <p className="text-center mt-4">
            Don't have an account?
            <Link
              to={"/signup"}
              className="font-bold underline text-red-500 ml-1"
            >
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

export default SignUp;
