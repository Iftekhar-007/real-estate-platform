// import { useNavigate, useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// // import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useForm } from "react-hook-form";
// import AxiosSecure from "../Routes/AxiosSecure";

// const UpdateProperty = () => {
//   const { id } = useParams();
//   const axiosSecure = AxiosSecure();
//   const navigate = useNavigate();
//   const { register, handleSubmit, reset } = useForm();

//   const { data: property, isLoading } = useQuery({
//     queryKey: ["property", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/properties/${id}`);
//       return res.data;
//     },
//     enabled: !!id,
//     onSuccess: (data) => {
//       reset(data); // prefill the form
//     },
//   });

//   const onSubmit = async (data) => {
//     try {
//       await axiosSecure.put(`/properties/${id}`, data);
//       alert("✅ Property updated");
//       navigate("/dashboard/my-properties");
//     } catch (err) {
//       alert("❌ Failed to update");
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-4 max-w-xl mx-auto"
//     >
//       <input
//         type="text"
//         {...register("title")}
//         placeholder="Title"
//         className="input input-bordered w-full"
//       />
//       <input
//         type="text"
//         {...register("location")}
//         placeholder="Location"
//         className="input input-bordered w-full"
//       />
//       <input
//         type="text"
//         {...register("priceRange")}
//         placeholder="Price Range"
//         className="input input-bordered w-full"
//       />

//       <input
//         type="text"
//         {...register("agentName")}
//         readOnly
//         className="input input-bordered w-full"
//       />
//       <input
//         type="email"
//         {...register("agentEmail")}
//         readOnly
//         className="input input-bordered w-full"
//       />

//       <button className="btn btn-primary">Update Property</button>
//     </form>
//   );
// };

// export default UpdateProperty;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import AxiosSecure from "../Routes/AxiosSecure";
import Swal from "sweetalert2";
// import AxiosSecure from "../Routes/AxiosSecure";

const UpdateProperty = () => {
  const { id } = useParams();
  const axiosSecure = AxiosSecure();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    basePrice: "",
    maxPrice: "",
    agentName: "",
    agentEmail: "",
  });

  useEffect(() => {
    axiosSecure.get(`/properties/${id}`).then((res) => {
      const prop = res.data;
      setFormData({
        title: prop.title,
        location: prop.location,
        basePrice: prop.basePrice,
        maxPrice: prop.maxPrice,
        agentName: prop.agentName,
        agentEmail: prop.agentEmail,
      });
    });
  }, [id, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosSecure.patch(`/properties/${id}`, formData);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Property updated successfully.",
        confirmButtonColor: "#3085d6",
      });

      navigate("/dashboard/my-properties");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Property</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Property Title"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="basePrice"
          value={formData.basePrice}
          onChange={handleChange}
          placeholder="Base Price"
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="maxPrice"
          value={formData.maxPrice}
          onChange={handleChange}
          placeholder="Max Price"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="agentName"
          value={formData.agentName}
          readOnly
          className="input input-bordered w-full bg-gray-100"
        />
        <input
          type="email"
          name="agentEmail"
          value={formData.agentEmail}
          readOnly
          className="input input-bordered w-full bg-gray-100"
        />

        <button className="btn btn-primary w-full">Update</button>
      </form>
    </div>
  );
};

export default UpdateProperty;
