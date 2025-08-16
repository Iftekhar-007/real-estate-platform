import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaQuoteLeft } from "react-icons/fa";

const LatestReviews = () => {
  const [reviews, setReviews] = useState([]);
  const sliderRef = useRef(null);

  const intervalTime = 3000; // 3 seconds per slide
  const slideAmount = 320; // adjust based on card width + gap

  // https://real-estate-serverside.vercel.app/reviews/all

  useEffect(() => {
    axios
      .get("http://localhost:5000/reviews/all")
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
    <div className="lg:w-9/12 mx-auto px-6 relative pb-16">
      <h2 className="lg:text-4xl md:text-3xl text-xl text-center font-bold font-philo text-gray-800">
        Latest User Reviews
      </h2>

      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-hidden scroll-smooth py-8 font-[poppins]"
        style={{ scrollBehavior: "smooth" }}
      >
        {reviews.map((review) => (
          <div
            key={review._id}
            className="flex-shrink-0 w-96 rounded-xl p-10 text-left  duration-300  cursor-pointer"
            style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.15)" }}
          >
            <img
              src={review.reviewerImage}
              alt={review.reviewerName}
              className="w-16 h-16 rounded-full object-cover mb-4"
            />
            <h3 className="font-semibold text-xl mb-1">
              {review.reviewerName}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{review.propertyTitle}</p>
            <FaQuoteLeft className="text-2xl text-[#B9375D] mb-4 text-left" />
            <p className="text-gray-600 italic">"{review.comment}"</p>
            <p className="text-xs text-gray-600 mt-4">
              {new Date(review.reviewTime).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestReviews;
