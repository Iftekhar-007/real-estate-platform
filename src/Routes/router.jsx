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
import SoldProperties from "../Pages/SoldProperties";
import RequestedProperties from "../Pages/RequestedProperties";
import AdminProfile from "../Pages/AdminProfile";
import ManageProperties from "../Pages/ManageProperties";
import ManageUsers from "../Pages/ManageUsers";
import ManageReviews from "../Pages/ManageReviews";
import Forbidden from "../Pages/Error/Forbidden";
import AdminRoute from "./AdminRoute";
import AgentRoute from "./AgentRoute";
import UserRoute from "./UserRoute";
import DashHome from "../Layouts/Dashboard/DashHome";
import UpdateProperty from "../Pages/UpdateProperty";
import PropertyDetails from "../Pages/PropertyDetails";
import MakeOffer from "../Pages/MakeOffer";
import Payment from "../Pages/Payment";
import ManageAdvertise from "../Pages/ManageAdvertise";

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
        // Component: AllProperties,
        element: (
          <PrivateRoutes>
            <AllProperties></AllProperties>
          </PrivateRoutes>
        ),
      },
      {
        path: "/properties/details/:id",
        element: (
          <PrivateRoutes>
            <PropertyDetails></PropertyDetails>
          </PrivateRoutes>
        ),
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
        index: true,
        element: (
          <PrivateRoutes>
            <DashHome></DashHome>
          </PrivateRoutes>
        ),
      },
      {
        path: "userprofile",
        // Component: UserProfile,
        element: (
          <UserRoute>
            <UserProfile></UserProfile>
          </UserRoute>
        ),
      },
      {
        path: "wishlist",
        // Component: Wishlist,
        element: (
          <UserRoute>
            <Wishlist></Wishlist>
          </UserRoute>
        ),
      },
      {
        path: "purchased-properties",
        // Component: Purchased_Properties,
        element: (
          <UserRoute>
            <Purchased_Properties></Purchased_Properties>
          </UserRoute>
        ),
      },
      {
        path: "my-reviews",
        // Component: MyReviews,
        element: (
          <UserRoute>
            <MyReviews></MyReviews>
          </UserRoute>
        ),
      },
      {
        path: "make-offer/:id",
        element: (
          <PrivateRoutes>
            <UserRoute>
              <MakeOffer></MakeOffer>
            </UserRoute>
          </PrivateRoutes>
        ),
      },
      {
        path: "payment/:id",
        element: (
          <PrivateRoutes>
            <UserRoute>
              <Payment></Payment>
            </UserRoute>
          </PrivateRoutes>
        ),
      },
      {
        path: "agent-profile",
        // Component: AgentProfile,
        element: (
          <AgentRoute>
            <AgentProfile></AgentProfile>
          </AgentRoute>
        ),
      },
      {
        path: "add-property",
        // Component: AddProperty,
        element: (
          <AgentRoute>
            <AddProperty></AddProperty>
          </AgentRoute>
        ),
      },
      {
        path: "my-properties",
        // Component: MyAddedProperties,
        element: (
          <AgentRoute>
            <MyAddedProperties></MyAddedProperties>
          </AgentRoute>
        ),
      },
      {
        path: "update-property/:id",
        element: (
          <PrivateRoutes>
            <AgentRoute>
              <UpdateProperty></UpdateProperty>
            </AgentRoute>
          </PrivateRoutes>
        ),
      },
      {
        path: "sold-properties",
        // Component: SoldProperties,
        element: (
          <AgentRoute>
            <SoldProperties></SoldProperties>
          </AgentRoute>
        ),
      },
      {
        path: "requested-properties",
        // Component: RequestedProperties,
        element: (
          <AgentRoute>
            <RequestedProperties></RequestedProperties>
          </AgentRoute>
        ),
      },

      {
        path: "admin-profile",
        // Component: AdminProfile,
        element: (
          <AdminRoute>
            <AdminProfile></AdminProfile>
          </AdminRoute>
        ),
      },
      {
        path: "manage-properties",
        // Component: ManageProperties,
        element: (
          <AdminRoute>
            <ManageProperties></ManageProperties>
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        // Component: ManageUsers,
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manage-reviews",
        // Component: ManageReviews,
        element: (
          <AdminRoute>
            <ManageReviews></ManageReviews>
          </AdminRoute>
        ),
      },
      {
        path: "manageadvertise",
        element: (
          <PrivateRoutes>
            <AdminRoute>
              <ManageAdvertise></ManageAdvertise>
            </AdminRoute>
          </PrivateRoutes>
        ),
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
  {
    path: "/forbidden",
    element: <Forbidden></Forbidden>,
  },
]);

export default router;
