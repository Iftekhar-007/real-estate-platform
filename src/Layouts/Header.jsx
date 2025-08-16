import React, { use } from "react";
import { NavLink, useNavigate } from "react-router";
import Logo from "./Logo";
import AuthContext from "../Context/AuthContext";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { FaMoon, FaSun } from "react-icons/fa";

const Header = () => {
  const { user, logOutUser } = use(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = (e) => {
    e.preventDefault();

    logOutUser()
      .then(() => {
        navigate("/");
        // console.log("user logged out");
      })
      .catch((error) => {
        // console.log(error.message);
      });
  };

  return (
    <div className="bg-white">
      <header className="lg:w-9/12  mx-auto p-5">
        <div className="navbar  rounded-[6px] px-3 pb-3">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <NavLink to="/" className="text-gray-800">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/allproperties" className="text-gray-800">
                    All Properties
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/blogs" className="text-gray-800">
                    Blogs
                  </NavLink>
                </li>
                {user && (
                  <li>
                    <NavLink to="/dashboard" className="text-gray-800">
                      Dashboard
                    </NavLink>
                  </li>
                )}
                {user && (
                  <li>
                    <NavLink to="/contactus" className="text-gray-800">
                      Contact Us
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>

            <Logo />
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 z-1">
              <li>
                <NavLink to="/" className="text-gray-800">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/allproperties" className="text-gray-800">
                  All Properties
                </NavLink>
              </li>
              <li>
                <NavLink to="/blogs" className="text-gray-800">
                  Blogs
                </NavLink>
              </li>
              {user && (
                <li>
                  <NavLink to="/dashboard" className="text-gray-800">
                    Dashboard
                  </NavLink>
                </li>
              )}
              {user && (
                <li>
                  <NavLink to="/contactus" className="text-gray-800">
                    Contact Us
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          <div className="navbar-end gap-3">
            {user ? (
              <>
                <p className="font-bold">{user.displayName}</p>
                <img
                  data-tooltip-id="user-tooltip"
                  data-tooltip-content={user.displayName || "Profile"}
                  src={user.photoURL}
                  className="w-8 h-8 rounded-full cursor-pointer"
                  alt="avatar"
                />
                <Tooltip id="user-tooltip" place="bottom" className="z-50" />
                <NavLink
                  onClick={handleLogOut}
                  className="btn  text-[#B9375D] hover:bg-[#B9375D] hover:text-white btn-outline"
                >
                  Log Out
                </NavLink>
              </>
            ) : (
              <NavLink
                to="/login"
                className="btn text-[#B9375D] hover:bg-[#B9375D] hover:text-white btn-outline"
              >
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
