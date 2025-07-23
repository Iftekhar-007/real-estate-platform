// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const LatestReviews = () => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("https://real-estate-serverside.vercel.app/reviews/latest") // Change URL if hosted
//       .then((res) => {
//         setReviews(res.data);
//         console.log(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching reviews:", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <p className="text-center py-10 text-gray-500">Loading reviews...</p>
//     );
//   }

//   if (reviews.length === 0) {
//     return (
//       <p className="text-center py-10 text-gray-400">No reviews available</p>
//     );
//   }

//   return (
//     <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//       {reviews.map((review) => (
//         <div
//           key={review._id}
//           className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
//         >
//           <div className="flex items-center gap-4 mb-3">
//             <img
//               src={review.reviewerImage}
//               alt={review.reviewerName}
//               className="w-12 h-12 rounded-full object-cover"
//             />
//             <div>
//               <p className="font-semibold">{review.reviewerName}</p>
//               <p className="text-sm text-gray-500">{review.reviewerEmail}</p>
//             </div>
//           </div>
//           <h3 className="font-bold text-lg">{review.propertyTitle}</h3>
//           <p className="text-gray-700 mt-2 italic">"{review.comment}"</p>
//           <p className="text-sm text-gray-400 mt-1">
//             {new Date(review.reviewTime).toLocaleString()}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LatestReviews;

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaQuoteLeft } from "react-icons/fa";

const LatestReviews = () => {
  const [reviews, setReviews] = useState([]);
  const sliderRef = useRef(null);

  const intervalTime = 3000; // 3 seconds per slide
  const slideAmount = 320; // adjust based on card width + gap

  useEffect(() => {
    axios
      .get("https://real-estate-serverside.vercel.app/reviews/all")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to fetch reviews:", err));
  }, []);

  useEffect(() => {
    if (!reviews.length) return;

    const slider = sliderRef.current;
    let scrollPosition = 0;

    const slide = () => {
      if (!slider) return;
      scrollPosition += slideAmount;
      if (scrollPosition >= slider.scrollWidth - slider.clientWidth) {
        scrollPosition = 0;
      }
      slider.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    };

    const intervalId = setInterval(slide, intervalTime);
    return () => clearInterval(intervalId);
  }, [reviews]);

  if (!reviews.length)
    return (
      <p className="text-center py-10 text-gray-400">No reviews available</p>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 relative lg:my-16">
      <h2 className="text-5xl font-bold text-center mb-8 font-philo">
        Latest User Reviews
      </h2>

      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-hidden scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        {reviews.map((review) => (
          <div
            key={review._id}
            className="flex-shrink-0 w-72 bg-gray-100 rounded-xl shadow-md p-6 text-center transition-shadow duration-300 hover:shadow-xl cursor-pointer"
            style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.15)" }}
          >
            <img
              src={review.reviewerImage}
              alt={review.reviewerName}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg mb-1">
              {review.reviewerName}
            </h3>
            <p className="text-sm text-gray-500 italic mb-3">
              {review.propertyTitle}
            </p>
            <FaQuoteLeft className="text-2xl text-primary mx-auto mb-4" />
            <p className="text-gray-700 italic">"{review.comment}"</p>
            <p className="text-xs text-gray-400 mt-4">
              {new Date(review.reviewTime).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestReviews;
