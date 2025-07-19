import useUserRole from "../Hooks/useUserRole";

// import useUserRole from "../Components/Hooks/UseUserRole";

const AgentLink = ({ children }) => {
  const { role, isLoading } = useUserRole();
  //   console.log(role);

  if (isLoading)
    return <span className="loading loading-spinner loading-xl"></span>;
  if (role !== "agent") return null;

  return <>{children}</>;
};

export default AgentLink;
