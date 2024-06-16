// Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Componenets/Navbar";
import Footer from "./Componenets/Footer";

const Layout = () => {
  return (
    <div className="">
      <Navbar />
      <div className="mt-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
