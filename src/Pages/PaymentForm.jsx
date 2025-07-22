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
