import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import AxiosSecure from "../Routes/AxiosSecure";

const ManageAdvertise = () => {
  const axiosSecure = AxiosSecure();

  const { data: properties = [], refetch } = useQuery({
    queryKey: ["allProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties");
      return res.data;
    },
  });

  console.log(properties);

  const handleAdvertise = async (id) => {
    try {
      const res = await axiosSecure.put(`/properties/advertise/${id}`);

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Property advertised successfully!", "success");
        refetch(); // this should reload data
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Advertisements</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>

            <th>Title</th>
            <th>Location</th>
            <th>Agent</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property, index) => (
            <tr key={property._id}>
              <td>{index + 1}</td>

              <td>{property.title}</td>
              <td>{property.location}</td>
              <td>{property.agentName}</td>

              <td>
                <button
                  onClick={() => handleAdvertise(property._id)}
                  className="btn btn-sm btn-primary"
                  //   disabled={property.advertised}
                >
                  {property.advertised ? "Advertise" : "Adverised"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAdvertise;
