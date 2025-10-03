"use client";

import { useState, useEffect } from "react";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiLoader2Line } from "react-icons/ri";

export default function PublicLoading() {
  const text = "Loading Portfolio, please wait...";
  const words = text.split(" ");
  const [visibleWords, setVisibleWords] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setVisibleWords((prev) => [...prev, words[i]]);
      i++;
      if (i === words.length) clearInterval(interval);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4"
      style={{
        background: `linear-gradient(135deg, rgba(8,13,32,0.8), rgba(5,8,24,0.9), rgba(23,37,84,0.8))`,
        backdropFilter: "blur(4px)",
      }}
    >
      <div className="w-full p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl space-y-6">
        <div className="space-y-8 px-4 py-12 max-w-6xl mx-auto">
          <div className="h-60 bg-gray-800 rounded-xl animate-pulse"></div>

          <div className="text-center mb-8 flex justify-center items-center space-x-2">
            <RiLoader2Line className="text-white text-2xl animate-spin" />
            <p className="text-white text-xl md:text-2xl font-semibold">
              {visibleWords.map((word, idx) => (
                <span
                  key={idx}
                  className="inline-block mr-2 opacity-0 animate-fadeIn"
                  style={{
                    animationDelay: `${idx * 0.1}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  {word}
                </span>
              ))}
            </p>
            <RiLoader2Line className="text-white text-2xl animate-spin" />
          </div>

          <div className="h-64 bg-gray-800 rounded-xl animate-pulse"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.1s ease forwards;
        }
      `}</style>
    </div>
  );
}
