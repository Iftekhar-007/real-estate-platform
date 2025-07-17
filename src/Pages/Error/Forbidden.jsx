import React from "react";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center p-4">
      <img
        src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fmedium.com%2F%40_deadlock%2Funauthorised-access-page-on-response-403-in-react-4eeb8153010c&psig=AOvVaw0Y0h46GjLRu5zBngJYZZig&ust=1752866312060000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCFkIHOxI4DFQAAAAAdAAAAABAK"
        alt="403 Forbidden"
        className="w-96 mb-6"
      />
      <h1 className="text-4xl font-bold text-red-800 mb-2">403 - Forbidden</h1>
      <p className="text-gray-700 mb-6">
        You don't have permission to access this page.
      </p>
      <a
        href="/"
        className="btn bg-red-600 text-white hover:bg-red-700 transition-all"
      >
        Back to Home
      </a>
    </div>
  );
};

export default Forbidden;
