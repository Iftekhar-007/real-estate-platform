// import React from "react";

// const ManageProperties = () => {
//   return (
//     <div>
//       <h2>Manage Properties</h2>
//     </div>
//   );
// };

// export default ManageProperties;

import React from "react";
import { useQuery } from "@tanstack/react-query";
import AxiosSecure from "../Routes/AxiosSecure";
// import useAxiosSecure from '../hooks/useAxiosSecure';

const ManageProperties = () => {
  const axiosSecure = AxiosSecure();

  const {
    data: properties = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties");
      return res.data;
    },
  });
  if (isLoading) return <p>Loading properties...</p>;
  if (isError) return <p className="text-red-600">Error: {error.message}</p>;

  return (
    <div className="overflow-x-auto p-4">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Agent</th>
            <th>Agent Email</th>
            <th>Price Range</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map(
            ({
              _id,
              title,
              location,
              agentName,
              agentEmail,
              priceRange,
              agentPhoto, // assuming this URL comes from backend
            }) => (
              <tr key={_id}>
                <td>{title}</td>
                <td>{location}</td>
                <td className="flex items-center space-x-2">
                  <img
                    src={agentPhoto}
                    alt={`${agentName}'s photo`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span>{agentName}</span>
                </td>
                <td>{agentEmail}</td>
                <td>{priceRange}</td>
                <td>
                  <button
                    className="btn btn-sm btn-success mr-2"
                    onClick={() => alert(`Verify ${_id} clicked`)}
                  >
                    Verify
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => alert(`Reject ${_id} clicked`)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProperties;
