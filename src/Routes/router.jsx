import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayOut from "../Layouts/RootLayOut";
import Home from "../Pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayOut,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);

export default router;
