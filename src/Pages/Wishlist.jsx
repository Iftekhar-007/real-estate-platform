import { useQuery } from "@tanstack/react-query";
import { FaRegHeart, FaMoneyCheckAlt } from "react-icons/fa";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
// import AxiosSecure from "../Routes/AxiosSecure";
import Swal from "sweetalert2";
import AxiosSecure from "../Routes/AxiosSecure";
import { useNavigate } from "react-router";

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = AxiosSecure();
  const navigate = useNavigate();

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

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/wishlist/${id}`);
          Swal.fire({
            icon: "success",
            title: "Removed!",
            text: "The property has been removed from your wishlist.",
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true,
          });
          refetch(); // Or update your state to refresh the wishlist UI
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to remove property. Try again later.",
          });
        }
      }
    });
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
    <div>
      <h2 className="font-philo lg:text-5xl font bold text-center">
        My Wishlist
      </h2>
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
            <p className="text-sm font-medium">
              Price Range: {item.priceRange}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <img
                src={item.agentImage}
                alt="Agent"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm">{item.agentName}</span>
            </div>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() =>
                  navigate(`/dashboard/make-offer/${item.propertyId}`)
                }
                className="btn btn-sm btn-outline"
              >
                <FaMoneyCheckAlt />
                Make an Offer
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
    </div>
  );
};

export default Wishlist;
