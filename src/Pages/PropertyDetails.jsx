import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState, use } from "react";
// import AxiosSecure from "../Routes/AxiosSecure";
// import { AuthContext } from "../Provider/AuthProvider";
import AxiosSecure from "../Routes/AxiosSecure";
import AuthContext from "../Context/AuthContext";

const PropertyDetails = () => {
  const { id } = useParams();
  const axiosSecure = AxiosSecure();
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { user } = use(AuthContext);

  const { data: property, isLoading } = useQuery({
    queryKey: ["propertyDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/details/${id}`);
      return res.data;
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["propertyReviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  const addReviewMutation = useMutation({
    mutationFn: async (newReview) => {
      const res = await axiosSecure.post("/reviews", newReview);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["propertyReviews", id]);
      Swal.fire("Thanks!", "Your review has been added.", "success");
      setReviewModalOpen(false);
    },
    onError: () => {
      Swal.fire("Oops!", "Something went wrong.", "error");
    },
  });

  const handleAddToWishlist = async () => {
    if (!user?.email) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Please login to add wishlist",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    const wishlistItem = {
      userEmail: user.email,
      propertyId: property._id,
    };

    try {
      const response = await axiosSecure.post("/wishlist", wishlistItem);
      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Added!",
          text: "Property added to your wishlist!",
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
        });
        // Optionally, trigger refetch here if needed
      }
    } catch (error) {
      if (error.response?.status === 409) {
        Swal.fire({
          icon: "info",
          title: "Already Added",
          text: "This property is already in your wishlist.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add property to wishlist. Try again later.",
        });
      }
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    const form = e.target;
    const comment = form.comment.value;

    const newReview = {
      propertyId: property._id,
      propertyTitle: property.title,
      reviewerName: user.displayName,
      reviewerImage: user.photoURL,
      reviewerEmail: user.email,
      comment,
      reviewTime: new Date().toISOString(),
    };

    addReviewMutation.mutate(newReview);
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <img
        src={property.mainImage}
        alt="property"
        className="w-full h-96 object-cover rounded-2xl shadow"
      />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{property.title}</h1>
        <button
          onClick={handleAddToWishlist}
          className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-xl hover:bg-pink-700"
        >
          <FaHeart /> Add to Wishlist
        </button>
      </div>
      <p className="text-gray-700">{property.description}</p>
      <p className="font-semibold">Location: {property.location}</p>
      <p className="font-semibold">
        Price Range: ${property.basePrice}-{property.maxPrice}
      </p>
      <div className="flex items-center gap-3">
        <img
          src={property.agentImage}
          alt="Agent"
          className="w-10 h-10 rounded-full"
        />
        <p>Agent: {property.agentName}</p>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-3">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-gray-100 p-4 rounded-xl shadow"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={review.reviewerImage}
                    alt={review.reviewerName}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{review.reviewerName}</p>
                    <p className="text-sm text-gray-500">
                      {review.reviewerEmail}
                    </p>
                  </div>
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}

        <button
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-xl"
          onClick={() => setReviewModalOpen(true)}
        >
          Add a Review
        </button>
      </div>

      {/* Modal toggle checkbox */}
      <input
        type="checkbox"
        id="reviewModal"
        className="modal-toggle"
        checked={reviewModalOpen}
        onChange={() => setReviewModalOpen(!reviewModalOpen)}
      />

      <div className="modal backdrop-blur-sm bg-black/10">
        <form
          onSubmit={handleAddReview}
          className="modal-box space-y-4 max-w-md"
        >
          <h3 className="text-xl font-bold">Add Your Review</h3>

          <textarea
            name="comment"
            className="textarea textarea-bordered w-full"
            placeholder="Write your review here..."
            required
          />

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setReviewModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyDetails;
