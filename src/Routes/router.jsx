import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayOut from "../Layouts/RootLayOut";
import Home from "../Pages/Home";
import AllProperties from "../Pages/AllProperties";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import LogIn from "../Authentication/LogIn";
import SignUp from "../Authentication/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayOut,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allproperties",
        Component: AllProperties,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/login",
    Component: LogIn,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
]);

export default router;
