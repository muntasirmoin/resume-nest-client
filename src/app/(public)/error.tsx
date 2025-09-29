"use client";

import Link from "next/link";

export default function PublicError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
      <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
      <p className="mb-6">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try Again
      </button>
      <Link href="/" className="mt-4 text-blue-500 hover:underline">
        Go Home
      </Link>
    </div>
  );
}
