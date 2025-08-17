import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";
import { FaCheckCircle, FaHome } from "react-icons/fa";
import AxiosSecure from "../Routes/AxiosSecure";
import AuthContext from "../Context/AuthContext";

const MySoldProperties = () => {
  const { user } = use(AuthContext);
  const axiosSecure = AxiosSecure();

  const { data: soldProperties = [], isLoading } = useQuery({
    queryKey: ["sold-properties", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sold-properties/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        My Sold Properties
      </h2>

      {/* 🧾 Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="card bg-success text-white shadow-md">
          <div className="card-body flex flex-col items-center justify-center text-center">
            <FaHome className="text-3xl mb-2" />
            <h3 className="text-lg font-semibold">Total Properties Sold</h3>
            <p className="text-2xl font-bold">{soldProperties.length}</p>
          </div>
        </div>
      </div>

      {/* 🧾 Sold Properties Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-sm md:text-base">
          <thead className="bg-base-200 text-center">
            <tr>
              <th>#</th>
              <th>Property Title</th>
              <th>Location</th>
              <th>Buyer Name</th>
              <th>Buyer Email</th>
              <th>Sold Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {soldProperties.map((property, index) => (
              <tr key={property._id || index}>
                <td>{index + 1}</td>
                <td>{property.propertyTitle}</td>
                <td>{property.propertyLocation}</td>
                <td>{property.buyerName}</td>
                <td>{property.buyerEmail}</td>
                <td className="text-green-600 font-bold">
                  ${property.soldPrice}
                </td>
                <td className="text-green-500 font-semibold flex justify-center items-center gap-1">
                  <FaCheckCircle className="text-xl" />
                  Sold
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {soldProperties.length === 0 && (
          <p className="text-center mt-8 text-gray-500">
            No properties sold yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MySoldProperties;
