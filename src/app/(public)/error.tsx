"use client";

import Link from "next/link";
import { RiErrorWarningLine } from "react-icons/ri";

export default function PublicError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4"
      style={{
        background: `linear-gradient(135deg, rgba(8,13,32,0.9), rgba(23,37,84,0.85))`,
        backdropFilter: "blur(5px)",
      }}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 text-center space-y-6 max-w-5xl w-full animate-fadeIn">
        {/* Error Icon */}
        <RiErrorWarningLine className="text-red-500 text-6xl mx-auto animate-pulse" />

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-white animate-pulse">
          Oops! Something went wrong
        </h1>

        {/* Message */}
        <p className="text-red-500 font-semibold text-lg drop-shadow-md">
          {error.message}
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4 mt-6 items-center">
          <button
            onClick={() => reset()}
            className="w-64 cursor-pointer flex justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white font-bold rounded-2xl shadow-lg transition transform hover:scale-105"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="w-64 flex justify-center px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-900 hover:to-gray-700 text-white font-bold rounded-2xl shadow-lg transition transform hover:scale-105"
          >
            Go Home
          </Link>
        </div>
      </div>

      {/* Fade-in animation */}
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
