// src/pages/Blogs.jsx
import React from "react";

const blogs = [
  {
    id: 1,
    title: "Top 5 Real Estate Investment Tips",
    description:
      "Discover how to invest smartly in real estate and maximize your ROI with these proven tips.",
    image:
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "How to Choose the Perfect Home",
    description:
      "Learn the essential factors to consider when buying your dream home.",
    image:
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Trends in Real Estate Market 2025",
    description:
      "Stay updated with the latest market trends and opportunities in real estate this year.",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
  },
];

const Blogs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Real Estate Blogs</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 font-[poppins]">
                {blog.title}
              </h3>
              <p className="text-gray-600 flex-1 text-gray-600 font-[poppins]">
                {blog.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
