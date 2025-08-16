import React from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";

const RootLayOut = () => {
  return (
    <div>
      <div className="sticky top-0 z-10 shadow-xl">
        <Header></Header>
      </div>
      <Outlet></Outlet>
      <Footer></Footer>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default RootLayOut;
