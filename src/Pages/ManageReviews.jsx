// import React from "react";

// const ManageReviews = () => {
//   return (
//     <div>
//       <h2>Manage Reviews</h2>
//     </div>
//   );
// };

// export default ManageReviews;

import React from "react";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import AxiosSecure from "../Routes/AxiosSecure";

const ManageReviews = () => {
  const axiosSecure = AxiosSecure();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/reviews/${id}`);
        if (res.data.success) {
          Swal.fire("Deleted!", "The review has been removed.", "success");
          refetch();
        }
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Manage Reviews</h2>
      <div className="grid gap-4">
        {reviews.length === 0 ? (
          <p>No reviews found.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-4 rounded-xl shadow border"
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={review.reviewerImage}
                  alt={review.reviewerName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{review.reviewerName}</p>
                  <p className="text-sm text-gray-500">
                    {review.reviewerEmail}
                  </p>
                </div>
              </div>
              <p className="text-gray-800">{review.comment}</p>
              <button
                onClick={() => handleDelete(review._id)}
                className="mt-3 btn btn-sm bg-red-500 text-white hover:bg-red-600"
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

export default ManageReviews;
