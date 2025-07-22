// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import AxiosSecure from "../Routes/AxiosSecure";
// import { useParams } from "react-router";
// // import useAxiosSecure from "../../../hooks/useAxiosSecure"; // update path

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const axiosSecure = AxiosSecure();
//   const { id } = useParams();

//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState("");
//   const [processing, setProcessing] = useState(false);

//   const price = 25000;

//   const { data: clientSecretData, isPending } = useQuery({
//     queryKey: ["create-payment-intent", price],
//     queryFn: async () => {
//       const res = await axiosSecure.post("/create-payment-intent", { price });
//       return res.data;
//     },
//     enabled: !!price,
//   });

//   const clientSecret = clientSecretData?.clientSecret;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     const card = elements.getElement(CardElement);
//     setProcessing(true);

//     const { paymentIntent, error } = await stripe.confirmCardPayment(
//       clientSecret,
//       {
//         payment_method: {
//           card,
//         },
//       }
//     );

//     if (error) {
//       setError(error.message);
//       setProcessing(false);
//     } else {
//       setSuccess("✅ Payment successful!");
//       // 🔥 Call backend to update property status & store payment record
//       setProcessing(false);
//     }
//   };

//   if (isPending) return <p>Loading payment form...</p>;

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button className="btn btn-primary mt-4" disabled={!stripe || processing}>
//         {processing ? "Processing..." : "Pay"}
//       </button>
//       {error && <p className="text-red-500">{error}</p>}
//       {success && <p className="text-green-500">{success}</p>}
//     </form>
//   );
// };

// export default PaymentForm;

import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import AxiosSecure from "../Routes/AxiosSecure";
// import AxiosSecure from "../Routes/AxiosSecure"; // your custom hook

const PaymentForm = () => {
  const { id } = useParams(); // offer._id from route param
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = AxiosSecure();
  //   const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  // 🧲 1. Load the offer using offer ID
  const { data: offer, isLoading: loadingOffer } = useQuery({
    queryKey: ["single-offer", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const price = offer?.offerAmount;

  // 🔁 2. Create payment intent when price is available
  useEffect(() => {
    if (price) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  // 💳 3. Handle Stripe payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    const card = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card },
      }
    );

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else {
      setSuccess("✅ Payment successful!");
      setError("");
      setProcessing(false);

      // 🔄 Update database: status = bought, save trxId etc.
      await axiosSecure.patch(`/offers/payment-success/${offer._id}`, {
        trxId: paymentIntent.id,
        paymentStatus: "bought",
      });

      //   navigate("/purchased_properties");
    }
  };

  if (loadingOffer)
    return <p className="text-center">Loading offer details...</p>;

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Payment for <span className="text-primary">{offer.propertyTitle}</span>
      </h2>
      <p className="mb-2 text-lg font-semibold">Amount: ${price}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement className="border p-3 rounded-md" />
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={!stripe || !clientSecret || processing}
        >
          {processing ? "Processing..." : `Pay $${price}`}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 font-semibold">{success}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
