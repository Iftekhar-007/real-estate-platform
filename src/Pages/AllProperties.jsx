import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";
import AxiosSecure from "../Routes/AxiosSecure";

const AllProperties = () => {
  const axiosSecure = AxiosSecure();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["allProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-properties");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center min-h-screen place-content-center">
        <span className="loading loading-spinner text-success"></span>
      </div>
    );

  const filtered = properties.filter((p) =>
    `${p.title} ${p.location}`.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    if (isNaN(dateA) || isNaN(dateB)) {
      console.warn("Invalid date:", a.createdAt, b.createdAt);
      return 0;
    }

    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="lg:w-9/12 mx-auto px-6 py-16">
      <h2 className="lg:text-4xl md:text-3xl text-xl text-center font-bold font-philo text-gray-800">
        All Verified Properties
      </h2>

      {/* --- Search & Sort Controls --- */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
        {/* Search */}
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by property title or location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* Sort */}
        <div className="w-full md:w-1/4">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* --- Properties Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 font-[poppins]">
        {sorted.map((property) => (
          <div
            key={property._id}
            className="card shadow-xl hover:shadow-2xl p-4"
          >
            <figure>
              <img
                src={property.mainImage}
                alt={property.title}
                className="h-48 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title text-xl font-semibold text-gray-800">
                {property.title}
              </h2>
              <p className="text-sm text-gray-600">
                <strong>Location:</strong> {property.location}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Agent:</strong> {property.agentName}
              </p>
              <div className="flex items-center gap-2">
                <img
                  src={property.agentPhoto}
                  alt="Agent"
                  className="w-10 h-10 rounded-full"
                />
                <span className="badge badge-outline text-sm text-gray-600">
                  Agent
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-600">
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

              <p className="mt-1 text-sm text-gray-600">
                <strong>Price:</strong> ${property.basePrice} - $
                {property.maxPrice}
              </p>

              <div className="card-actions mt-4 justify-between">
                <button
                  onClick={() =>
                    navigate(`/properties/details/${property._id}`)
                  }
                  className="btn btn-outline hover:bg-[#B9375D] text-[#B9375D] hover:text-white text-sm flex items-center gap-1"
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
