import React from "react";
// import useOffers from "../../hooks/useOffers";
import { Link } from "react-router";
import useOffers from "../Hooks/useOffers";

const Purchased_Properties = () => {
  const [offers, loading] = useOffers();
  console.log(offers);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {offers.map((offer) => (
        <div key={offer._id} className="card shadow-xl p-4 border">
          <img
            src={offer.propertyImage}
            className="h-40 w-full object-cover rounded"
            alt="Property"
          />
          <h2 className="text-xl font-bold">{offer.propertyTitle}</h2>
          <p>
            <strong>Location:</strong> {offer.propertyLocation}
          </p>
          <p>
            <strong>Agent:</strong> {offer.agentName}
          </p>
          <p>
            <strong>Offer:</strong> ${offer.offerAmount}
          </p>
          <p>
            <strong>Status:</strong> {offer.status}
          </p>

          {offer.status === "accepted" ? (
            <Link to={`/dashboard/payment/${offer._id}`}>
              <button className="btn btn-success mt-2">Pay</button>
            </Link>
          ) : offer.status === "bought" ? (
            <p className="text-green-500 font-semibold">
              Transaction ID: {offer.transactionId}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Purchased_Properties;
