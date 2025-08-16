import React from "react";
import { NavLink } from "react-router";

const Logo = () => {
  return (
    <div>
      <NavLink to="/">
        <h2 className="lg:text-5xl font-bold font-philo text-gray-800 ">
          Real Estate
        </h2>
      </NavLink>
    </div>
  );
};

export default Logo;
