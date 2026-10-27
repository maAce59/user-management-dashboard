import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 py-16">
      {/* Big 404 Header */}
      <h1 className="text-8xl font-extrabold text-orange-700 tracking-tight">404</h1>
      
      {/* Subheading */}
      <h2 className="text-3xl font-bold text-gray-800 mt-4">Page Not Found</h2>
      
      {/* Description */}
      <p className="text-gray-600 mt-2 max-w-md">
        Sorry, we couldn’t find the page you’re looking for. It might have been removed, renamed, or doesn't exist.
      </p>
      
      {/* Back to Home Button */}
      <Link
        to="/"
        className="mt-6 inline-block bg-orange-700 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-orange-800 transition-colors focus:outline-none focus:ring-4 focus:ring-orange-300"
      >
        Back to Home
      </Link>
    </div>
  );
}