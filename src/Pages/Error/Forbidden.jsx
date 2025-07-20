import React from "react";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center p-4">
      <img
        src="https://cdn.vectorstock.com/i/1000v/87/77/website-error-403-forbidden-artwork-depicts-vector-23988777.jpg"
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
