import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "./useAxiosSecure";
// import useAuth from "./useAuth";
import AxiosSecure from "../Routes/AxiosSecure";
import { use } from "react";
import AuthContext from "../Context/AuthContext";

const useOffers = () => {
  const axiosSecure = AxiosSecure();
  const { user } = use(AuthContext);

  const {
    data: offers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userOffers", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers/user/${user.email}`);
      return res.data;
    },
  });

  return [offers, isLoading, refetch];
};

export default useOffers;
