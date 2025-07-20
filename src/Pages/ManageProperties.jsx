// // import React from "react";

// // const ManageProperties = () => {
// //   return (
// //     <div>
// //       <h2>Manage Properties</h2>
// //     </div>
// //   );
// // };

// // export default ManageProperties;

// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import AxiosSecure from "../Routes/AxiosSecure";
// // import useAxiosSecure from '../hooks/useAxiosSecure';

// const ManageProperties = () => {
//   const axiosSecure = AxiosSecure();

//   const {
//     data: properties = [],
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["properties"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/properties");
//       return res.data;
//     },
//   });
//   if (isLoading) return <p>Loading properties...</p>;
//   if (isError) return <p className="text-red-600">Error: {error.message}</p>;

//   return (
//     <div className="overflow-x-auto p-4">
//       <table className="table table-zebra w-full">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Location</th>
//             <th>Agent</th>
//             <th>Agent Email</th>
//             <th>Price Range</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {properties.map(
//             ({
//               _id,
//               title,
//               location,
//               agentName,
//               agentEmail,
//               basePrice,
//               maxPrice,
//               agentPhoto, // assuming this URL comes from backend
//             }) => (
//               <tr key={_id}>
//                 <td>{title}</td>
//                 <td>{location}</td>
//                 <td className="flex items-center space-x-2">
//                   <img
//                     src={agentPhoto}
//                     alt={`${agentName}'s photo`}
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                   <span>{agentName}</span>
//                 </td>
//                 <td>{agentEmail}</td>
//                 {/* <td>{priceRange}</td> */}
//                 <td>
//                   {basePrice && maxPrice
//                     ? `$${basePrice} - $${maxPrice}`
//                     : "N/A"}
//                 </td>

//                 <td className="flex justify-around">
//                   <button
//                     className="btn btn-sm btn-success mr-2"
//                     onClick={() => alert(`Verify ${_id} clicked`)}
//                   >
//                     Approve
//                   </button>
//                   <button
//                     className="btn btn-sm btn-error"
//                     onClick={() => alert(`Reject ${_id} clicked`)}
//                   >
//                     Reject
//                   </button>
//                 </td>
//               </tr>
//             )
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageProperties;

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import AxiosSecure from "../Routes/AxiosSecure";
import Swal from "sweetalert2";
import AxiosSecure from "../Routes/AxiosSecure";

const ManageProperties = () => {
  const axiosSecure = AxiosSecure();
  const queryClient = useQueryClient();

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

  const updateVerification = useMutation({
    mutationFn: async ({ id, status }) => {
      return axiosSecure.patch(`/properties/verify/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["properties"]);
    },
  });

  const handleAction = (id, status) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `You are about to ${status} this property.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: status === "approved" ? "#28a745" : "#d33",
      confirmButtonText: `Yes, ${status} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateVerification.mutate(
          { id, status },
          {
            onSuccess: () => {
              Swal.fire("Success!", `Property has been ${status}.`, "success");
            },
            onError: () => {
              Swal.fire("Error", "Something went wrong.", "error");
            },
          }
        );
      }
    });
  };

  if (isLoading) return <p>Loading properties...</p>;
  if (isError) return <p className="text-red-600">Error: {error.message}</p>;

  return (
    <div className="overflow-x-auto p-4">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th className="whitespace-nowrap">Agent</th>
            <th>Agent Email</th>
            <th>Price Range</th>
            <th>Verification</th>
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
              basePrice,
              maxPrice,
              agentPhoto,
              verificationStatus,
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
                  <span className="truncate">{agentName}</span>
                </td>
                <td>{agentEmail}</td>
                <td>
                  {basePrice && maxPrice
                    ? `$${basePrice} - $${maxPrice}`
                    : "N/A"}
                </td>
                <td className="capitalize">
                  {verificationStatus || "pending"}
                </td>
                <td className="flex space-x-2">
                  {verificationStatus !== "approved" && (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleAction(_id, "approved")}
                    >
                      Approve
                    </button>
                  )}
                  {verificationStatus !== "rejected" && (
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleAction(_id, "rejected")}
                    >
                      Reject
                    </button>
                  )}
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
