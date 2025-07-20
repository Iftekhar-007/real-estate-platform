import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaCheckCircle, FaSearch } from "react-icons/fa";
import AxiosSecure from "../Routes/AxiosSecure";

const AllProperties = () => {
  const axiosSecure = AxiosSecure();
  const navigate = useNavigate();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["allProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-properties");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="lg:w-9/12 mx-auto px-4 lg:px-12 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        All Verified Properties
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property._id} className="card bg-base-100 shadow-xl border">
            <figure>
              <img
                src={property.mainImage}
                alt={property.title}
                className="h-48 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{property.title}</h2>
              <p>
                <strong>Location:</strong> {property.location}
              </p>
              <p>
                <strong>Agent:</strong> {property.agentName}
              </p>
              <div className="flex items-center gap-2">
                <img
                  src={property.agentPhoto}
                  alt="Agent"
                  className="w-10 h-10 rounded-full"
                />
                <span className="badge badge-outline">Agent</span>
              </div>

              <p className="mt-2">
                <strong>Status:</strong>{" "}
                <span
                  className={`badge ${
                    property.verificationStatus === "approved"
                      ? "badge-success"
                      : "badge-warning"
                  }`}
                >
                  {property.verificationStatus}
                </span>
              </p>

              <p className="mt-1">
                <strong>Price:</strong> ${property.basePrice} - $
                {property.maxPrice}
              </p>

              <div className="card-actions mt-4 justify-between">
                <button
                  onClick={() =>
                    navigate(`/properties/details/${property._id}`)
                  }
                  className="btn bg-[#099c9e] text-white btn-sm flex items-center gap-1"
                >
                  <FaSearch /> View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProperties;
