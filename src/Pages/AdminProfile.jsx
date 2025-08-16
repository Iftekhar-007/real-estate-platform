import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";

import { FaUser, FaUserShield, FaUserTie } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
// import AuthContext from "../../Context/AuthContext";
// import AxiosSecure from "../../Routes/AxiosSecure";
import AuthContext from "../Context/AuthContext";
import AxiosSecure from "../Routes/AxiosSecure";
import DashboardCharts from "../Layouts/DashboardCharts";

const AdminProfile = () => {
  const { user } = use(AuthContext);
  const axiosSecure = AxiosSecure();

  const { data: userInfo = {}, isLoading } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div>
      <h2 className="lg:text-5xl font-bold text-center my-10 font-philo">
        My Profile
      </h2>
      <div className="flex justify-center mt-12">
        <div className="card w-96 bg-gradient-to-br from-base-100 to-base-200 shadow-xl border border-base-300">
          <figure className="pt-6">
            <img
              src={userInfo.image}
              alt="User"
              className="w-28 h-28 rounded-full object-cover border-4 border-primary shadow-md"
            />
          </figure>
          <div className="card-body items-center text-center space-y-2">
            <h2 className="card-title text-xl font-bold flex items-center gap-2">
              <FaUser className="text-primary" />
              {userInfo.name}
            </h2>

            <p className="flex">
              <span className="flex justify-center items-center mx-1">
                <FaUser></FaUser>Role:{" "}
              </span>
              {userInfo.role}
            </p>

            {/* Email with icon */}
            {userInfo.email && (
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <MdEmail className="text-lg text-blue-500" />
                {userInfo.email}
              </p>
            )}
          </div>
        </div>
      </div>

      <DashboardCharts role="admin"></DashboardCharts>
    </div>
  );
};

export default AdminProfile;
