import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import AxiosSecure from "../Routes/AxiosSecure";
import Swal from "sweetalert2";
// import AxiosSecure from "../Routes/AxiosSecure";

const MyAddedProperties = () => {
  const axiosSecure = AxiosSecure();
  const navigate = useNavigate();

  const {
    data: myProperties = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-properties");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // run delete api here
        try {
          axiosSecure.delete(`/properties/${id}`);
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Property Deleted successfully.",
            confirmButtonColor: "#3085d6",
          });

          refetch();
        } catch (err) {
          alert("❌ Failed to delete");
        }
      }
    });

    // try {
    //   await axiosSecure.delete(`/properties/${id}`);
    //   alert("✅ Property deleted");
    //   refetch();
    // } catch (err) {
    //   alert("❌ Failed to delete");
    // }
  };

  const handleUpdate = (id) => {
    navigate(`/dashboard/update-property/${id}`);
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="px-4 lg:px-12 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        My Added Properties
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myProperties.map((property) => (
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
                    property.verificationStatus === "verified"
                      ? "badge-success"
                      : property.verificationStatus === "pending"
                      ? "badge-warning"
                      : "badge-error"
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
                {property.verificationStatus !== "rejected" && (
                  <button
                    onClick={() => handleUpdate(property._id)}
                    className="btn btn-info btn-sm flex items-center gap-1"
                  >
                    <FaEdit /> Update
                  </button>
                )}
                <button
                  onClick={() => handleDelete(property._id)}
                  className="btn btn-error btn-sm flex items-center gap-1"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAddedProperties;
