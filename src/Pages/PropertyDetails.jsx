import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaHeart, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import AxiosSecure from "../Routes/AxiosSecure";

const PropertyDetails = () => {
  const { id } = useParams();
  const axiosSecure = AxiosSecure();
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

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
      const res = await axiosSecure.get(`/api/reviews/${id}`);
      return res.data;
    },
  });

  const handleAddToWishlist = async () => {
    try {
      await axiosSecure.post("/api/wishlist", {
        propertyId: property._id,
        title: property.title,
        priceRange: property.priceRange,
        mainImage: property.mainImage,
      });
      Swal.fire("Success", "Added to wishlist!", "success");
    } catch (err) {
      Swal.fire("Oops!", "Failed to add to wishlist", "error");
      console.log(err);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    const form = e.target;
    const comment = form.comment.value;

    try {
      await axiosSecure.post("/api/reviews", {
        propertyId: property._id,
        comment,
      });
      Swal.fire("Thanks!", "Your review has been added.", "success");
      setReviewModalOpen(false);
    } catch {
      Swal.fire("Oops!", "Something went wrong.", "error");
    }
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
