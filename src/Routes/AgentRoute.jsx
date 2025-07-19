import { Navigate, useLocation } from "react-router";

import { use } from "react";
import AuthContext from "../Context/AuthContext";
import useUserRole from "../Hooks/useUserRole";

const AgentRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const { role, isLoading } = useUserRole();
  const location = useLocation();

  if (isLoading || loading) return <span>Forbidden......</span>;
  if (!user || role !== "agent")
    return <Navigate to="/" state={{ from: location }} />;

  return children;
};

export default AgentRoute;
