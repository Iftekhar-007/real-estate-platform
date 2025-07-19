import React from "react";
import useUserRole from "../../Hooks/useUserRole";
import { NavLink } from "react-router";
import { FaUser } from "react-icons/fa";
import UserProfile from "../../Pages/Profiles/UserProfile";
import AgentProfile from "../../Pages/Profiles/AgentProfile";
import AdminProfile from "../../Pages/AdminProfile";

const DashHome = () => {
  const { role } = useUserRole();
  return (
    <div>
      {role === "user" && <UserProfile></UserProfile>}
      {role === "agent" && <AgentProfile></AgentProfile>}
      {role === "admin" && <AdminProfile></AdminProfile>}
    </div>
  );
};

export default DashHome;
