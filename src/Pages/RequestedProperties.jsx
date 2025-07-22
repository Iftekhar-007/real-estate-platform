import React, { use } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import AxiosSecure from "../Routes/AxiosSecure";
import AuthContext from "../Context/AuthContext";

const RequestedProperties = () => {
  const axiosSecure = AxiosSecure();
  const { user } = use(AuthContext);
  const queryClient = useQueryClient();
  const agentEmail = user?.email;

  // ✅ Get all offers for properties added by this agent
  const { data: offers = [], isLoading } = useQuery({
    queryKey: ["agentOffers", agentEmail],
    enabled: !!agentEmail,
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers/agent/${agentEmail}`);
      return res.data;
    },
  });

  // ✅ Accept or Reject Mutation
  const mutation = useMutation({
    mutationFn: async ({ id, action }) => {
      return await axiosSecure.patch(`/offers/${action}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["agentOffers", agentEmail]);
    },
  });

  const handleAction = async (id, action) => {
    const confirm = await Swal.fire({
      title: `Are you sure you want to ${action} this offer?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
    });

    if (confirm.isConfirmed) {
      mutation.mutate({ id, action });
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="lg:text-5xl font-philo font-bold mb-4 text-center">
        Requested / Offered Properties
      </h2>
      <table className="table w-full border">
        <thead>
          <tr className="bg-gray-200 text-sm">
            <th>#</th>
            <th>Property Title</th>
            <th>Location</th>
            <th>Buyer Email</th>
            <th>Buyer Name</th>
            <th>Offered Price</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer, index) => (
            <tr key={offer._id} className="text-sm">
              <td>{index + 1}</td>
              <td>{offer.propertyTitle}</td>
              <td>{offer.propertyLocation}</td>
              <td>{offer.buyerEmail}</td>
              <td>{offer.buyerName}</td>
              <td>${offer.offerAmount}</td>
              <td className="capitalize font-semibold">
                {offer.status || "pending"}
              </td>
              <td className="space-x-2 text-center">
                {offer.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleAction(offer._id, "accept")}
                      className="btn btn-xs bg-green-500 hover:bg-green-600 text-white"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(offer._id, "reject")}
                      className="btn btn-xs bg-red-500 hover:bg-red-600 text-white"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestedProperties;
