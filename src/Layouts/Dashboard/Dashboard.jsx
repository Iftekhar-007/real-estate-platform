// import React from "react";
// import Logo from "../Logo";
// import { NavLink, Outlet } from "react-router";
// import { FaHome } from "react-icons/fa";
// import { ToastContainer } from "react-toastify";

// const Dashboard = () => {
//   return (
//     <div>
//       <div className="lg:w-9/12 mx-auto">
//         <div className="drawer lg:drawer-open">
//           <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

//           <div className="drawer-content flex flex-col">
//             {/* Navbar */}
//             <div className="lg:hidden">
//               <div className="flex-none">
//                 <label
//                   htmlFor="my-drawer-2"
//                   aria-label="open sidebar"
//                   className="btn btn-square btn-ghost"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     className="inline-block h-6 w-6 stroke-current"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M4 6h16M4 12h16M4 18h16"
//                     ></path>
//                   </svg>
//                 </label>
//               </div>
//             </div>
//             <Outlet></Outlet>
//           </div>
//           <div className="drawer-side">
//             <label
//               htmlFor="my-drawer-2"
//               aria-label="close sidebar"
//               className="drawer-overlay"
//             ></label>
//             <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
//               <div className="my-14">
//                 <Logo></Logo>
//               </div>

//               {/* Sidebar content here */}
//               <li>
//                 <NavLink to="/dashboard">
//                   <FaHome></FaHome>
//                   Home
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//       <ToastContainer></ToastContainer>
//     </div>
//   );
// };

// export default Dashboard;

import React, { use } from "react";
import Logo from "../Logo";
import { NavLink, Outlet, useNavigate } from "react-router";
import {
  FaCheckCircle,
  FaComments,
  FaEnvelopeOpenText,
  FaHeart,
  FaHome,
  FaListAlt,
  FaPlusSquare,
  FaShoppingCart,
  FaStar,
  FaTasks,
  FaUser,
  FaUsersCog,
  FaUserShield,
  FaUserTie,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import AuthContext from "../../Context/AuthContext";

const Dashboard = () => {
  const { logOutUser } = use(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Logout logic here (like Firebase signOut or clearing localStorage)
    console.log("User logged out");

    logOutUser()
      .then(() => {
        console.log("user logged out");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <div className="lg:w-9/12 mx-auto">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

          <div className="drawer-content flex flex-col">
            {/* Navbar for small screen */}
            <div className="lg:hidden">
              <div className="flex-none">
                <label
                  htmlFor="my-drawer-2"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
            </div>

            <div className="p-4">
              <Outlet />
            </div>
          </div>

          {/* Sidebar */}
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <div className="bg-base-200 text-base-content w-80 flex flex-col min-h-screen sticky top-0">
              <div className="my-14 mx-auto">
                <Logo />
              </div>

              {/* Sidebar menu */}
              <ul className="menu flex-1 w-full">
                {/* user links */}
                <li>
                  <NavLink to="/dashboard" end className="font-bold">
                    <FaHome />
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/userprofile" className="font-bold">
                    <FaUser />
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/wishlist" className="font-bold">
                    <FaHeart />
                    Wishlist
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/purchased-properties"
                    className="font-bold"
                  >
                    <FaShoppingCart />
                    Property Bought
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/my-reviews" className="font-bold">
                    <FaStar />
                    My Reviews
                  </NavLink>
                </li>

                {/* Agent links */}
                <li>
                  <NavLink to="/dashboard/agent-profile" className="font-bold">
                    <FaUserTie />
                    Agent Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/add-property" className="font-bold">
                    <FaPlusSquare />
                    Add Property
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/my-properties" className="font-bold">
                    <FaListAlt />
                    My Added Property
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/sold-properties"
                    className="font-bold"
                  >
                    <FaCheckCircle />
                    My Sold Property
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/requested-properties"
                    className="font-bold"
                  >
                    <FaEnvelopeOpenText />
                    Requested Property
                  </NavLink>
                </li>

                {/* admin links */}
                <li>
                  <NavLink to="/dashboard/admin-profile" className="font-bold">
                    <FaUserShield />
                    Admin Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-properties"
                    className="font-bold"
                  >
                    <FaTasks />
                    Manage Properties
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-users" className="font-bold">
                    <FaUsersCog />
                    Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-reviews" className="font-bold">
                    <FaComments />
                    Manage Reviews
                  </NavLink>
                </li>
              </ul>

              {/* Logout button at the bottom */}
              <div className="p-4">
                <button
                  onClick={handleLogout}
                  className="btn bg-[#003146] w-full text-white"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
