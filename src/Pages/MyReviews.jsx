// import React from "react";

// const MyReviews = () => {
//   return (
//     <div>
//       <h2>Reviews here</h2>
//     </div>
//   );
// };

// export default MyReviews;

import React, { use } from "react";
// import useAuth from "../../Hooks/useAuth";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import AxiosSecure from "../Routes/AxiosSecure";
import AuthContext from "../Context/AuthContext";

const MyReviews = () => {
  const { user } = use(AuthContext);
  const axiosSecure = AxiosSecure();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["userReviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/reviews/${id}`);
        if (res.data.success) {
          Swal.fire("Deleted!", "Your review has been deleted.", "success");
          refetch();
        }
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">My Reviews</h2>
      <div className="grid gap-4">
        {reviews.length === 0 ? (
          <p>You haven't given any reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-4 rounded-xl shadow-md flex flex-col gap-2 border"
            >
              <h3 className="text-lg font-semibold text-blue-600">
                {review.propertyTitle}
              </h3>
              <p className="text-sm text-gray-500">Agent: {review.agentName}</p>
              <p className="text-xs text-gray-400">
                Time: {new Date(review.reviewTime).toLocaleString()}
              </p>
              <p className="text-gray-700">{review.description}</p>
              <button
                onClick={() => handleDelete(review._id)}
                className="self-end mt-2 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyReviews;
