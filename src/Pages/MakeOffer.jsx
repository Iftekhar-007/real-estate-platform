import React, { use, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import AxiosSecure from "../Routes/AxiosSecure";
import AuthContext from "../Context/AuthContext";

const MakeOffer = () => {
  const { id } = useParams(); // propertyId from URL
  const axiosSecure = AxiosSecure();
  const [buyingDate, setBuyingDate] = useState("");
  const { user } = use(AuthContext);

  // ✅ Fetch property info
  const { data: property, isLoading } = useQuery({
    queryKey: ["single-property", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/details/${id}`);
      return res.data;
    },
  });

  // ✅ Handle Offer Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const offerAmount = form.offerAmount.value;

    try {
      const res = await axiosSecure.post("/offers", {
        propertyId: id,
        offerAmount,
        buyingDate,
      });

      if (res.data.insertedId) {
        Swal.fire("Success", "Offer submitted successfully!", "success");
        form.reset();
      }
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  if (isLoading) return <p>Loading property info...</p>;
  if (!property) return <p>No property found!</p>;

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 shadow-lg border rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Make an Offer</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Property Title */}
        <div>
          <label className="block mb-1 font-medium">Property Title</label>
          <input
            type="text"
            value={property.title}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            value={property.location}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block mb-1 font-medium">Price Range</label>
          <input
            type="text"
            value={`$${property.basePrice} - $${property.maxPrice}`}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Agent Name */}
        <div>
          <label className="block mb-1 font-medium">Agent Name</label>
          <input
            type="text"
            value={property.agentName || "N/A"}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Offer Amount */}
        <div>
          <label className="block mb-1 font-medium">Offer Amount</label>
          <input
            type="number"
            name="offerAmount"
            required
            min={property.basePrice}
            max={property.maxPrice}
            placeholder={`Within $${property.basePrice} - $${property.maxPrice}`}
            className="input input-bordered w-full"
          />
        </div>

        {/* get buyer name */}
        <div>
          <label className="block mb-1 font-medium">Buyer Name Name</label>
          <input
            type="text"
            value={user.displayName || "N/A"}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>
        {/* get buyer email */}
        <div>
          <label className="block mb-1 font-medium">Buyer Email</label>
          <input
            type="text"
            value={user.email || "N/A"}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Buying Date */}
        <div>
          <label className="block mb-1 font-medium">Buying Date</label>
          <input
            type="date"
            required
            value={buyingDate}
            onChange={(e) => setBuyingDate(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Submit Offer
        </button>
      </form>
    </div>
  );
};

export default MakeOffer;
