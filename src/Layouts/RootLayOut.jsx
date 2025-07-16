import React from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import Footer from "./Footer";

const RootLayOut = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayOut;
