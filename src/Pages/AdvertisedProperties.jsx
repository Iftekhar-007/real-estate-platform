import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import AxiosSecure from "../Routes/AxiosSecure";
import { FaLocationArrow } from "react-icons/fa";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdvertisedProperties = () => {
  const axiosSecure = AxiosSecure();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["advertisedProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties/advertised");
      return res.data.filter((item) => item.advertised === true);
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  if (!properties.length)
    return (
      <p className="text-center text-gray-500 py-10">
        No advertised properties available.
      </p>
    );

  return (
    <div className="lg:w-9/12 mx-auto">
      <h2 className="lg:text-5xl text-center font-bold font-philo my-16">
        Featured Properties
      </h2>
      <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property._id}
            className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <figure>
              <img
                src={property.mainImage}
                alt={property.title || "Property Image"}
                className="h-60 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-xl text-primary">
                {property.title}
              </h2>
              <div className="flex items-center gap-2">
                <FaLocationArrow></FaLocationArrow>
                <h2 className="">{property.location}</h2>
              </div>
              <p className="text-sm text-gray-600">
                💰 Price Range: {`${property.basePrice} - ${property.maxPrice}`}
              </p>
              <p className="text-sm">
                🔒 Status:{" "}
                <span
                  className={`font-semibold ${
                    property.verificationStatus === "approved"
                      ? "text-green-600"
                      : property.verificationStatus === "rejected"
                      ? "text-red-500"
                      : "text-yellow-600"
                  }`}
                >
                  {property.verificationStatus}
                </span>
              </p>
              <div className="card-actions justify-end mt-4">
                <Link to={`/properties/details/${property._id}`}>
                  <button className="btn btn-sm btn-primary">Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvertisedProperties;
