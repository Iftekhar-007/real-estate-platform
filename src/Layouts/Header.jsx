import React from "react";
import { NavLink } from "react-router";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="lg:w-9/12 mx-auto p-5">
      <div className="navbar bg-white rounded-[6px] px-3 pb-3">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/allproperties">All Properties</NavLink>
              </li>

              {/* {user && (
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            )} */}
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            </ul>
          </div>

          <Logo></Logo>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 z-1">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/allproperties">All Properties</NavLink>
            </li>

            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>

            {/* {user && (
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            )} */}
          </ul>
        </div>
        <div className="navbar-end gap-3">
          {/* {user ? (
            <>
              <img
                title={user.displayName}
                src={user.photoURL}
                className="w-16 rounded-full"
                alt="avatar"
              />
              <NavLink onClick={handleLogOut} className="btn bg-primary">
                Log Out
              </NavLink>

              <NavLink to="/bearider" className="btn bg-primary">
                Be A Rider
              </NavLink>
            </>
          ) : (
            <NavLink to="/login" className="btn bg-primary">
              sign In
            </NavLink>
          )} */}
          {/* <NavLink to="/bearider" className="btn bg-primary">
            Be A Rider
          </NavLink> */}

          <NavLink className="btn">sign In</NavLink>
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              className="theme-controller"
              value="synthwave"
            />
          </label>
        </div>
      </div>
    </header>
  );
};

export default Header;
