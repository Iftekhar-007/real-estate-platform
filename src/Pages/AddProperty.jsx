import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import AuthContext from "../Context/AuthContext";
import AxiosSecure from "../Routes/AxiosSecure";
import Swal from "sweetalert2";

const AddProperty = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);
  const axiosSecure = AxiosSecure();
  const [mainPreview, setMainPreview] = useState(null);

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (formData) => {
      const res = await axiosSecure.post("/properties", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      // ✅ For success message
      Swal.fire({
        title: "Success!",
        text: "Property added successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
      reset();
      setMainPreview(null);
      // setGalleryPreview([]);
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("location", data.location);
    formData.append("basePrice", data.basePrice);
    formData.append("maxPrice", data.maxPrice);
    formData.append("agentName", user?.displayName);
    formData.append("agentEmail", user?.email);
    formData.append("mainImage", data.mainImage[0]);

    formData.append("verificationStatus", "pending");
    formData.append("saleStatus", "available");

    mutate(formData);
  };

  return (
    <>
      <title>Add Property || Real Estate</title>
      <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Add a Property</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("title", { required: true })}
            placeholder="Property Title"
            className="input input-bordered w-full"
          />
          <input
            {...register("location", { required: true })}
            placeholder="Property Location"
            className="input input-bordered w-full"
          />

          <div>
            <label className="block mb-1 font-medium">
              Main Image (Thumbnail)
            </label>
            <input
              type="file"
              {...register("mainImage", { required: true })}
              className="file-input file-input-bordered w-full"
              accept="image/*"
              onChange={(e) =>
                setMainPreview(URL.createObjectURL(e.target.files[0]))
              }
            />
            {mainPreview && (
              <img
                src={mainPreview}
                alt="Main Preview"
                className="w-40 h-32 object-cover mt-2 rounded"
              />
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Price Range</label>
            <div className="flex gap-2">
              <input
                {...register("basePrice", { required: true })}
                placeholder="Base Price"
                type="number"
                className="input input-bordered w-full"
              />
              <input
                {...register("maxPrice", { required: true })}
                placeholder="Max Price"
                type="number"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Agnet Name</label>
            <input
              value={user?.displayName}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Agent Email</label>
            <input
              value={user?.email}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <button disabled={isPending} className="btn btn-primary w-full">
            {isPending ? "Adding..." : "Add Property"}
          </button>
        </form>

        {isSuccess && (
          <p className="text-green-500 mt-2">Property added successfully!</p>
        )}
        {isError && (
          <p className="text-red-500 mt-2">Failed to add property.</p>
        )}
      </div>
    </>
  );
};

export default AddProperty;
