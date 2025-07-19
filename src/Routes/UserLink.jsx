// import useUserRole from "../Components/Hooks/useUserRole";

import useUserRole from "../Hooks/useUserRole";

// import useUserRole from "../Components/Hooks/UseUserRole";

const UserLink = ({ children }) => {
  const { role, isLoading } = useUserRole();
  //   console.log(role);

  if (isLoading)
    return <span className="loading loading-spinner loading-xl"></span>;
  if (role !== "user") return null;

  return <>{children}</>;
};

export default UserLink;
