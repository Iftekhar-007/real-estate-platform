// import React, { use, useState } from "react";
// import { useParams } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// // import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";
// import AxiosSecure from "../Routes/AxiosSecure";
// import AuthContext from "../Context/AuthContext";

// const MakeOffer = () => {
//   const { id } = useParams(); // propertyId from URL
//   const axiosSecure = AxiosSecure();
//   const [buyingDate, setBuyingDate] = useState("");
//   const { user } = use(AuthContext);

//   // ✅ Fetch property info
//   const { data: property, isLoading } = useQuery({
//     queryKey: ["single-property", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/properties/details/${id}`);
//       return res.data;
//     },
//   });

//   const { data: existingOffer, isLoading: checkingOffer } = useQuery({
//     queryKey: ["user-offer", id, user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/offers/check?propertyId=${id}`);
//       return res.data; // { exists: true/false }
//     },
//   });

//   // ✅ Handle Offer Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const offerAmount = form.offerAmount.value;

//     try {
//       const res = await axiosSecure.post("/offers", {
//         propertyId: id,
//         offerAmount,
//         buyingDate,
//       });

//       if (res.data.insertedId) {
//         Swal.fire("Success", "Offer submitted successfully!", "success");
//         form.reset();
//       }
//     } catch (err) {
//       Swal.fire(
//         "Error",
//         err.response?.data?.message || "Something went wrong",
//         "error"
//       );
//     }
//   };

//   if (isLoading) return <p>Loading property info...</p>;
//   if (!property) return <p>No property found!</p>;

//   if (checkingOffer) return <p>Checking your previous offer...</p>;
//   if (existingOffer?.exists) {
//     Swal.fire("You have already made an offer for this property.", "warning");
//   }

//   return (
//     <div className="max-w-xl mx-auto p-6 mt-10 shadow-lg border rounded-xl">
//       <h2 className="text-2xl font-bold mb-6 text-center">Make an Offer</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Property Title */}
//         <div>
//           <label className="block mb-1 font-medium">Property Title</label>
//           <input
//             type="text"
//             value={property.title}
//             readOnly
//             className="input input-bordered w-full bg-gray-100"
//           />
//         </div>

//         {/* Location */}
//         <div>
//           <label className="block mb-1 font-medium">Location</label>
//           <input
//             type="text"
//             value={property.location}
//             readOnly
//             className="input input-bordered w-full bg-gray-100"
//           />
//         </div>

//         {/* Price Range */}
//         <div>
//           <label className="block mb-1 font-medium">Price Range</label>
//           <input
//             type="text"
//             value={`$${property.basePrice} - $${property.maxPrice}`}
//             readOnly
//             className="input input-bordered w-full bg-gray-100"
//           />
//         </div>

//         {/* Agent Name */}
//         <div>
//           <label className="block mb-1 font-medium">Agent Name</label>
//           <input
//             type="text"
//             value={property.agentName || "N/A"}
//             readOnly
//             className="input input-bordered w-full bg-gray-100"
//           />
//         </div>

//         {/* Offer Amount */}
//         <div>
//           <label className="block mb-1 font-medium">Offer Amount</label>
//           <input
//             type="number"
//             name="offerAmount"
//             required
//             min={property.basePrice}
//             max={property.maxPrice}
//             placeholder={`Within $${property.basePrice} - $${property.maxPrice}`}
//             className="input input-bordered w-full"
//           />
//         </div>

//         {/* get buyer name */}
//         <div>
//           <label className="block mb-1 font-medium">Buyer Name Name</label>
//           <input
//             type="text"
//             value={user.displayName || "N/A"}
//             readOnly
//             className="input input-bordered w-full bg-gray-100"
//           />
//         </div>
//         {/* get buyer email */}
//         <div>
//           <label className="block mb-1 font-medium">Buyer Email</label>
//           <input
//             type="text"
//             value={user.email || "N/A"}
//             readOnly
//             className="input input-bordered w-full bg-gray-100"
//           />
//         </div>

//         {/* Buying Date */}
//         <div>
//           <label className="block mb-1 font-medium">Buying Date</label>
//           <input
//             type="date"
//             required
//             value={buyingDate}
//             onChange={(e) => setBuyingDate(e.target.value)}
//             className="input input-bordered w-full"
//           />
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="btn btn-primary w-full">
//           Submit Offer
//         </button>
//       </form>
//     </div>
//   );
// };

// export default MakeOffer;

import React, { useState, useEffect, use } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import AxiosSecure from "../Routes/AxiosSecure";
import AuthContext from "../Context/AuthContext";
// import AxiosSecure from "../Routes/AxiosSecure";
// import AuthContext from "../Context/AuthContext";

const MakeOffer = () => {
  const { id } = useParams(); // propertyId
  const axiosSecure = AxiosSecure();
  const [buyingDate, setBuyingDate] = useState("");
  const { user } = use(AuthContext);
  const [isBought, setIsBought] = useState(false);

  // ✅ Fetch property info
  const { data: property, isLoading } = useQuery({
    queryKey: ["single-property", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/details/${id}`);
      return res.data;
    },
  });

  // 🛑 Check if already bought
  useEffect(() => {
    const checkBought = async () => {
      const res = await axiosSecure.get(`/offers/property-status/${id}`);
      if (res.data?.isBought) {
        setIsBought(true);
        Swal.fire({
          icon: "warning",
          title: "Property already bought",
          text: "Sorry, someone already bought this property. You can't make an offer.",
        });
      }
    };

    if (id) checkBought();
  }, [id, axiosSecure]);

  // ❗Check if current user already made an offer
  const { data: existingOffer, isLoading: checkingOffer } = useQuery({
    queryKey: ["user-offer", id, user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers/check?propertyId=${id}`);
      return res.data;
    },
  });

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
  if (checkingOffer) return <p>Checking your previous offer...</p>;

  if (existingOffer?.exists) {
    Swal.fire(
      "Warning",
      "You have already made an offer for this property.",
      "info"
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 shadow-lg border rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Make an Offer</h2>

      {isBought ? (
        <p className="text-red-600 font-semibold text-center">
          This property has already been bought. Offer disabled.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Property Title" value={property.title} />
          <InputField label="Location" value={property.location} />
          <InputField
            label="Price Range"
            value={`$${property.basePrice} - $${property.maxPrice}`}
          />
          <InputField label="Agent Name" value={property.agentName || "N/A"} />
          <InputField label="Buyer Name" value={user.displayName || "N/A"} />
          <InputField label="Buyer Email" value={user.email || "N/A"} />

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

          <button type="submit" className="btn btn-primary w-full">
            Submit Offer
          </button>
        </form>
      )}
    </div>
  );
};

const InputField = ({ label, value }) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <input
      type="text"
      value={value}
      readOnly
      className="input input-bordered w-full bg-gray-100"
    />
  </div>
);

export default MakeOffer;
