import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import AxiosSecure from "../Routes/AxiosSecure";
import AuthContext from "../Context/AuthContext";
// import Context from "../Contexts/Context";
// import AxiosSecure from "./AxiosSecure";

const useUserRole = () => {
  const axiosSecure = AxiosSecure();
  const { user, loading } = use(AuthContext);

  const { data: role, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    staleTime: 0,
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      console.log("🔐 Role response:", res.data);
      return res.data?.role || "user";
    },
  });

  console.log("🎯 Role Hook - User:", user?.email, "Role:", role);

  return { role, isLoading };
};

export default useUserRole;
