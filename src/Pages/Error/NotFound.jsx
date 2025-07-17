import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/008/568/878/small_2x/website-page-not-found-error-404-oops-worried-robot-character-peeking-out-of-outer-space-site-crash-on-technical-work-web-design-template-with-chatbot-mascot-cartoon-online-bot-assistance-failure-vector.jpg"
        alt="404 Not Found"
        className="w-96 mb-6"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-6">
        The page you're looking for doesn’t exist or has been moved.
      </p>
      <a
        href="/"
        className="btn bg-blue-600 text-white hover:bg-blue-700 transition-all"
      >
        Go Home
      </a>
    </div>
  );
};

export default NotFound;
