"use client";
import Link from "next/link";
import { RiErrorWarningLine } from "react-icons/ri";

export default function PublicNotFound() {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4"
      style={{
        background: `linear-gradient(135deg, rgba(8,13,32,0.9), rgba(23,37,84,0.85))`,
        backdropFilter: "blur(5px)",
      }}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 text-center space-y-6 max-w-5xl w-full animate-fadeIn">
        {/* Icon */}
        <RiErrorWarningLine className="text-yellow-400 text-7xl mx-auto animate-bounce" />

        {/* Title */}
        <h1 className="text-5xl font-extrabold text-white drop-shadow-md">
          404 - Page Not Found
        </h1>

        {/* Message */}
        <p className="text-gray-300 text-lg max-w-md mx-auto">
          Sorry, the page you’re looking for doesn’t exist or may have been
          moved. Let’s get you back on track!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white font-semibold rounded-2xl shadow-lg transition transform hover:scale-105"
          >
            Go Home
          </Link>

          {/* <Link
            href="/contact"
            className="px-8 py-3 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-900 hover:to-gray-700 text-white font-semibold rounded-2xl shadow-lg transition transform hover:scale-105"
          >
            Contact Support
          </Link> */}
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease forwards;
        }
      `}</style>
    </div>
  );
}
