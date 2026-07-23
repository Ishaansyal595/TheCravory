import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./home page/Navbar-section/Navbar";
import Footer from "./home page/Footer/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-screen overflow-hidden">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
