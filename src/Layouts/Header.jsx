// import React, { use } from "react";
// import { NavLink, useNavigate } from "react-router";
// import Logo from "./Logo";
// import AuthContext from "../Context/AuthContext";
// // import ReactTooltip from "react-tooltip";
// import { Tooltip } from "react-tooltip";

// const Header = () => {
//   const { user, logOutUser } = use(AuthContext);
//   const navigate = useNavigate();

//   const handleLogOut = (e) => {
//     e.preventDefault();

//     logOutUser()
//       .then((res) => {
//         navigate("/");
//         console.log("user logged out");
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };
//   return (
//     <header className="lg:w-9/12 mx-auto p-5">
//       <div className="navbar bg-white rounded-[6px] px-3 pb-3">
//         <div className="navbar-start">
//           <div className="dropdown">
//             <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 {" "}
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h8m-8 6h16"
//                 />{" "}
//               </svg>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
//             >
//               <li>
//                 <NavLink to="/">Home</NavLink>
//               </li>
//               <li>
//                 <NavLink to="/allproperties">All Properties</NavLink>
//               </li>

//               {user && (
//                 <li>
//                   <NavLink to="/dashboard">Dashboard</NavLink>
//                 </li>
//               )}
//               {/* <li>
//                 <NavLink to="/dashboard">Dashboard</NavLink>
//               </li> */}
//             </ul>
//           </div>

//           <Logo></Logo>
//         </div>
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal px-1 z-1">
//             <li>
//               <NavLink to="/">Home</NavLink>
//             </li>
//             <li>
//               <NavLink to="/allproperties">All Properties</NavLink>
//             </li>

//             {/* <li>
//               <NavLink to="/dashboard">Dashboard</NavLink>
//             </li> */}

//             {user && (
//               <li>
//                 <NavLink to="/dashboard">Dashboard</NavLink>
//               </li>
//             )}
//           </ul>
//         </div>
//         <div className="navbar-end gap-3">
//           {user ? (
//             <>
//               <img
//                 data-tip={user.displayName}
//                 src={user.photoURL}
//                 className="w-8 rounded-full cursor-pointer"
//                 alt="avatar"
//               />
//               <ReactTooltip place="bottom" type="dark" effect="solid" />

//               <NavLink onClick={handleLogOut} className="btn">
//                 Log Out
//               </NavLink>
//             </>
//           ) : (
//             <NavLink to="/login" className="btn">
//               sign In
//             </NavLink>
//           )}

//           {/* <NavLink className="btn">sign In</NavLink> */}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { use } from "react";
import { NavLink, useNavigate } from "react-router";
import Logo from "./Logo";
import AuthContext from "../Context/AuthContext";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Header = () => {
  const { user, logOutUser } = use(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = (e) => {
    e.preventDefault();

    logOutUser()
      .then(() => {
        navigate("/");
        console.log("user logged out");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

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
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/allproperties">All Properties</NavLink>
              </li>
              {user && (
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
              )}
            </ul>
          </div>

          <Logo />
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 z-1">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/allproperties">All Properties</NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
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
              <NavLink onClick={handleLogOut} className="btn">
                Log Out
              </NavLink>
            </>
          ) : (
            <NavLink to="/login" className="btn">
              Sign In
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
