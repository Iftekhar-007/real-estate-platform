// // import { useQuery } from "@tanstack/react-query";
// // import { FaRegHeart, FaMoneyCheckAlt } from "react-icons/fa";
// // // import { useState, useEffect } from "react";
// // // import AxiosSecure from "../Routes/AxiosSecure";
// // import { use } from "react";
// // import AuthContext from "../Context/AuthContext";
// // import AxiosSecure from "../Routes/AxiosSecure";
// // // import AuthContext from "../Context/AuthContext";

// // const Wishlist = () => {
// //   const { user } = use(AuthContext);
// //   const axiosSecure = AxiosSecure();

// //   const {
// //     data: wishlist = [],
// //     isLoading,
// //     refetch,
// //   } = useQuery(
// //     ["wishlist", user?.email],
// //     async () => {
// //       const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
// //       return res.data;
// //     },
// //     { enabled: !!user?.email }
// //   );

// //   const handleRemove = async (id) => {
// //     await axiosSecure.delete(`/wishlist/${id}`);
// //     refetch();
// //   };

// //   if (isLoading) return <div>Loading your wishlist...</div>;
// //   if (wishlist.length === 0)
// //     return <div>You haven't added any properties to your wishlist yet.</div>;

// //   return (
// //     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
// //       {wishlist.map((item) => (
// //         <div
// //           key={item._id}
// //           className="bg-white shadow-xl rounded-2xl p-4 border"
// //         >
// //           <img
// //             src={item.propertyImage}
// //             alt="Property"
// //             className="rounded-xl h-48 w-full object-cover"
// //           />
// //           <div className="mt-3 space-y-1">
// //             <h2 className="text-xl font-bold">{item.title}</h2>
// //             <p className="text-sm text-gray-600">{item.location}</p>
// //             <p className="text-sm">Status: {item.verificationStatus}</p>
// //             <p className="text-sm font-medium">
// //               Price Range: {item.priceRange}
// //             </p>
// //             <div className="flex items-center gap-2 mt-2">
// //               <img
// //                 src={item.agentImage}
// //                 alt="Agent"
// //                 className="w-8 h-8 rounded-full"
// //               />
// //               <span className="text-sm">{item.agentName}</span>
// //             </div>
// //           </div>
// //           <div className="mt-4 flex justify-between">
// //             <button className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1">
// //               <FaMoneyCheckAlt /> Make Offer
// //             </button>
// //             <button
// //               onClick={() => handleRemove(item._id)}
// //               className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1"
// //             >
// //               <FaRegHeart /> Remove
// //             </button>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default Wishlist;

// import { useQuery } from "@tanstack/react-query";
// import { FaRegHeart, FaMoneyCheckAlt } from "react-icons/fa";
// import { useContext } from "react";
// import AuthContext from "../Context/AuthContext";
// import AxiosSecure from "../Routes/AxiosSecure";
// // import AxiosSecure from "../Routes/AxiosSecure";

// const Wishlist = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = AxiosSecure();

//   const {
//     data: wishlist = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["wishlist", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
//       return res.data;
//     },
//     enabled: !!user?.email,
//   });

//   const handleRemove = async (id) => {
//     await axiosSecure.delete(`/wishlist/${id}`);
//     refetch();
//   };

//   if (isLoading) return <div>Loading your wishlist...</div>;
//   if (wishlist.length === 0)
//     return <div>You haven't added any properties to your wishlist yet.</div>;

//   return (
//     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
//       {wishlist.map((item) => (
//         <div
//           key={item._id}
//           className="bg-white shadow-xl rounded-2xl p-4 border"
//         >
//           <img
//             src={item.propertyImage}
//             alt="Property"
//             className="rounded-xl h-48 w-full object-cover"
//           />
//           <div className="mt-3 space-y-1">
//             <h2 className="text-xl font-bold">{item.title}</h2>
//             <p className="text-sm text-gray-600">{item.location}</p>
//             <p className="text-sm">Status: {item.verificationStatus}</p>
//             <p className="text-sm font-medium">
//               Price Range: {item.priceRange}
//             </p>
//             <div className="flex items-center gap-2 mt-2">
//               <img
//                 src={item.agentImage}
//                 alt="Agent"
//                 className="w-8 h-8 rounded-full"
//               />
//               <span className="text-sm">{item.agentName}</span>
//             </div>
//           </div>
//           <div className="mt-4 flex justify-between">
//             <button className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1">
//               <FaMoneyCheckAlt /> Make Offer
//             </button>
//             <button
//               onClick={() => handleRemove(item._id)}
//               className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1"
//             >
//               <FaRegHeart /> Remove
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Wishlist;

import { useQuery } from "@tanstack/react-query";
import { FaRegHeart, FaMoneyCheckAlt } from "react-icons/fa";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
// import AxiosSecure from "../Routes/AxiosSecure";
import Swal from "sweetalert2";
import AxiosSecure from "../Routes/AxiosSecure";

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = AxiosSecure();

  const {
    data: wishlist = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleRemove = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this from wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/wishlist/${id}`);
      if (res.data?.deletedCount > 0) {
        refetch();
        Swal.fire(
          "Removed!",
          "This property was removed from wishlist.",
          "success"
        );
      }
    }
  };

  if (isLoading)
    return <div className="text-center py-10">Loading your wishlist...</div>;
  if (wishlist.length === 0)
    return (
      <div className="text-center py-10 text-gray-600">
        You haven’t added any properties to your wishlist yet.
      </div>
    );

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
      {wishlist.map((item) => (
        <div
          key={item._id}
          className="bg-white shadow-xl rounded-2xl p-4 border space-y-2"
        >
          <img
            src={item.propertyImage}
            alt="Property"
            className="rounded-xl h-48 w-full object-cover"
          />
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <p className="text-sm text-gray-600">{item.location}</p>
          <p className="text-sm">Status: {item.verificationStatus}</p>
          <p className="text-sm font-medium">Price Range: {item.priceRange}</p>

          <div className="flex items-center gap-2 mt-2">
            <img
              src={item.agentImage}
              alt="Agent"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm">{item.agentName}</span>
          </div>

          <div className="mt-4 flex justify-between">
            <button className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1">
              <FaMoneyCheckAlt /> Make Offer
            </button>
            <button
              onClick={() => handleRemove(item._id)}
              className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1"
            >
              <FaRegHeart /> Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
