import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayOut from "../Layouts/RootLayOut";
import Home from "../Pages/Home";
import AllProperties from "../Pages/AllProperties";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import LogIn from "../Authentication/LogIn";
import SignUp from "../Authentication/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import UserProfile from "../Pages/Profiles/UserProfile";
import Wishlist from "../Pages/Wishlist";
import Purchased_Properties from "../Pages/Purchased_Properties";
import MyReviews from "../Pages/MyReviews";
import AgentProfile from "../Pages/Profiles/AgentProfile";
import AddProperty from "../Pages/AddProperty";
import NotFound from "../Pages/Error/NotFound";
import MyAddedProperties from "../Pages/MyAddedProperties";

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
    // Component: Dashboard,
    element: (
      <PrivateRoutes>
        <Dashboard></Dashboard>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "userprofile",
        Component: UserProfile,
      },
      {
        path: "wishlist",
        Component: Wishlist,
      },
      {
        path: "purchased-properties",
        Component: Purchased_Properties,
      },
      {
        path: "my-reviews",
        Component: MyReviews,
      },
      {
        path: "agent-profile",
        Component: AgentProfile,
      },
      {
        path: "add-property",
        Component: AddProperty,
      },
      {
        path: "my-properties",
        Component: MyAddedProperties,
      },
    ],
  },
  {
    path: "/login",
    Component: LogIn,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;
